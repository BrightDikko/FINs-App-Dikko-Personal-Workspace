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

const LoginModal = ({show, username, password, hidePassword, 
                    setshowLoginModal, setUsername, setPassword, handleVisibility, 
                    handleSubmit, promptAsync, handleResetPassword}) => {
    return(
        <Modal
            animationType="slide"
            visible={show}
            transparent={true}
        >
            <View style={styles.loginModal}>
                <View style={{flexDirection:"row"}}>
                    <Image style={styles.appIcon} source={require('../assets/app-icon.png')}/>
                    <TouchableOpacity onPress={() => setshowLoginModal(false)}>
                        <Icon style={styles.X} name='close' size={30} color="#080040"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.centeredView}>
                    <Text style={styles.title}>Sign in to your FINs account</Text> 
                </View>
                <View>
                    <View>
                        <Text style={styles.prompts}>  Email</Text>
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
                        <Text style={styles.prompts}>  Password </Text>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            value={password}
                            placeholder='Enter password'
                            placeholderTextColor='#BDBDBD'
                            secureTextEntry={hidePassword}
                            onChangeText={(password) => setPassword(password)}
                        />   
                        <TouchableOpacity onPress={() => {handleVisibility()}}>
                            <Ionicons style={styles.visibilityBtn} size={20} name={hidePassword ? 'eye': 'ios-eye-off' }></Ionicons>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.centeredView}>
                        <TouchableOpacity onPress={(event) => {handleSubmit(event)}} style={styles.LoginBtn}>
                            <Text style={styles.loginText}>Sign in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {handleResetPassword()}}>
                            <Text>Forgot your password?</Text>
                        </TouchableOpacity>
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
        paddingTop: 15,
        paddingBottom: 10
      },
      title: {
        color: "#080040", 
        fontSize: 25,
        paddingTop: 15,
        paddingBottom: 10
      },
      X: {
        marginLeft: 110,
      },
      appIcon: {
        height: 70,
        width: 70,
        marginLeft: 150
    },
      LoginBtn: {
        width: 225,
        borderRadius: 24,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 7,
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
      loginModal: {
        backgroundColor: "white",
        borderRadius: 25,
        marginTop: 160,
        padding: 20,
        alignItems: "center",
        width: '100%',
        height: '100%'
      },
      GoogleBtn: {
          marginTop: 20
      },
      visibilityBtn: {
        opacity: 0.3,
        right: 9,
        height: 25,
        width: 20,
        marginRight: 12,
        marginTop: 5
      }
});

export default LoginModal;



