import React, { useState } from 'react'
import FirebaseAuthSerivce from '../firebase/FirebaseAuthService';
import firebase from "firebase";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    ImageBackground,
    Button,
    Modal
} from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        width: '100%',
        height: '100%'
    },
    prompts: {
        color: '#080040',
        textAlign: 'left'
      },
    title: {
        textAlign: 'center',
        fontSize: 25,
        paddingTop: 45,
        justifyContent: 'space-between',
        marginLeft: 60,
        marginRight: 60,
        color: '#080040'
    },
    description: {
        textAlign: 'center',
        fontSize: 14,
        paddingTop: 10,
        marginLeft: 40,
        marginRight: 40,
        color: '#575757'

    },
      continueGuest: {
        color: '#575757',
        textAlign: 'left',
        textDecorationLine: 'underline',
        fontSize: 14
      },
      welcomeImage: {
          height: 300,
          width: 350
      },
      X: {
        marginLeft: 110
      },
      appIcon: {
        height: 70,
        width: 70,
        marginLeft: 150
    },
      SigninBtn: {
        width: 150,
        borderRadius: 24,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#70518A',
      },
      LoginBtn: {
        width: 225,
        borderRadius: 24,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#70518A',
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
      SigninText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#FFFFFF'
      },
      centeredView: {
        justifyContent: "center",
        alignItems: "center",
      },
      inputView: {
        flex:.24,
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
      inputView2: {
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
    createAccount: {
        color: '#080040',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
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
      signupModal: {
        backgroundColor: "white",
        borderRadius: 25,
        marginTop: 50,
        padding: 20,
        alignItems: "center",
        width: '100%',
        height: '100%'
      }
});

const Welcome = ({ navigation, route }) => {

    const [request, response, promptAsync] = Google.useAuthRequest({
        reponseType: ResponseType.Token,
        expoClientId: "540945185583-4b8jmm81jnrp7l17fn4o5md2loknkcah.apps.googleusercontent.com",
        webClientId: "540945185583-jtmvg8fq01oga48hubhg9han6numm4ko.apps.googleusercontent.com",
        scopes: ["openid", "profile"]
      });

     
     React.useEffect(() => {
        firebase.auth().on
    }
    )
    React.useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
      });
    }, []);
  
    React.useEffect(() => {
      if (response && response.type === "success") {
        const credential = new firebase.auth.GoogleAuthProvider.credential(
          null, // Pass the access_token as the second property
          response.params.access_token
        );
        firebase.auth().signInWithCredential(credential);
      }
    }, [response]);
    

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await FirebaseAuthSerivce.loginUser(username, password);
            setUsername('');
            setPassword('');
        } catch (error) {
            alert(error.message);
        }
    }

    async function handleSendResetPasswordEmail() {
        if (!username) {
          alert('Missing username!');
          return;
        }
    
        try {
          await FirebaseAuthSerivce.sendPasswordResetEmail(username);
          alert('Password reset email was sent.');
        } catch (error) {
          alert(error.message);
        }
    }

    async function handleAnonymousLogin() {
        try {
            await FirebaseAuthSerivce.anonymousLogin();
        } catch (error) {
            alert(error.message);
        }
    }


    async function handleAnonymousLogin() {
        try {
            await FirebaseAuthSerivce.anonymousLogin();
        } catch (error) {
            alert(error.message);
        }
    }

    const [showLoginModal, setshowLoginModal] = useState(false);
    const [showSignupModal, setshowSignupModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');

        return(
            <View style={{ flex: 1 }}>
                <Modal 
                    animationType="slide"
                    transparent={true}
                    visible={showLoginModal} 
                >
                    <View style={styles.loginModal}>
                        <View style={{flexDirection:"row"}}>
                        <Image style={styles.appIcon} source={require('../assets/app-icon.png')}/>
                        <TouchableOpacity onPress={() => setshowLoginModal(false)}>
                                <Image style={styles.X} source={require('../assets/X.png')}></Image>
                            </TouchableOpacity>
                        </View>

                        <View style={{alignItems: 'center' }}>
                            <Text></Text>
                            <Text style={{color: "#080040", fontSize: 25}}>Sign in to your FINs account</Text> 
                        </View>

                        <Text></Text>
                        <Text></Text>
                        <View>
                            <View>
                                <Text style={styles.prompts}>  Email{'\n'}</Text>
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
                                <Text style={styles.prompts}>  Password {'\n'}</Text>
                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    value={password}
                                    placeholder='Pick a strong password'
                                    placeholderTextColor='#BDBDBD'
                                    secureTextEntry={true}
                                    onChangeText={(password) => setPassword(password)}
                                    />
                            </View>
                             <View style={styles.centeredView}>
                                <TouchableOpacity onPress={(event) => {handleSubmit(event)}} style={styles.LoginBtn}>
                                    <Text style={styles.loginText}>Sign in</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={styles.login} onPress={() => {handleSendResetPasswordEmail()}}>{'\n'}Forgot your password?</Text>
                                </TouchableOpacity>
                                <Text> {'\n\n'}</Text>
                                <TouchableOpacity onPress={() => {promptAsync();}}>
                                    <Image style={styles.GoogleBtn} source={require('../assets/google-signin.png')}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                                
                    </View> 
                </Modal>

                <Modal 
                    animationType="slide"
                    transparent={true}
                    visible={showSignupModal} 
                >
                    <View style={styles.signupModal}>
                        <View style={{flexDirection:"row"}}>
                            <Image style={styles.appIcon} source={require('../assets/app-icon.png')}/>
                            <TouchableOpacity onPress={() => setshowSignupModal(false)}>
                                <Image style={styles.X} source={require('../assets/X.png')}></Image>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{alignItems: 'center' }}>
                            <Text></Text>
                            <Text style={{color: "#080040", fontSize: 25}}>Create FINs account</Text> 
                        </View>
                        <Text></Text>
                        <Text></Text>
                        <View>
                            
                                <View>
                                    <Text style={styles.prompts}> First Name</Text>
                                </View>
                                <Text></Text>
                                <View style={styles.inputView2}>
                                    <TextInput
                                    style={styles.TextInput}
                                    placeholder='Enter first name'
                                    placeholderTextColor='#BDBDBD'
                                    />
                                </View>
                                <View>
                                    <Text style={styles.prompts}> Last Name</Text>
                                </View>
                                <Text></Text>
                                <View style={styles.inputView2}>
                                    <TextInput
                                    style={styles.TextInput}
                                    placeholder='Enter last name'
                                    placeholderTextColor='#BDBDBD'
                                    />
                                </View>
                                <View>
                                    <Text style={styles.prompts}> Email</Text>
                                </View>
                                <Text></Text>
                                <View style={styles.inputView2}>
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
                                <Text></Text>
                                <View style={styles.inputView2}>
                                    <TextInput
                                    style={styles.TextInput}
                                    value={password}
                                    placeholder='Pick a strong password'
                                    placeholderTextColor='#BDBDBD'
                                    secureTextEntry={true}
                                    onChangeText={(password) => setPassword(password)}
                                    />
                                </View>
                                <Text style={{textAlign: 'center', fontSize: 12, marginLeft: 15, marginRight: 15}}>
                                    <Text> By creating an account, you acknowledge you have read and agreed to our </Text>
                                    <Text style={{textDecorationLine: 'underline'}}> Terms of Use </Text>
                                    <Text> and </Text>
                                    <Text style={{textDecorationLine: 'underline'}}> Privacy Policy. </Text>
                                </Text>
                                <View style={styles.centeredView}>
                                    <TouchableOpacity onPress={(event) => {handleSubmit(event)}} style={styles.createAcctBtn}>
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

                <View style={styles.container}>
                    <ImageBackground source={require("../assets/welcome_header.png")} style={styles.header}>
                        <View style={styles.container}>
                            <Image
                                style={styles.welcomeImage}
                                source={require('../assets/welcome.png')}
                            />
                        </View>
                    </ImageBackground>
                </View>

                <View style={styles.container}>
                    <View style={{ flex: 5, alignItems: 'center' }}>
                        <Text style={styles.title}> Welcome to Food {'\n'}Information Networks {'\n'}</Text>
                        <Text style={styles.description}>
                            Sign in to track orders and rewards, check in for faster pickup and get personalized shopping recommendations
                        </Text>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => setshowLoginModal(true)} style={styles.SigninBtn}>
                            <Text style={styles.SigninText} onPress={() => setshowLoginModal(true)}>Sign in</Text>
                        </TouchableOpacity>
                        <Text></Text>
                        <TouchableOpacity>
                            <Text style={{textAlign: 'center'}}>New to FINs?<Text> </Text>
                                <Text style={styles.createAccount} onPress={() => setshowSignupModal(true)}>Create an account</Text>
                            </Text>
                        </TouchableOpacity>
                        <Text></Text>
                        <TouchableOpacity>
                            <Text style={styles.continueGuest} onPress={() => {handleAnonymousLogin(); }}>Continue as Guest</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                </View>
            </View>
        );
}
export default Welcome;