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
import { CategoryModal } from './CategoryModal'
const DATA = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "Offers",
        image: require("../Assets/placeholder.png"),
        subTitle: "What is Lorem Ipsum?",
        detail: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
        isArchive: true,
        isFavourite: true,
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Events",
        image: require("../Assets/placeholder.png"),
        subTitle: "What is Lorem Ipsum?",
        detail: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
        isArchive: true,
        isFavourite: true,
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "News",
        image: require("../Assets/placeholder.png"),
        subTitle: "What is Lorem Ipsum?",
        detail: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
        isArchive: false,
        isFavourite: true,
    },
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "Updates",
        image: require("../Assets/placeholder.png"),
        subTitle: "What is Lorem Ipsum?",
        detail: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
        isArchive: true,
        isFavourite: true,
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "News",
        image: require("../Assets/placeholder.png"),
        subTitle: "What is Lorem Ipsum?",
        detail: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
        isArchive: false,
        isFavourite: false,
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "News",
        image: require("../Assets/placeholder.png"),
        subTitle: "What is Lorem Ipsum?",
        detail: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
        isArchive: true,
        isFavourite: false,
    },
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "Updates",
        image: require("../Assets/placeholder.png"),
        subTitle: "What is Lorem Ipsum?",
        detail: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
        isArchive: true,
        isFavourite: true,
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Updates",
        image: require("../Assets/placeholder.png"),
        subTitle: "What is Lorem Ipsum?",
        detail: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
        isArchive: true,
        isFavourite: false,
    },
];

export default class HomeScreen extends Component {
    state = {
        user: '',
        data: [],
        modalVisible: false,
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    _storeData = async () => {
        try {
            await AsyncStorage.setItem('testData', JSON.stringify(DATA));
        } catch (error) {
            console.log("Error: ", error)
        }
    };
    _retrieveData = async () => {
        try {
            let value = await AsyncStorage.getItem('testData');
            if (value !== null) {
                this.setState({ data: JSON.parse(value) })
                console.log("value: ", this.state.data);
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    };
    componentDidMount() {
        this._storeData();
        this._retrieveData();
    }
    updateChoice(index, type = "isFavourite") {
        let tempData = [...this.state.data];
        tempData[index][type] = !tempData[index][type]
        this.setState({ data: [...tempData] });
    }
    updateUser = (user) => {
        this.setState({ user: user })
    }
    Item({ data, index }) {
        console.log(data);
        return (
            <TouchableOpacity style={{
                backgroundColor: '#fff', height: 150, flexDirection: 'row', flex: 1, marginVertical: 10, shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
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
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black', flex: 1 }}>{data.title}
                        </Text>
                        <TouchableOpacity style={{}} onPress={() => { this.updateChoice(index, 'isArchive') }}>
                            <Ionicons
                                style={{}}
                                name="md-archive"
                                size={22}
                                color="#999"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingLeft: 8 }} onPress={() => { this.updateChoice(index) }}>
                            <Ionicons
                                style={{}}
                                name="md-heart"
                                size={22}
                                color={data.isFavourite ? "blue" : "#999"}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 14, color: '#0d0d0d', paddingBottom: 8, paddingHorizontal: 10 }}>{data.subTitle}
                    </Text>
                    <Text style={{ fontSize: 14, color: '#0d0d0d', paddingBottom: 8, paddingHorizontal: 10 }} numberOfLines={3} ellipsizeMode='tail'>{data.detail}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: '#fff'
            }}>
                <View style={{
                    backgroundColor: "white",
                    paddingHorizontal: 10,
                    paddingTop: 5
                }}>
                    <Text style={{ fontSize: 15, color: "#333", }}>WELCOME</Text>
                    <Text style={{ fontSize: 24, color: "#000", }}>JOHN DOE.</Text>
                    <TouchableOpacity onPress={() => {
                        this.setState({ modalVisible: true });
                    }} style={{ flexDirection: "row", backgroundColor: '#ccc', borderColor: "#ccc", borderWidth: 1, marginTop: 10, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ flex: 1, paddingLeft: 10, padding: 5, color: '#333', fontSize: 18 }}>CATEGORY</Text>
                        <Ionicons
                            style={{ paddingRight: 10 }}
                            size={20}
                            name="ios-arrow-down"
                            color="#222"
                        />
                    </TouchableOpacity>

                </View>
                <View style={styles.container}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        renderItem={({ item, index }) => { return this.Item({ data: item, index }); }}
                        keyExtractor={(item, index) => `cart_${index}`}
                    />
                </View>
                {this.state.modalVisible && <CategoryModal callBack={() => {
                    this.setState({ modalVisible: false })
                }} />}
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingTop: 5
    }
});