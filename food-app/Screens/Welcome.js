import React, { useState } from 'react'
import FirebaseAuthSerivce from '../firebase/FirebaseAuthService';
import firebase from "firebase";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { ResponseType } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import LoginModal from './LoginModal'
import SignupModal from './SignupModal'


const Welcome = () => {

    const [showLoginModal, setshowLoginModal] = useState(false);
    const [showSignupModal, setshowSignupModal] = useState(false);
    const [hidePassword, sethidePassword] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');

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

    async function handleRegistration(event){
        event.preventDefault();

        try {
            await FirebaseAuthSerivce.registerUser(username, password, firstName, lastName);
            setUsername('');
            setPassword('');
            setFirstname('');
            setLastname('');
        } catch (error) {
            alert(error.message);
        }
    }

    async function handleResetPassword() {
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

    async function handleVisibility() {
        sethidePassword(!hidePassword)
    }

    async function handleAnonymousLogin() {
        try {
            await FirebaseAuthSerivce.anonymousLogin();
        } catch (error) {
            alert(error.message);
        }
    }

        return(
            <View style={{flex:1}}>
                <LoginModal
                    show={showLoginModal} 
                    username={username}
                    password={password}
                    hidePassword={hidePassword}
                    setshowLoginModal={setshowLoginModal}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    handleVisibility={handleVisibility}
                    handleSubmit={handleSubmit}
                    promptAsync={promptAsync}
                    handleResetPassword={handleResetPassword}
                />
                <SignupModal
                    show={showSignupModal} 
                    username={username}
                    password={password}
                    hidePassword={hidePassword}
                    firstName={firstName}
                    lastName={lastName}
                    setshowSignupModal={setshowSignupModal}
                    setUsername={setUsername}
                    setPassword={setPassword}
                     setFirstname={setFirstname}
                    setLastname={setLastname}
                    handleVisibility={handleVisibility}
                    handleRegistration={handleRegistration}
                    promptAsync={promptAsync}
                />
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
                    <View style={styles.navOptions}>
                        <Text style={styles.title}> Welcome to Food {'\n'}Information Networks {'\n'}</Text>
                        <Text style={styles.description}>
                            Sign in to track orders and rewards, check in for faster pickup and get personalized shopping recommendations
                        </Text>
                        <View style={styles.container}>
                            <TouchableOpacity onPress={() => setshowLoginModal(true)} style={styles.SigninBtn}>
                                <Text style={styles.SigninText} onPress={() => setshowLoginModal(true)}>Sign in</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.centeredView}>New to FINs?<Text> </Text>
                                    <Text style={styles.createAccount} onPress={() => setshowSignupModal(true)}>Create an account</Text>
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.continueGuest} onPress={() => {handleAnonymousLogin(); }}>Continue as Guest</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
}
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
    navOptions: {  
        alignItems: 'center' 
    },
    centeredView: {
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center",
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
        marginTop: 5,
        fontSize: 14
      },
      welcomeImage: {
          height: 300,
          width: 350
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
    createAccount: {
        color: '#70518A',
        fontWeight: 'bold',
    }  
});

export default Welcome;