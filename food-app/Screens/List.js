import React, { useState } from 'react';

import {
    Text,
    StyleSheet,
    View,
    Alert,
    Modal,
    Pressable,
    ScrollView,
    TextInput,
    TouchableOpacity

} from 'react-native';

import { ButtonGroup, CheckBox } from 'react-native-elements';

const styles = StyleSheet.create({
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
        width: '100%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#53B175',
    },
    loginText: {
        color: '#FFFFFF'
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
});


var paymentArray = ['PayPal', 'Credit', 'Debit'];

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
    const [selectedIndex, setSelectedIndex] = useState(0);
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
    const [isGlutenSelected, setGlutenSelection] = useState(false);
    const [isNutsSelected, setNutsSelection] = useState(false);
    const [isDairySelected, setDairySelection] = useState(false);
    const [isSeafoodSelected, setSeafoodSelection] = useState(false);

    function checkFieldsHaveContent() {
        if( !route.params.isRegistered && firstName == '' | lastName == '' ){
            alert('Please enter a first and last name');
            if(phoneNumber == ''){
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

        if (route.params.isRegistered) {
            var budgetNumber = Number(budget);

            var paymentMethod = paymentArray[selectedIndex];

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

            const newListInfo = {
                cuisinePreferences,
                budgetNumber,
                paymentMethod
            }

            try {
                route.params.addListContext(newListInfo);
                alert('List information successfully saved.');
            } catch (e) {
                console.log(e);
                alert('Unable to save list information');
            }
        } else {
            var budgetNumber = Number(budget);

            var paymentMethod = paymentArray[selectedIndex];

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
                isGlutenSelected,
                isDairySelected,
                isNutsSelected,
                isSeafoodSelected
            };

            var appliances = {
                isOvenSelected,
                isStovetopSelected,
                isMicrowaveSelected,
                isFryerSelected
            };

            const newListInfo = {
                cuisinePreferences,
                budgetNumber,
                paymentMethod,
                contactInfo,
                healthGoals,
                allergens,
                appliances
            }

            try {
                // not able to upload info to firebase yet
                // route.params.addListContext(newListInfo);
                alert('List information successfully saved.');
            } catch (e) {
                console.log(e);
                alert('Unable to save list information');
            }
        }


    }

    return (
        <View>
            {
                route.params.isRegistered ? (
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
                                        <Text style={{ textAlign: 'center', fontSize: 14 }}>{'\n'}What cuisine would you like to shop for?</Text>
                                        <CheckBox
                                            title="Italian"
                                            checked={isItalianSelected}
                                            onPress={() => setItalianSelected(!isItalianSelected)}
                                        />
                                        <CheckBox
                                            title="Indian"
                                            checked={isIndianSelected}
                                            onPress={() => setIndianSelected(!isIndianSelected)}
                                        />
                                        <CheckBox
                                            title="Mexican"
                                            checked={isMexicanSelected}
                                            onPress={() => setMexicanSelected(!isMexicanSelected)}
                                        />
                                        <CheckBox
                                            title="American"
                                            checked={isAmericanSelected}
                                            onPress={() => setAmericanSelected(!isAmericanSelected)}
                                        />
                                        <CheckBox
                                            title="Chinese"
                                            checked={isChineseSelected}
                                            onPress={() => setChineseSelected(!isChineseSelected)}
                                        />
                                        <CheckBox
                                            title="French"
                                            checked={isFrenchSelected}
                                            onPress={() => setFrenchSelected(!isFrenchSelected)}
                                        />
                                        <CheckBox
                                            title="Mediterranean"
                                            checked={isMedSelected}
                                            onPress={() => setMedSelected(!isMedSelected)}
                                        />
                                        <CheckBox
                                            title="Greek"
                                            checked={isGreekSelected}
                                            onPress={() => setGreekSelected(!isGreekSelected)}
                                        />
                                        <CheckBox
                                            title="Japanese"
                                            checked={isJapaneseSelected}
                                            onPress={() => setJapaneseSelected(!isJapaneseSelected)}
                                        />
                                        <ButtonGroup
                                            style={{
                                                margin: 20
                                            }}
                                            buttons={paymentArray}
                                            selectedIndex={selectedIndex}
                                            onPress={(value) => {
                                                setSelectedIndex(value);
                                            }}
                                            containerStyle={{ marginBottom: 20 }}
                                        />
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
                                <View style={{ flex: 5, alignItems: 'center' }}>
                                    <ScrollView>
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
                                        <Text style={{ textAlign: 'center', fontSize: 14 }}>{'\n'}What are some of your health goals?</Text>
                                        <CheckBox
                                            title="Eat less sugar"
                                            checked={isSugarSelected}
                                            onPress={() => setSugarSelection(!isSugarSelected)}
                                        />
                                        <CheckBox
                                            title="Eat less saturated fat"
                                            checked={isFatSelected}
                                            onPress={() => setFatSelection(!isFatSelected)}
                                        />
                                        <CheckBox
                                            title="Eat less sodium"
                                            checked={isSodiumSelected}
                                            onPress={() => setSodiumSelection(!isSodiumSelected)}
                                        />
                                        <CheckBox
                                            title="Eat less red meat"
                                            checked={isMeatSelected}
                                            onPress={() => setMeatSelection(!isMeatSelected)}
                                        />
                                        <CheckBox
                                            title="Eat more fruits and vegetables"
                                            checked={isVeggiesSelected}
                                            onPress={() => setVeggiesSelection(!isVeggiesSelected)}
                                        />
                                        <Text style={{ textAlign: 'center', fontSize: 14 }}>{'\n'}Which appliances are available to you?</Text>
                                        <CheckBox
                                            title="Oven"
                                            checked={isOvenSelected}
                                            onPress={() => setOvenSelection(!isOvenSelected)}
                                        />
                                        <CheckBox
                                            title="Stovetop"
                                            checked={isStovetopSelected}
                                            onPress={() => setStovetopSelection(!isStovetopSelected)}
                                        />
                                        <CheckBox
                                            title="Microwave"
                                            checked={isMicrowaveSelected}
                                            onPress={() => setMicrowaveSelection(!isMicrowaveSelected)}
                                        />
                                        <CheckBox
                                            title="Air Fryer"
                                            checked={isFryerSelected}
                                            onPress={() => setFryerSelection(!isFryerSelected)}
                                        />
                                        <Text style={{ textAlign: 'center', fontSize: 14 }}>{'\n'}Do you have any allergies?</Text>
                                        <CheckBox
                                            title="Gluten"
                                            checked={isGlutenSelected}
                                            onPress={() => setGlutenSelection(!isGlutenSelected)}
                                        />
                                        <CheckBox
                                            title="Dairy"
                                            checked={isDairySelected}
                                            onPress={() => setDairySelection(!isDairySelected)}
                                        />
                                        <CheckBox
                                            title="Nuts"
                                            checked={isNutsSelected}
                                            onPress={() => setNutsSelection(!isNutsSelected)}
                                        />
                                        <CheckBox
                                            title="Seafood"
                                            checked={isSeafoodSelected}
                                            onPress={() => setSeafoodSelection(!isSeafoodSelected)}
                                        />
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
                                        <Text style={{ textAlign: 'center', fontSize: 14 }}>{'\n'}What cuisine would you like to shop for?</Text>
                                        <CheckBox
                                            title="Italian"
                                            checked={isItalianSelected}
                                            onPress={() => setItalianSelected(!isItalianSelected)}
                                        />
                                        <CheckBox
                                            title="Indian"
                                            checked={isIndianSelected}
                                            onPress={() => setIndianSelected(!isIndianSelected)}
                                        />
                                        <CheckBox
                                            title="Mexican"
                                            checked={isMexicanSelected}
                                            onPress={() => setMexicanSelected(!isMexicanSelected)}
                                        />
                                        <CheckBox
                                            title="American"
                                            checked={isAmericanSelected}
                                            onPress={() => setAmericanSelected(!isAmericanSelected)}
                                        />
                                        <CheckBox
                                            title="Chinese"
                                            checked={isChineseSelected}
                                            onPress={() => setChineseSelected(!isChineseSelected)}
                                        />
                                        <CheckBox
                                            title="French"
                                            checked={isFrenchSelected}
                                            onPress={() => setFrenchSelected(!isFrenchSelected)}
                                        />
                                        <CheckBox
                                            title="Mediterranean"
                                            checked={isMedSelected}
                                            onPress={() => setMedSelected(!isMedSelected)}
                                        />
                                        <CheckBox
                                            title="Greek"
                                            checked={isGreekSelected}
                                            onPress={() => setGreekSelected(!isGreekSelected)}
                                        />
                                        <CheckBox
                                            title="Japanese"
                                            checked={isJapaneseSelected}
                                            onPress={() => setJapaneseSelected(!isJapaneseSelected)}
                                        />
                                        <ButtonGroup
                                            style={{
                                                margin: 20
                                            }}
                                            buttons={paymentArray}
                                            selectedIndex={selectedIndex}
                                            onPress={(value) => {
                                                setSelectedIndex(value);
                                            }}
                                            containerStyle={{ marginBottom: 20 }}
                                        />
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




            <View>
                <Text style={styles.title}>
                    Shopping List
                </Text>
                <Pressable
                    style={styles.loginBtn}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={styles.textStyle}>Edit List Context</Text>
                </Pressable>
                <Pressable
                    style={styles.loginBtn}
                    onPress={() => { handleListContextSubmit(); navigation.navigate('HomeScreen'); }}
                >
                    <Text style={styles.textStyle}>Submit</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default List;
