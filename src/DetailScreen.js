import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class DetailScreen extends React.Component {
    constructor(props) {
        super(props)
        const DATA = this.props.navigation.getParam('data');
        this.index = this.props.navigation.getParam('index');
        this.state = {
            data: DATA,
        };
    };
    componentDidMount() {
        console.log(this.state.data);
    }
    componentWillUnmount() {
        const tempData = JSON.stringify(this.state.data);
        this.props.navigation.state.params.returnData(tempData, this.index);
    }
    updateChoice(type = "isFavourite") {
        let tempData = { ...this.state.data };
        tempData[type] = !tempData[type];
        this.setState({ data: { ...tempData } });
    }
    showAlert = (type) => {
        return type == 1 ? Alert.alert(
            'Archive',
            this.state.data.isArchive ? 'Are you sure to Unarchive this entry?' : 'Are you sure to archive this entry?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.updateChoice('isArchive') },
            ],
            { cancelable: false },
        ) : this.state.data.isFavourite == true ? Alert.alert(
            'Archive',
            'Are you sure to Unfavourite this entry?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.updateChoice() },
            ],
            { cancelable: false },
        ) : this.updateChoice();

    }
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
                            onPress={() => { this.showAlert(1) }}
                            style={{ paddingRight: 20 }}
                            name="md-archive"
                            size={22}
                            color={this.state.data.isArchive ? 'blue' : '#ccc'}
                        />
                        <Ionicons
                            onPress={() => { this.showAlert() }}
                            name="md-heart"
                            size={22}
                            color={this.state.data.isFavourite ? 'blue' : '#ccc'}
                        />
                    </View>
                    <Text style={styles.paragraph}>{this.state.data.title}</Text>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }} showsVerticalScrollIndicator={false} bounces={false}>
                        <Text style={{ fontSize: 17, marginVertical: 15, flex: 1 }}>{this.state.data.detail}</Text>
                        <TouchableOpacity style={styles.okButton}
                            onPress={() => { this.props.navigation.goBack(); }}>
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
    },
    paragraph: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    okButton: {
        width: "100%",
        height: 45,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 5
    }
});
