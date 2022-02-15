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
import { CheckBox } from 'react-native-elements';

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
        width: '70%',
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
});

const Welcome = ({ navigation, route }) => {

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

    function handleLogout() {
        FirebaseAuthSerivce.logoutUser();
    }

    function handleUserInfoSubmit() {
        const newUserInfo = {
            contactInfo,
            healthGoals,
            allergens,
            appliances
        };

        route.params.addUserInfo(newUserInfo);
        alert('User information successfully saved.');
    }

        return(
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
                        <Text style={{ textAlign: 'center', fontSize: 18 }}>Welcome, {route.params.existingUser.email}!</Text>
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
                        <TouchableOpacity onPress={() => {handleUserInfoSubmit(); navigation.navigate('Home');}} style={styles.loginBtn}>
                            <Text style={styles.loginText}>Continue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {handleLogout()}} style={styles.loginBtn}>
                            <Text style={styles.loginText}>Log Out</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        );
}
export default Welcome;