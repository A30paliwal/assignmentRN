import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, Text, Modal, FlatList, TouchableOpacity, } from 'react-native';
import { categoryData } from './data';

function Item({ title, selected, callBack }) {
    return (
        <TouchableOpacity activeOpacity={1} style={{
            backgroundColor: selected ? '#333' : '#fff',
            borderColor: '#ccc', height: 45, borderLeftWidth: 1, borderRightWidth: 1,
            justifyContent: 'center',
        }} onPress={() => {
            callBack(title);
        }}>
            <Text style={{ fontSize: 17, fontWeight: 'bold', color: selected ? '#fff' : '#000', marginLeft: 15 }}>{title}
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

function CategoryListing(props) {
    const [selected, setSelected] = React.useState(props.selectedIndex);
    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={categoryData}
            renderItem={({ item, index }) => (
                <Item
                    title={item.title}
                    selected={selected == index}
                    callBack={(temp) => {
                        setSelected(index);
                        props.callBack(temp, index);
                    }}
                />
            )}
            keyExtractor={item => item.id}
            extraData={selected}
            ListHeaderComponent={() => <BorderComponent />}
            ListFooterComponent={() => <BorderComponent />}
            ItemSeparatorComponent={() => <BorderComponent />}
        />
    );
}
function BorderComponent() {
    return <View style={{ borderBottomWidth: 1, borderColor: '#ccc' }} />
}

function CategoryModal(props) {
    const [modalVisible, setModalVisible] = React.useState(true);
    let selectedItem = props.selectedIndex != -1 ? categoryData[props.selectedIndex].title : "";
    let selectedIndex = props.selectedIndex;
    return (
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
                    <CategoryListing
                        selectedIndex={selectedIndex}
                        callBack={(temp, index) => {
                            console.log("CallBack", temp);
                            selectedItem = temp;
                            selectedIndex = index;
                        }} />
                    <TouchableOpacity
                        style={{
                            width: "100%", height: 45, backgroundColor: 'blue', justifyContent: 'center',
                            alignItems: 'center', marginTop: 35
                        }} onPress={() => {
                            setModalVisible(!modalVisible);
                            console.log("Props", props);
                            props.callBack(selectedItem, selectedIndex);

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