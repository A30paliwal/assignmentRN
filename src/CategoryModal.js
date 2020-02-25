import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Button, View, Text, Modal, TouchableHighlight, Alert, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
const DATA = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1",
        title: "Updates",
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f632",
        title: "Events",
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d723",
        title: "News",
    },

    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f634",
        title: "Offers",
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d725",
        title: "Favourites",
    },
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba6",
        title: "Show archives",
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f637",
        title: "Show all",
    },
];
function Item({ id, title, selected, onSelect }) {
    return (
        <TouchableOpacity activeOpacity={1} style={{
            backgroundColor: selected ? '#333' : '#fff',
            borderColor: '#ccc', height: 45, borderLeftWidth: 1, borderRightWidth: 1,
            justifyContent: 'center',
        }} onPress={() => onSelect(id)}>
            <Text style={{ fontSize: 17, fontWeight: 'bold', color: selected ? '#fff' : '#000', marginLeft: 15, }}>{title}
            </Text>
            {selected && <FontAwesome
                style={{ position: 'absolute', right: 10, }}
                name="check"
                size={22}
                color="#fff"
            />}
        </TouchableOpacity>
    );
}

function CategoryListing() {
    const [selected, setSelected] = React.useState(new Map());

    const onSelect = React.useCallback(
        id => {
            const newSelected = new Map(selected);
            newSelected.set(id, !selected.get(id));
            setSelected(newSelected);
        },
        [selected],
    );

    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={DATA}
            renderItem={({ item }) => (
                <Item
                    id={item.id}
                    title={item.title}
                    selected={!!selected.get(item.id)}
                    onSelect={onSelect}
                />
            )}
            keyExtractor={item => item.id}
            extraData={selected}
            ListHeaderComponent={() => { return <View style={{ borderBottomWidth: 1, borderColor: '#ccc' }} /> }}
            ListFooterComponent={() => { return <View style={{ borderBottomWidth: 1, borderColor: '#ccc' }} /> }}
            ItemSeparatorComponent={() => { return <View style={{ borderBottomWidth: 1, borderColor: '#ccc' }} /> }}
        />
    );
}

export default class CategoryModal extends React.Component {
    state = {
        modalVisible: false,
    };
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
                onRequestClose={() => {
                    this.setModalVisible(!this.state.modalVisible);
                }}>
                <View style={{
                    marginHorizontal: 10, flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'stretch'
                }}>
                    <View style={{ backgroundColor: '#fff', padding: 15 }}>
                        <Text style={{ fontSize: 24, marginVertical: 15, fontWeight: '200' }}>SELECT CATEGORY.</Text>
                        <CategoryListing />
                        <TouchableOpacity style={{ width: "100%", height: 45, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center', marginTop: 35 }} onPress={() => this.setModalVisible(!this.state.modalVisible)
                        }>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        );
    }
}

