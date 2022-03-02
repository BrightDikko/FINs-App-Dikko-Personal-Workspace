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
import Autocomplete from 'react-native-autocomplete-input';

const styles = StyleSheet.create({
    container: {
        flex: 0.15,
        flexDirection: 'row',
        alignItems: 'center',
        height: "100%"
    },
    searchContainer: {
        backgroundColor: '#f0f0f0',
        flex: 1,
        padding: 10,
        marginTop: 40
    },
    autocompleteContainer: {
        backgroundColor: '#ffffff',
        borderWidth: 0,
        marginLeft: 30,
        marginRight: 10
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
      searchSection: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        marginLeft: '5%',
        marginRight: '5%',
        backgroundColor: '#fff',
      },
      inputContainer: {
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderColor: 'transparent',
        paddingLeft: 35
      },
      searchIcon: {
        paddingLeft: 5,
        paddingTop: 5,
        backgroundColor: 'transparent',
      },
});

const CreateList = ({ navigation, route }) => {

    const [selectedItem, setSelectedItem] = useState('');
    const [listItems, setListItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    var listObject = {items: []};

    // In the future, fetch complete list of items from API instead of hardcoding test list
    const testItems = ['Broccoli', 'Cheese', 'Bacon', 'Chips', 'Pasta', 'Peanuts', 'Lemon', 'Lettuce', 'Lentils'];

    function handleAddList() {
        route.params.addList(listItems);
        alert('Initial list successfully created.');
    }

    function appendToList(item) {
        const tempList = listItems;
        tempList.push(item);
        setListItems(tempList);
        setSelectedItem('');
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
          setListItems(testItems);
      }, []);*/

      const findItem = (query) => {
          if(query) {
              const regex = new RegExp(`${query.trim()}`, 'i');
              setFilteredItems(testItems.filter((item) => item.search(regex) >= 0));
          }
          else {
              setFilteredItems([]); // no matches
          }
      };

    // In future implementations, fetch items from API as the base list of items to match while user is typing
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
                {/*
                <View style={styles.container}>
                    <TouchableHighlight underlayColor={'transparent'} onPress={() => {appendToList(selectedItem)}}>
                        <Ionicons style={{ padding: 10 }} name={"add-outline"} size={24} />
                    </TouchableHighlight>
                    <TextInput
                        style={styles.inputView}
                        value={selectedItem}
                        placeholder='Add Item'
                        placeholderTextColor='#525252'
                        onChangeText={(selectedItem) => setSelectedItem(selectedItem)}
                    />
                </View>*/}
                <View style={{ padding: 10, flex: 1 }}>
                        <TouchableHighlight onPress={() => {appendToList(selectedItem)}}>
                            <Ionicons style={styles.searchIcon} name={"add-outline"} size={24} />
                        </TouchableHighlight>
                        <Autocomplete
                            autoCapitalize="none"
                            autoCorrect={false}    
                            containerStyle={styles.autocompleteContainer}                    
                            data={filteredItems}
                            defaultValue={JSON.stringify(selectedItem) === '{}' ? '' : selectedItem}                
                            flatListProps={{
                                keyboardShouldPersistTaps: 'always',
                                renderItem: ({ item }) => (
                                  <TouchableOpacity onPress={() => setSelectedItem(item)}>
                                    <Text style={styles.items}>{item}</Text>
                                  </TouchableOpacity>
                                ),
                    
                                //renderItem: ({ item }) => <Text style={styles.items}>{item}</Text>,
                            }}
                            //inputContainerStyle={styles.inputContainer}
                            onChangeText={(text) => findItem(text)}
                            placeholder="Enter an item"
                            /*
                            renderItem={({item}) => (
                                <TouchableOpacity
                                onPress={() => {
                                    alert('pressed');
                                    console.log(item);
                                    setSelectedItem(item);
                                    setFilteredItems([]);
                                    appendToList(item);
                                }}>
                                <Text>{item}</Text>
                                </TouchableOpacity>
                            )}          */    
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