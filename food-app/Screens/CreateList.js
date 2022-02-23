import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    FlatList,
    TouchableOpacity,
    Button,
    TouchableHighlight,
} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import FirestoreService from '../firebase/FirestoreService';

const styles = StyleSheet.create({
    container: {
        flex: 0.15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputView: {
        backgroundColor: '#E6E6E6',
        borderRadius: 30,
        width: '85%',
        height: 45,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 20,
      },
      items: {
          paddingLeft: 30,
          lineHeight: 30
      },
      loginText: {
        color: '#FFFFFF'
      },
      loginBtn: {
        width: '70%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#53B175',
      },
});

const CreateList = ({ navigation, route }) => {

    const [listItem, setListItem] = useState('');
    const [listItems, setListItems] = useState([]);
    var listObject = {items: []};

    function handleAddList() {
        route.params.addList(listItems);
        alert('Initial list successfully created.');
    }

    function appendToList(item) {
        const tempList = listItems;
        tempList.push(item);
        setListItems(tempList);
        setListItem('');
    }

    async function handleAddList(listItems) {
        try {
          listObject.items = listItems;
          const response = await FirestoreService.createDocument(
            'lists',
            listObject
          );
          setListItems([]);
    
        } catch (error) {
          alert(error.message);
        }
      }

    /*
    useEffect(() => {
        fetchListItems().then((fetchedListItems) => {
            setListItems(fetchedListItems);
        })
        .catch((error) => {
            console.error(error.message);
            throw error;
        })
    }, [listItems])

    async function fetchListItems() {
        let fetchedListItems = [];

        try {
            const response = await FirestoreService.readDocument('lists', );
        }
    }*/

        return(
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <TouchableHighlight onPress={() => {appendToList(listItem)}}>
                        <Ionicons style={{ padding: 10 }} name={"add-outline"} size={24} />
                    </TouchableHighlight>
                    <TextInput
                        style={styles.inputView}
                        value={listItem}
                        placeholder='Add Item'
                        placeholderTextColor='#525252'
                        onChangeText={(listItem) => setListItem(listItem)}
                    />
                </View>
                <View>
                    <FlatList 
                        data={listItems}
                        renderItem={({item}) => <Text style={styles.items}>{item}</Text>}
                    />
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => {handleAddList(listItems)}} style={styles.loginBtn}>
                            <Text style={styles.loginText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
}
export default CreateList;