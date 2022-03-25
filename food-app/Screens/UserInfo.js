import React, { useState } from 'react'
import FirebaseAuthSerivce from '../firebase/FirebaseAuthService';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import FirestoreService from '../firebase/FirestoreService';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        paddingTop: 60,
        flex: 1, flexDirection: 'row',
        justifyContent: 'space-between'
    },
    loginText: {
        color: '#FFFFFF'
    },
    inputView: {
        backgroundColor: '#E6E6E6',
        borderRadius: 30,
        width: '100%',
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    TextInput: {
        height: 50,
        flex: 1,
        width: '80%',
    },
    login: {
        color: '#53B175',
        textAlign: 'center'
    },
    carrotIcon: {
        height: 70,
        width: 70
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
    buttonNormalGoals: {
        backgroundColor: "#d5edd9",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#b5d5bd",
        width: '55%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    buttonPressGoals: {
        backgroundColor: "#88cf99",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#b5d5bd",
        width: '55%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    buttonNormalAppliances: {
        backgroundColor: "#d5edd9",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#b5d5bd",
        width: '40%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    buttonPressAppliances: {
        backgroundColor: "#88cf99",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#b5d5bd",
        width: '40%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    buttonNormalAllergens: {
        backgroundColor: "#d5edd9",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#b5d5bd",
        width: '40%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    buttonPressAllergens: {
        backgroundColor: "#88cf99",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#b5d5bd",
        width: '40%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    }
});

const Welcome = ({ navigation, route, existingUser }) => {

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

    // function handleUserInfoSubmit() {
    //     const newUserInfo = {
    //         contactInfo,
    //         healthGoals,
    //         allergens,
    //         appliances
    //     };

    //     route.params.addUserInfo(newUserInfo);
    //     alert('User information successfully saved.');
    // }

    async function handleAddUserInfo() {
        const newUserInfo = {
            contactInfo,
            healthGoals,
            allergens,
            appliances
        };
        try {
            const response = await FirestoreService.createDocument(
                'user-context',
                newUserInfo
            );

        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.title}>
                    <View style={{ flex: 1 }}>
                    </View>
                    <View style={{ flex: 2, alignItems: 'center' }}>
                        <Image
                            style={styles.carrotIcon}
                            source={require('../assets/Carrot.png')}
                        />
                    </View>
                    <View
                        style={{ flex: 1, paddingRight: 10 }}>
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <View style={{ flex: 1, paddingTop: 30 }}>
                    <Text style={{ textAlign: 'center', fontSize: 18 }}>{FirebaseAuthSerivce.auth.currentUser.isAnonymous ? `Welcome to FINs!` : `Welcome, ${route.params.existingUser.email}!`}</Text>
                    <Text style={{ textAlign: 'center', fontSize: 14 }}>{'\n'}Before we get started, tell us about yourself:</Text>
                </View>
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
                    <Text style={{ textAlign: 'center', fontSize: 14, marginBottom: 20 }}>{'\n'}What are some of your health goals?</Text>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity activeOpacity={1} style={isSugarSelected ? styles.buttonPressGoals : styles.buttonNormalGoals} onPress={() => { setSugarSelection(!isSugarSelected) }}>
                            <Text>Eat less sugar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={isFatSelected ? styles.buttonPressGoals : styles.buttonNormalGoals} onPress={() => { setFatSelection(!isFatSelected) }}>
                            <Text>Eat less saturated fat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={isSodiumSelected ? styles.buttonPressGoals : styles.buttonNormalGoals} onPress={() => { setSodiumSelection(!isSodiumSelected) }}>
                            <Text>Eat less sodium</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={isMeatSelected ? styles.buttonPressGoals : styles.buttonNormalGoals} onPress={() => { setMeatSelection(!isMeatSelected) }}>
                            <Text>Eat less red meat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={isVeggiesSelected ? styles.buttonPressGoals : styles.buttonNormalGoals} onPress={() => { setVeggiesSelection(!isVeggiesSelected) }}>
                            <Text>Eat more vegetables</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ textAlign: 'center', fontSize: 14, marginBottom: 20 }}>{'\n'}Which appliances are available to you?</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity activeOpacity={1} style={isOvenSelected ? styles.buttonPressAppliances : styles.buttonNormalAppliances} onPress={() => { setOvenSelection(!isOvenSelected) }}>
                            <Text>Oven</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={isStovetopSelected ? styles.buttonPressAppliances : styles.buttonNormalAppliances} onPress={() => { setStovetopSelection(!isStovetopSelected) }}>
                            <Text>Stovetop</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity activeOpacity={1} style={isMicrowaveSelected ? styles.buttonPressAppliances : styles.buttonNormalAppliances} onPress={() => { setMicrowaveSelection(!isMicrowaveSelected) }}>
                            <Text>Microwave</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={isFryerSelected ? styles.buttonPressAppliances : styles.buttonNormalAppliances} onPress={() => { setFryerSelection(!isFryerSelected) }}>
                            <Text>Air Fryer</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ textAlign: 'center', fontSize: 14, marginBottom: 20 }}>{'\n'}Do you have any allergies?</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity activeOpacity={1} style={isMilkSelected ? styles.buttonPressAllergens : styles.buttonNormalAllergens} onPress={() => { setMilkSelection(!isMilkSelected) }}>
                            <Text>Milk</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={isFishSelected ? styles.buttonPressAllergens : styles.buttonNormalAllergens} onPress={() => { setFishSelection(!isFishSelected) }}>
                            <Text>Fish</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity activeOpacity={1} style={isEggsSelected ? styles.buttonPressAllergens : styles.buttonNormalAllergens} onPress={() => { setEggsSelection(!isEggsSelected) }}>
                            <Text>Eggs</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={isShellfishSelected ? styles.buttonPressAllergens : styles.buttonNormalAllergens} onPress={() => { setShellfishSelection(!isShellfishSelected) }}>
                            <Text>Shellfish</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity activeOpacity={1} style={isPeanutsSelected ? styles.buttonPressAllergens : styles.buttonNormalAllergens} onPress={() => { setPeanutsSelection(!isPeanutsSelected) }}>
                            <Text>Peanuts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={isTreeNutsSelected ? styles.buttonPressAllergens : styles.buttonNormalAllergens} onPress={() => { setTreeNutsSelection(!isTreeNutsSelected) }}>
                            <Text>Tree Nuts</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity activeOpacity={1} style={isWheatSelected ? styles.buttonPressAllergens : styles.buttonNormalAllergens} onPress={() => { setWheatSelection(!isWheatSelected) }}>
                            <Text>Wheat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={isSoySelected ? styles.buttonPressAllergens : styles.buttonNormalAllergens} onPress={() => { setSoySelection(!isSoySelected) }}>
                            <Text>Soy</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => { handleAddUserInfo(); navigation.navigate('Home'); }} style={styles.loginBtn}>
                        <Text style={styles.loginText}>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}
export default Welcome;