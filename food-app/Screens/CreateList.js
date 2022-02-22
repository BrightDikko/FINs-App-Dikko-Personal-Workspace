import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    Button,
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
      }
});

const CreateList = ({ navigation, route }) => {

    const [listItems, setListItems] = useState([]);

    function handleAddList() {
        const newList = [];

        route.params.addList(newList);
        alert('Initial list successfully created.');
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
                    <Ionicons style={{ padding: 10 }} name={"add-outline"} size={24} />
                        <TextInput
                            style={styles.inputView} 
                            placeholder='Add Item'
                            placeholderTextColor='#525252'
                        />
                </View>
                <View>
                    
                </View>
            </View>
        );
}
export default CreateList;