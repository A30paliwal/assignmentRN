import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class DetailScreen extends React.Component {
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
                        <TouchableOpacity style={{ paddingRight: 20 }}>
                            <Ionicons
                                style={{}}
                                name="md-archive"
                                size={22}
                                color="#999"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{}}>
                            <Ionicons
                                style={{}}
                                name="md-heart"
                                size={22}
                                color="blue"
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.paragraph}>EVENTS.</Text>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }} showsVerticalScrollIndicator={false} bounces={false}>

                        <Text style={{ fontSize: 17, marginVertical: 15, flex: 1 }}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. </Text>
                        <TouchableOpacity style={{ width: "100%", height: 45, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center', marginBottom: 30, marginTop: 5 }}>
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
        marginTop: 30,
    },
    paragraph: {
        fontSize: 22,
        fontWeight: 'bold',
    },
});
