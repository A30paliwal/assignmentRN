import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class DetailScreen extends React.Component {
    constructor(props) {
        super(props)
        const DATA = this.props.navigation.getParam('data');
        this.state = {
            data: DATA,
            rawData: []
        };
    };

    componentDidMount() {
        console.log(this.state.data);
        this._retrieveData()
    }
    updateChoice(type = "isFavourite") {
        console.log("this.state.data", this.state.data);
        let tempData = { ...this.state.data };
        console.log("tempData:  ", tempData);
        tempData[type] = !tempData[type];
        this.setState({ data: { ...tempData } });
    }
    _retrieveData = async () => {
        try {
            let value = await AsyncStorage.getItem('testData');
            if (value !== null) {
                this.setState({ rawData: JSON.parse(value) })
                console.log("valueDetail: ", this.state.data);
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    };
    render() {

        return (
            <View style={styles.container}>
                <Image
                    style={{ flex: 0.3 }}
                    source={{ uri: "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png" }}
                />
                <View style={{ flex: 0.7, marginHorizontal: 15 }}>
                    <View style={{ flexDirection: 'row', marginVertical: 20, paddingHorizontal: 10, }}>
                        <Text style={{ flex: 1 }} />
                        <Ionicons
                            onPress={() => { this.updateChoice('isArchive') }}
                            style={{ paddingRight: 20 }}
                            name="md-archive"
                            size={22}
                            color={this.state.data.isArchive ? 'blue' : '#ccc'}
                        />
                        <Ionicons
                            onPress={() => { this.updateChoice() }}
                            style={{}}
                            name="md-heart"
                            size={22}
                            color={this.state.data.isFavourite ? 'blue' : '#ccc'}
                        />
                    </View>
                    <Text style={styles.paragraph}>{this.state.data.title}</Text>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }} showsVerticalScrollIndicator={false} bounces={false}>

                        <Text style={{ fontSize: 17, marginVertical: 15, flex: 1 }}>{this.state.data.detail}</Text>
                        <TouchableOpacity style={{ width: "100%", height: 45, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center', marginBottom: 30, marginTop: 5 }}
                            onPress={() => {

                                this.props.navigation.goBack();
                            }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Ok</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        // marginTop: 30,
    },
    paragraph: {
        fontSize: 22,
        fontWeight: 'bold',
    },
});
