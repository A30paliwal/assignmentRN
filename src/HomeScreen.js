import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Picker,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CategoryModal } from './CategoryModal';
export default class HomeScreen extends Component {
    state = {
        user: '',
        data: [],
        rawData: [],
        modalVisible: false,
    }

    constructor(props) {
        super(props);
        const DATA = this.props.navigation.getParam('data');
        console.log("PreviousData: ", DATA);
        this.selectedIndex = -1;
        this.selectedCategory = "";
    }
    _retrieveData = async () => {
        try {
            let value = await AsyncStorage.getItem('testData');
            if (value !== null) {
                this.setState({ data: JSON.parse(value) })
                this.setState({ rawData: JSON.parse(value) })
                console.log("value: ", this.state.data);
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    };
    _retrieveUserData = async () => {
        try {
            let value = await AsyncStorage.getItem('userData');
            if (value !== null) {
                this.setState({ user: JSON.parse(value) })
                console.log("value: ", this.state.user);
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    };
    componentDidMount() {
        this._retrieveData();
        this._retrieveUserData();
    }
    updateChoice(index, type = "isFavourite") {
        let tempData = [...this.state.data];
        tempData[index][type] = !tempData[index][type]
        this.setState({ data: [...tempData] });
        if (this.selectedCategory == "Favourites") {
            this.filterCategory(this.state.rawData, this.selectedCategory);
        }
        else if (this.selectedCategory) {
            this.filterCategory(this.state.rawData, this.selectedCategory);
        }
        AsyncStorage.setItem('tempData', JSON.stringify(this.state.data));
    }
    Item({ data, index }) {
        return (
            <TouchableOpacity style={{
                backgroundColor: this.state.modalVisible ? '#666' : '#fff',
                height: 150, flexDirection: 'row', flex: 1, marginTop: 10, shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 2,
            }} onPress={() => {
                this.props.navigation.navigate('details', {
                    data: data
                })
            }} activeOpacity={0.8}>
                <Image
                    source={data.image}
                    style={{ height: "100%", flex: 0.4 }}
                />
                <View style={{ flex: 0.6 }}>
                    <View style={{ flexDirection: 'row', marginBottom: 20, paddingTop: 8, paddingHorizontal: 10, }}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black', flex: 1 }}>{data.title}</Text>
                        <Ionicons
                            onPress={() => { this.updateChoice(index, 'isArchive') }}
                            style={{}}
                            name="md-archive"
                            size={22}
                            color={data.isArchive ? 'blue' : '#ccc'}
                        />
                        <Ionicons
                            onPress={() => { this.updateChoice(index) }}
                            style={{ paddingLeft: 10 }}
                            name="md-heart"
                            size={22}
                            color={data.isFavourite ? "blue" : "#ccc"}
                        />
                    </View>
                    <Text style={{ fontSize: 14, color: '#0d0d0d', paddingBottom: 8, paddingHorizontal: 10 }}>{data.subTitle}
                    </Text>
                    <Text style={{ fontSize: 14, color: '#0d0d0d', paddingBottom: 8, paddingHorizontal: 10 }} numberOfLines={3} ellipsizeMode='tail'>{data.detail}</Text>
                </View>
            </TouchableOpacity >
        );
    }
    async removeLoginData(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch (exception) {
            return false;
        }
    }
    filterCategory(data, item = "Show all") {

        if (item == "Updates" || item == "Events" || item == "News" || item == "Offers") {
            let filteredData = data.filter(obj => {

                return !obj.isArchive && obj.title == item
            })
            return this.setState({ data: filteredData })
        }
        else if (item == "Favourites") {
            let filteredData = data.filter(obj => {
                return !obj.isArchive && obj.isFavourite == true;
            })
            return this.setState({ data: filteredData })
        }
        else if (item == "Show archives") {
            let filteredData = data.filter(obj => {
                return obj.isArchive == true;
            })
            return this.setState({ data: filteredData })
        }
        else {
            let filteredData = data.filter(obj => {

                return (obj.isArchive == false)
            })
            return this.setState({ data: filteredData })
        }
    }
    render() {
        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: '#fff'
            }}>
                <View style={{ backgroundColor: this.state.modalVisible ? 'rgba(0,0,0,0.5)' : '#fff', paddingHorizontal: 10, paddingTop: 10 }}>
                    <Ionicons style={{ paddingRight: 10, alignSelf: 'flex-end' }} onPress={() => {
                        this.removeLoginData('userData');
                        this.props.navigation.navigate('Auth');
                    }} size={25} name="md-power" color="#222" />
                    <Text style={{ fontSize: 15, color: "#333", }}>WELCOME</Text>
                    <Text style={{ fontSize: 22, color: "#000", }}>{this.state.user}</Text>
                    <TouchableOpacity onPress={() => {
                        this.setState({ modalVisible: true });
                    }} style={{ flexDirection: "row", backgroundColor: '#ccc', borderColor: "#ccc", borderWidth: 1, marginTop: 10, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ flex: 1, paddingLeft: 10, padding: 5, color: '#333', fontSize: 18 }}>{this.selectedCategory == "" ? "CATEGORY" : this.selectedCategory}</Text>
                        <Ionicons
                            style={{ paddingRight: 10 }}
                            size={20}
                            name="ios-arrow-down"
                            color="#222"
                        />
                    </TouchableOpacity>

                </View>
                <View style={[styles.container, this.state.modalVisible ? { backgroundColor: 'rgba(0,0,0,0.5)' } : '#fff']}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        renderItem={({ item, index }) => { return this.Item({ data: item, index }); }}
                        keyExtractor={(item, index) => `cart_${index}`}
                        ListFooterComponent={() => { return <View style={{ marginBottom: 10 }} /> }}
                    />
                </View>
                {
                    this.state.modalVisible &&
                    <CategoryModal
                        selectedIndex={this.selectedIndex}
                        callBack={(item, index) => {

                            this.selectedIndex = index;
                            this.selectedCategory = item;
                            this.setState({ modalVisible: false });
                            console.log("Item", item);

                            this.filterCategory(this.state.rawData, item);
                        }}
                    />
                }
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 5
    }
});