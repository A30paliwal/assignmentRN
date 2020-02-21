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
    state = { user: '' }
    updateUser = (user) => {
        this.setState({ user: user })
    }
    Item({ data }) {
        return (
            <View style={{
                backgroundColor: '#fff', height: 150, flexDirection: 'row', flex: 1, marginVertical: 10, shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
            }}>
                <Image
                    source={data.image}
                    style={{ height: "100%", flex: 0.4 }}
                />
                <View style={{ flex: 0.6 }}>
                    <View style={{ flexDirection: 'row', marginBottom: 20, paddingTop: 8, paddingHorizontal: 10, }}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'red', flex: 1 }}>{data.title}
                        </Text>
                        {data.isArchive && <TouchableOpacity style={{}}>
                            <Ionicons
                                style={{}}
                                name="md-archive"
                                size={22}
                                color="#999"
                            />
                        </TouchableOpacity>}
                        <TouchableOpacity style={{ paddingLeft: 8 }}>
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
            </View>
        );
    }
    render() {
        return (
            <SafeAreaView style={{
                flex: 1,
            }}>
                <View style={styles.container}>
                    <Text style={{ fontSize: 15, color: "#333", }}>WELCOME</Text>
                    <Text style={{ fontSize: 24, color: "#000", }}>JOHN DOE.</Text>
                    {/* <Picker style={{}} selectedValue={this.state.user} onValueChange={this.updateUser}>
                        <Picker.Item label="Steve" value="steve" />
                        <Picker.Item label="Ellen" value="ellen" />
                        <Picker.Item label="Maria" value="maria" />
                    </Picker> */}
                    <Text style={styles.text}>{this.state.user}</Text>
                </View>
                <View style={styles.container}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={DATA}
                        renderItem={({ item }) => { return this.Item({ data: item }); }}
                        keyExtractor={(item, index) => `cart_${index}`}
                        numColumns={1}
                    // ListFooterComponent={}
                    />
                </View>
            </SafeAreaView >
        )
    }
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingTop: 5
    }
});