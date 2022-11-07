import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    Modal
} from 'react-native';

const SignupModal = ({show, username, password, hidePassword, 
                    firstName, lastName, setshowSignupModal, setUsername, 
                    setPassword, setFirstname, setLastname, handleVisibility, 
                    handleRegistration, promptAsync}) => {
    return(
        <Modal
            animationType="slide"
            visible={show}
            transparent={true}
        >
            <View style={styles.signupModal}>
                <View style={{flexDirection:"row"}}>
                    <Image style={styles.appIcon} source={require('../assets/app-icon.png')}/>
                    <TouchableOpacity onPress={() => setshowSignupModal(false)}>
                        <Icon style={styles.X} name='close' size={30} color="#080040"/>
                    </TouchableOpacity>
                </View> 
                <View style={styles.centeredView}>
                    <Text></Text>
                    <Text style={{color: "#080040", fontSize: 25}}>Create FINs account</Text> 
                </View>
                <View>
                    <View>
                        <Text style={styles.prompts}> First Name</Text>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            value={firstName}
                            placeholder='Enter first name'
                            placeholderTextColor='#BDBDBD'
                            onChangeText={(firstName) => setFirstname(firstName)}
                        />
                    </View>
                    <View>
                        <Text style={styles.prompts}> Last Name</Text>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            value={lastName}
                            placeholder='Enter last name'
                            placeholderTextColor='#BDBDBD'
                            onChangeText={(lastName) => setLastname(lastName)}
                        />
                    </View>
                    <View>
                        <Text style={styles.prompts}> Email</Text>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            value={username}
                            placeholder='Enter email address'
                            placeholderTextColor='#BDBDBD'
                            onChangeText={(username) => setUsername(username)}
                        />
                    </View>
                    <View>
                        <Text style={styles.prompts}> Password</Text>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            value={password}
                            placeholder='Pick a strong password'
                            placeholderTextColor='#BDBDBD'
                            secureTextEntry={hidePassword}
                            onChangeText={(password) => setPassword(password)}
                        />
                        <TouchableOpacity onPress={() => {handleVisibility()}}>
                            <Ionicons style={styles.visibilityBtn} size={20} name={hidePassword ? 'eye': 'ios-eye-off' }></Ionicons>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.PrivacyPolicy}>
                        <Text> By creating an account, you acknowledge you have read and agreed to our </Text>
                        <Text style={{textDecorationLine: 'underline'}}> Terms of Use </Text>
                        <Text> and </Text>
                        <Text style={{textDecorationLine: 'underline'}}> Privacy Policy. </Text>
                    </Text>
                    <View style={styles.centeredView}>
                        <TouchableOpacity onPress={(event) => {handleRegistration(event)}} style={styles.createAcctBtn}>
                            <Text style={styles.loginText}>Create an Account</Text>
                        </TouchableOpacity>
                        <Text></Text>
                        <TouchableOpacity onPress={() => {promptAsync();}}>
                            <Image style={styles.GoogleBtn} source={require('../assets/google-signin.png')}></Image>
                        </TouchableOpacity>
                    </View>           
                </View>
            </View> 
        </Modal>
    )
}

const styles = StyleSheet.create({
    prompts: {
        color: '#080040',
        textAlign: 'left',
        paddingTop: 10,
        paddingBottom: 8
      },
      X: {
        marginLeft: 110,
      },
      appIcon: {
        height: 70,
        width: 70,
        marginLeft: 150
    },
      createAcctBtn: {
        width: 225,
        borderRadius: 24,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: '#70518A',
      },
      centeredView: {
        justifyContent: "center",
        alignItems: "center",
      },
      inputView: {
        flexDirection:'row',
        backgroundColor: '#E8E8E8',
        borderRadius: 10,
        width: 360,
        height: 54,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: .75,
        borderColor: '#BDBDBD'
      },
      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 10,
        width: '70%',
      },
      loginText: {
        color: '#FFFFFFFF',
        fontSize: 16
    },
      signupModal: {
        backgroundColor: "white",
        borderRadius: 25,
        marginTop: 50,
        padding: 20,
        alignItems: "center",
        width: '100%',
        height: '100%'
      },
      visibilityBtn: {
        opacity: 0.3,
        right: 9,
        height: 25,
        width: 20,
        marginRight: 12,
        marginTop: 5
      },
      PrivacyPolicy: {
        textAlign: 'center', 
        fontSize: 12, 
        marginLeft: 15, 
        marginRight: 15
      }
});

export default SignupModal;