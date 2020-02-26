import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, Text, Modal, FlatList, TouchableOpacity, } from 'react-native';
import { categoryData } from './data';
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
    const [data, setData] = React.useState(new Map());

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
            data={categoryData}
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

const CategoryModal = (props) => {
    const [modalVisible, setModalVisible] = React.useState(true);
    return (
        // <View style={{ height: 100, width: 100, backgroundColor: 'red' }}><Text>hfkjdhwk</Text></View>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
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
                    <TouchableOpacity
                        style={{
                            width: "100%", height: 45, backgroundColor: 'blue', justifyContent: 'center',
                            alignItems: 'center', marginTop: 35
                        }} onPress={() => {
                            setModalVisible(!modalVisible);
                            props.callBack()
                        }
                        }>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Ok</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

export { CategoryModal };