import React, { useState } from 'react';

import {
    Text,
    StyleSheet,
    View,
    Alert,
    Modal,
    ScrollView,
    TextInput,
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


const List = ({ navigation, route }) => {
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

    // In the future, fetch complete list of items from API instead of hardcoding test list
    const testItems = ['Broccoli', 'Cheese', 'Bacon', 'Chips', 'Pasta', 'Peanuts', 'Lemon', 'Lettuce', 'Lentils', 'Bread', 'Butter', 'Eggs', 'Yogurt', 'Sour Cream', 'Apples', 'Avocado', 'Bananas', 'Cauliflower', 'Garlic', 'Onion', 'Mushrooms', 'Spinach', 'Tomato', 'Squash', 'Ketchup', 'Mustard', 'Mayonnaise', 'Black Beans', 'Milk', 'Rice', 'Quinoa', 'Bell Peppers', 'Potatoes', 'Chicken', 'Ground Beef', 'Pork'];

    // function handleAddList() {
    //     route.params.addList(listItems);
    //     alert('Initial list successfully created.');
    // }

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
            {
                FirebaseAuthSerivce.auth.currentUser.isAnonymous ? (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.contextTitleView}>
                                    <Text style={styles.contextTitleText}>
                                        Enter List Constraints
                                    </Text>
                                </View>
                                <View style={{ flex: 5, alignItems: 'center' }}>
                                    <ScrollView>
                                        <Text style={styles.contextQuestions}>{'\n'}Before we get started, tell us about yourself:</Text>
                                        <View style={styles.inputView}>
                                            <TextInput
                                                style={styles.TextInput}
                                                value={firstName}
                                                placeholder='First Name'
                                                placeholderTextColor='#525252'
                                                onChangeText={(firstName) => setFirstName(firstName)}
                                            />
                                        </View>
                                        <View style={styles.inputView}>
                                            <TextInput
                                                style={styles.TextInput}
                                                value={lastName}
                                                placeholder='Last Name'
                                                placeholderTextColor='#525252'
                                                onChangeText={(lastName) => setLastName(lastName)}
                                            />
                                        </View>
                                        <View style={styles.inputView}>
                                            <TextInput
                                                style={styles.TextInput}
                                                value={phoneNumber}
                                                placeholder='Phone Number'
                                                placeholderTextColor='#525252'
                                                onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                                            />
                                        </View>
                                        <Text style={styles.contextQuestions}>{'\n'}What are some of your health goals?</Text>
                                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity activeOpacity={1} style={isSugarSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setSugarSelection(!isSugarSelected)}}>
                                                <Text>Eat less sugar</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isFatSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setFatSelection(!isFatSelected)}}>
                                                <Text>Eat less saturated fat</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isSodiumSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setSodiumSelection(!isSodiumSelected)}}>
                                                <Text>Eat less sodium</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isMeatSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setMeatSelection(!isMeatSelected)}}>
                                                <Text>Eat less red meat</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isVeggiesSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setVeggiesSelection(!isVeggiesSelected)}}>
                                                <Text>Eat more vegetables</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.contextQuestions}>{'\n'}Which appliances are available to you?</Text>
                                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity activeOpacity={1} style={isOvenSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setOvenSelection(!isOvenSelected)}}>
                                                <Text>Oven</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isStovetopSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setStovetopSelection(!isStovetopSelected)}}>
                                                <Text>Stovetop</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isMicrowaveSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setMicrowaveSelection(!isMicrowaveSelected)}}>
                                                <Text>Microwave</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isFryerSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setFryerSelection(!isFryerSelected)}}>
                                                <Text>Air Fryer</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.contextQuestions}>{'\n'}Do you have any allergies?</Text>
                                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity activeOpacity={1} style={isMilkSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setMilkSelection(!isMilkSelected)}}>
                                                <Text>Milk</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isFishSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setFishSelection(!isFishSelected)}}>
                                                <Text>Fish</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isEggsSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setEggsSelection(!isEggsSelected)}}>
                                                <Text>Eggs</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isShellfishSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setShellfishSelection(!isShellfishSelected)}}>
                                                <Text>Shellfish</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isPeanutsSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setPeanutsSelection(!isPeanutsSelected)}}>
                                                <Text>Peanuts</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isTreeNutsSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setTreeNutsSelection(!isTreeNutsSelected)}}>
                                                <Text>Tree Nuts</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isWheatSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setWheatSelection(!isWheatSelected)}}>
                                                <Text>Wheat</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isSoySelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setSoySelection(!isSoySelected)}}>
                                                <Text>Soy</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.contextQuestions}>{'\n'}What is your budget?</Text>
                                        <View style={styles.inputView}>
                                            <TextInput
                                                style={styles.TextInput}
                                                value={budget}
                                                placeholder="Enter budget"
                                                placeholderTextColor='#525252'
                                                keyboardType="numeric"
                                                onChangeText={(budget) => setBudget(budget)}
                                            />
                                        </View>
                                        <Text style={styles.contextQuestions}>{'\n'}What cuisine would you like to shop for?</Text>
                                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity activeOpacity={1} style={isItalianSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setItalianSelected(!isItalianSelected)}}>
                                                <Text>Italian</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isIndianSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setIndianSelected(!isIndianSelected)}}>
                                                <Text>Indian</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isMexicanSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setMexicanSelected(!isMexicanSelected)}}>
                                                <Text>Mexican</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isAmericanSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setAmericanSelected(!isAmericanSelected)}}>
                                                <Text>American</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isChineseSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setChineseSelected(!isChineseSelected)}}>
                                                <Text>Chinese</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isFrenchSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setFrenchSelected(!isFrenchSelected)}}>
                                                <Text>French</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isMedSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setMedSelected(!isMedSelected)}}>
                                                <Text>Mediterranean</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isGreekSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setGreekSelected(!isGreekSelected)}}>
                                                <Text>Greek</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isJapaneseSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setJapaneseSelected(!isJapaneseSelected)}}>
                                                <Text>Japanese</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </ScrollView>
                                </View>
                                <View style={styles.buttonView}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.loginBtn]}
                                        onPress={() => { checkFieldsHaveContent() }}
                                    >
                                        <Text style={styles.loginText}>Enter</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                ) : (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.contextTitleView}>
                                    <Text style={styles.contextTitleText}>
                                        Enter List Constraints
                                    </Text>
                                </View>
                                <Text style={styles.contextQuestions}>{'\n'}What is your budget?</Text>
                                <View style={{ flex: 5, alignItems: 'center' }}>
                                    <ScrollView>
                                        <View style={styles.inputView}>
                                            <TextInput
                                                style={styles.TextInput}
                                                value={budget}
                                                placeholder="Enter budget"
                                                placeholderTextColor='#525252'
                                                keyboardType="numeric"
                                                onChangeText={(budget) => setBudget(budget)}
                                            />
                                        </View>
                                        <Text style={{ textAlign: 'center', fontSize: 14, marginBottom: 20 }}>{'\n'}What cuisine would you like to shop for?</Text>
                                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity activeOpacity={1} style={isItalianSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setItalianSelected(!isItalianSelected)}}>
                                                <Text>Italian</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isIndianSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setIndianSelected(!isIndianSelected)}}>
                                                <Text>Indian</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isMexicanSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setMexicanSelected(!isMexicanSelected)}}>
                                                <Text>Mexican</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isAmericanSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setAmericanSelected(!isAmericanSelected)}}>
                                                <Text>American</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isChineseSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setChineseSelected(!isChineseSelected)}}>
                                                <Text>Chinese</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isFrenchSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setFrenchSelected(!isFrenchSelected)}}>
                                                <Text>French</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isMedSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setMedSelected(!isMedSelected)}}>
                                                <Text>Mediterranean</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isGreekSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setGreekSelected(!isGreekSelected)}}>
                                                <Text>Greek</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={isJapaneseSelected ? styles.buttonPressed : styles.buttonUnpressed} onPress={() => {setJapaneseSelected(!isJapaneseSelected)}}>
                                                <Text>Japanese</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </ScrollView>
                                </View>
                                <View style={styles.buttonView}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.loginBtn]}
                                        onPress={() => { checkFieldsHaveContent() }}
                                    >
                                        <Text style={styles.loginText}>Enter</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                )
            }
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
                        navigation.navigate('Home');
                        }} style={styles.loginBtn}>
                        <Text style={styles.loginText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default List;
