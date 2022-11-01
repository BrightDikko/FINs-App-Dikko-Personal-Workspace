import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    Modal
} from 'react-native';

const SignupModal = (props) => {
    return(
        <Modal
            animationType="slide"
            visible={props.show}
            transparent={true}
        >
            <View style={styles.signupModal}>
                <View style={{flexDirection:"row"}}>
                    <Image style={styles.appIcon} source={require('../assets/app-icon.png')}/>
                    <TouchableOpacity onPress={() => props.setshowSignupModal(false)}>
                        <Image style={styles.X} source={require('../assets/X.png')}></Image>
                    </TouchableOpacity>
                </View> 
                <View style={styles.centeredView}>
                    <Text></Text>
                    <Text style={{color: "#080040", fontSize: 25}}>Create FINs account</Text> 
                </View>
                <Text></Text>
                <View>
                    <View>
                        <Text style={styles.prompts}> First Name</Text>
                    </View>
                    <Text></Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            value={props.firstName}
                            placeholder='Enter first name'
                            placeholderTextColor='#BDBDBD'
                            onChangeText={(firstName) => props.setFirstname(firstName)}
                        />
                    </View>
                    <View>
                        <Text style={styles.prompts}> Last Name</Text>
                    </View>
                    <Text></Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            value={props.lastName}
                            placeholder='Enter last name'
                            placeholderTextColor='#BDBDBD'
                            onChangeText={(lastName) => props.setLastname(lastName)}
                        />
                    </View>
                    <View>
                        <Text style={styles.prompts}> Email</Text>
                    </View>
                    <Text></Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            value={props.username}
                            placeholder='Enter email address'
                            placeholderTextColor='#BDBDBD'
                            onChangeText={(username) => props.setUsername(username)}
                        />
                    </View>
                    <View>
                        <Text style={styles.prompts}> Password</Text>
                    </View>
                    <Text></Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            value={props.password}
                            placeholder='Pick a strong password'
                            placeholderTextColor='#BDBDBD'
                            secureTextEntry={props.hidePassword}
                            onChangeText={(password) => props.setPassword(password)}
                        />
                        <TouchableOpacity onPress={() => {props.handleVisibility()}}>
                            <Image style={styles.visibilityBtn} source={props.hidePassword ? require('../assets/eye.png') : require('../assets/hidden.png') }></Image>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.PrivacyPolicy}>
                        <Text> By creating an account, you acknowledge you have read and agreed to our </Text>
                        <Text style={{textDecorationLine: 'underline'}}> Terms of Use </Text>
                        <Text> and </Text>
                        <Text style={{textDecorationLine: 'underline'}}> Privacy Policy. </Text>
                    </Text>
                    <View style={styles.centeredView}>
                        <TouchableOpacity onPress={(event) => {props.handleRegistration(event)}} style={styles.createAcctBtn}>
                            <Text style={styles.loginText}>Create an Account</Text>
                        </TouchableOpacity>
                        <Text></Text>
                        <TouchableOpacity onPress={() => {props.promptAsync();}}>
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
        textAlign: 'left'
      },
      X: {
        marginLeft: 110
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
        flex:.18,
        flexDirection:'row',
        backgroundColor: '#E8E8E8',
        borderRadius: 10,
        width: 360,
        height: "20%",
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
        marginLeft: 20,
        width: '70%',
        textAlign: 'left',
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
        height: 20,
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