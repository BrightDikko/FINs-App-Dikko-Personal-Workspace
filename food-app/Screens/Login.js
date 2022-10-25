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
    Button,
    ImageBackground,
} from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';


WebBrowser.maybeCompleteAuthSession();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: '#70518A'
    },
    overlay: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        paddingTop: 60,
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    loginText: {
        color: '#FFFFFFFF',
    },
    inputView: {
        backgroundColor: '#E8E8E8',
        borderRadius: 30,
        width: '90%',
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
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
      login: {
        color: '#080040',
        textAlign: 'center'
      },
      prompts: {
        color: '#080040',
        textAlign: 'left'
      },
      createAccount: {
        color: '#080040',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
      },
      appIcon: {
          height: 70,
          width: 70,
      },
      loginBtn: {
        width: '50%',
        borderRadius: 24,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#70518A',
      },
      GoogleBtn: {
        
      }
});

const Login = ({ navigation, route }) => {


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
    

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
        return(
            <View style={{flex:1}}>

                <View style={styles.container}>
                    <View style={styles.title}>
                        <View style={{flex: 50, alignItems: 'center' }}>
                            <Image style={styles.appIcon} source={require('../assets/app-icon.png')}/>
                            <Text style={{textAlign: 'center', fontSize: 30 }}>Sign in to your FINs account</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.container}>
                    <View>
                        <Text style={styles.prompts}>Email</Text>
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
                        <Text style={styles.prompts}>Password</Text>
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
                </View>

                <View style={styles.container}>
                    <TouchableOpacity onPress={(event) => {handleSubmit(event)}} style={styles.loginBtn}>
                        <Text style={styles.loginText}>Sign in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                            <Text style={styles.login} onPress={() => {handleSendResetPasswordEmail()}}>{'\n'}Forgot your password?</Text>
                        </TouchableOpacity>
                        <Text></Text>
                        <TouchableOpacity>
                            <Text style={{textAlign: 'center'}}>New to FINs?<Text> </Text>
                                <Text style={styles.createAccount} onPress={() => navigation.navigate('SignUp')}>Create an account</Text>
                            </Text>
                        </TouchableOpacity>
                        <Text></Text>
                        <TouchableOpacity onPress={() => {promptAsync();}}>
                            <Image style={styles.GoogleBtn} source={require('../assets/google-signin.png')}></Image>
                        </TouchableOpacity>

                </View>

            </View>
            
        );
}
export default Login;