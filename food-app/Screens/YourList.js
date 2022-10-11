import React, { useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

import FirebaseAuthSerivce from '../firebase/FirebaseAuthService';
import FirestoreService from '../firebase/FirestoreService';

const styles = StyleSheet.create({
    container: {
        flex: 0.15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 50
    },
    title: {
        color: '#53B175',
        textAlign: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5
    },
    contextTitleText: {
        color: '#53B175',
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
    },
    contextTitleView: {
        padding: 10
    },
    items: {
        paddingLeft: 30,
        lineHeight: 30
    },
    buttonView: {
        padding: 10
    },
    modalView: {
        margin: 50,
        backgroundColor: "white",
        borderRadius: 20,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 25,
        paddingRight: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    text: {
        fontSize: 42,
    },
    budgetInput: {
        // height: 40,
        flex: 1,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    loginBtn: {
        width: '90%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#53B175',
    },
    loginText: {
        color: '#FFFFFF',
        fontWeight: "bold",
    },
    TextInput: {
        height: 50,
        flex: 1,
        width: '80%',
        padding: 5,
    },
    inputView: {
        backgroundColor: '#E6E6E6',
        borderRadius: 20,
        width: '100%',
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    autocompleteContainer: {
        backgroundColor: '#ffffff',
        borderWidth: 0,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    inputContainer: {
        backgroundColor: 'transparent',
        borderColor: '#ababab',
        paddingLeft: 20
    },
    contextQuestions: {
        textAlign: 'center', 
        fontSize: 14, 
        marginBottom: 10
    },
    buttonUnpressed: {
        backgroundColor: "#d5edd9",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#b5d5bd",
        width: '65%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    buttonPressed: {
        backgroundColor: "#88cf99",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#b5d5bd",
        width: '65%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    }
});


const firebase = require('firebase');


const YourList = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [budget, setBudget] = useState(null);
    const [isItalianSelected, setItalianSelected] = useState(false);
    const [isIndianSelected, setIndianSelected] = useState(false);
    const [isMexicanSelected, setMexicanSelected] = useState(false);
    const [isChineseSelected, setChineseSelected] = useState(false);
    const [isAmericanSelected, setAmericanSelected] = useState(false);
    const [isFrenchSelected, setFrenchSelected] = useState(false);
    const [isMedSelected, setMedSelected] = useState(false);
    const [isGreekSelected, setGreekSelected] = useState(false);
    const [isJapaneseSelected, setJapaneseSelected] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSugarSelected, setSugarSelection] = useState(false);
    const [isFatSelected, setFatSelection] = useState(false);
    const [isSodiumSelected, setSodiumSelection] = useState(false);
    const [isMeatSelected, setMeatSelection] = useState(false);
    const [isVeggiesSelected, setVeggiesSelection] = useState(false);
    const [isOvenSelected, setOvenSelection] = useState(false);
    const [isStovetopSelected, setStovetopSelection] = useState(false);
    const [isMicrowaveSelected, setMicrowaveSelection] = useState(false);
    const [isFryerSelected, setFryerSelection] = useState(false);
    const [isMilkSelected, setMilkSelection] = useState(false);
    const [isEggsSelected, setEggsSelection] = useState(false);
    const [isFishSelected, setFishSelection] = useState(false);
    const [isShellfishSelected, setShellfishSelection] = useState(false);
    const [isPeanutsSelected, setPeanutsSelection] = useState(false);
    const [isTreeNutsSelected, setTreeNutsSelection] = useState(false);
    const [isWheatSelected, setWheatSelection] = useState(false);
    const [isSoySelected, setSoySelection] = useState(false);

    const [selectedItem, setSelectedItem] = useState('');
    const [listItems, setListItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    var listObject = { 
        items: [], 
        userID: '' 
    };
    const testItems = ['Broccoli', 'Cheese', 'Bacon', 'Chips', 'Pasta', 'Peanuts', 'Lemon', 'Lettuce', 'Lentils', 'Bread', 'Butter', 'Eggs', 'Yogurt', 'Sour Cream', 'Apples', 'Avocado', 'Bananas', 'Cauliflower', 'Garlic', 'Onion', 'Mushrooms', 'Spinach', 'Tomato', 'Squash', 'Ketchup', 'Mustard', 'Mayonnaise', 'Black Beans', 'Milk', 'Rice', 'Quinoa', 'Bell Peppers', 'Potatoes', 'Chicken', 'Ground Beef', 'Pork'];

    function appendToList(item) {
        const tempList = listItems;
        tempList.push(item);
        setListItems(tempList);
    }

    async function handleAddList(listItems) {
        try {
            listObject.items = listItems;
            listObject.userID = FirebaseAuthSerivce.auth.currentUser.uid;
            const response = await FirestoreService.createDocument(
                'lists',
                listObject
            );
            alert('Initial list successfully created.')
            setListItems([]);

        } catch (error) {
            alert(error.message);
        }
    }

    async function handleAddListContext(listContext) {
        try {
          const response = await FirestoreService.createDocument(
            'list-context',
            listContext
          );
    
        } catch (error) {
          alert(error.message);
        }
      }

    const findItem = (query) => {
        if (query) {
            const regex = new RegExp(`${query.trim()}`, 'i');
            setFilteredItems(testItems.filter((item) => item.search(regex) >= 0));
        }
        else {
            setFilteredItems([]); // no matches
        }
    };

    function checkFieldsHaveContent() {
        if (!route.params.isRegistered && firstName == '' | lastName == '') {
            alert('Please enter a first and last name');
            if (phoneNumber == '') {
                alert('Please enter a phone number.');
            }
            return false;
        }

        var fieldsHaveContent = false;
        if (budget == null) {
            alert('Please enter a budget')
            return false;
        } else if (isNaN(budget)) {
            alert('Invalid budget input')
            return false;
        } else {
            fieldsHaveContent = true;
        }

        if (fieldsHaveContent) {
            setModalVisible(!modalVisible)
        } else {
            alert('Please fill out all fields.')
        }

        return true;
    }

    function handleListContextSubmit() {

        var listContext;

        if (route.params.isRegistered) {
            var budgetNumber = Number(budget);

            var paymentMethod = 'credit';

            var cuisinePreferences = {
                isItalianSelected,
                isIndianSelected,
                isMexicanSelected,
                isChineseSelected,
                isAmericanSelected,
                isFrenchSelected,
                isMedSelected,
                isGreekSelected,
                isJapaneseSelected
            }

            var userID = FirebaseAuthSerivce.auth.currentUser.uid;

            listContext = {
                userID,
                cuisinePreferences,
                budgetNumber,
                paymentMethod
            }
        } else {
            var budgetNumber = Number(budget);

            var paymentMethod = 'credit';

            var cuisinePreferences = {
                isItalianSelected,
                isIndianSelected,
                isMexicanSelected,
                isChineseSelected,
                isAmericanSelected,
                isFrenchSelected,
                isMedSelected,
                isGreekSelected,
                isJapaneseSelected
            }

            var contactInfo = {
                firstName,
                lastName,
                phoneNumber
            };

            var healthGoals = {
                isSugarSelected,
                isSodiumSelected,
                isFatSelected,
                isMeatSelected,
                isVeggiesSelected
            };

            var allergens = {
                isMilkSelected,
                isFishSelected,
                isEggsSelected,
                isShellfishSelected,
                isPeanutsSelected,
                isTreeNutsSelected,
                isWheatSelected,
                isSoySelected
            };

            var appliances = {
                isOvenSelected,
                isStovetopSelected,
                isMicrowaveSelected,
                isFryerSelected
            };

            listContext = {
                cuisinePreferences,
                budgetNumber,
                paymentMethod,
                contactInfo,
                healthGoals,
                allergens,
                appliances
            }
        }

        try {
            handleAddListContext(listContext)
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View>
            <Autocomplete
                autoCorrect={false}
                clearButtonMode={'always'}
                containerStyle={styles.autocompleteContainer}
                data={filteredItems}
                defaultValue={JSON.stringify(selectedItem) === '{}' ?
                '' : selectedItem}
                flatListProps={{
                    keyboardShouldPersistTaps: 'always',
                    renderItem: ({ item }) => (
                        <TouchableOpacity onPress={() => {
                            setSelectedItem(item);
                            setFilteredItems([]);
                            appendToList(item);
                        }}>
                            <Text style={styles.items}>{item}</Text>
                        </TouchableOpacity>
                    ),            
                }}
                inputContainerStyle={styles.inputContainer}
                onChangeText={(text) => findItem(text)}
                placeholder="Enter an item"
            />
            <View style={{ marginTop: 15 }}>
                <Text style={styles.contextQuestions}>{listItems.length > 0 ? `Current List:` : ``}</Text>
                <FlatList
                    data={listItems}
                    renderItem={({ item }) => <Text style={styles.items}>{item}</Text>}
                />
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { 
                        handleListContextSubmit(); 
                        handleAddList(listItems); 
                        }} style={styles.loginBtn}>
                        <Text style={styles.loginText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
export default YourList;