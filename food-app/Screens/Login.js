import React, { useState } from 'react'
import FirebaseAuthSerivce from '../firebase/FirebaseAuthService';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    Button,
} from 'react-native';

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
        width: '70%',
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
      },
      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
        width: '70%',
        textAlign: 'center'
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
        width: '70%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#53B175',
      },
});

const Login = ({ navigation, route }) => {

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
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.title}>
                        <View style={{ flex: 1 }}>
                            <Text>
                                <Button
                                    onPress={() => navigation.openDrawer()}
                                    title='='
                                    color='black'
                                    accessibilityLabel='Toggle navigation drawer'
                                />
                            </Text>
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
                    <View style={{ flex: 1, paddingTop: 30, }}>
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>Log In</Text>
                    </View>
                </View>
                <View style={{ flex: 5, alignItems: 'center' }}>
                    <View style={styles.inputView}>
                        <TextInput
                        style={styles.TextInput}
                        value={username}
                        placeholder='Email'
                        placeholderTextColor='#525252'
                        onChangeText={(username) => setUsername(username)}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                        style={styles.TextInput}
                        value={password}
                        placeholder='Password'
                        placeholderTextColor='#525252'
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                        />
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.login} onPress={() => {handleSendResetPasswordEmail()}}>Reset Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={(event) => {handleSubmit(event)}} style={styles.loginBtn}>
                        <Text style={styles.loginText}>Log In</Text>
                    </TouchableOpacity>
                    <Text>{'\n'}</Text>
                    <TouchableOpacity>
                        <Text style={{textAlign: 'center'}}>Don't have an account?
                            <Text style={styles.login} onPress={() => navigation.navigate('Sign Up')}> Sign up</Text>
                        {'\n'}{'\n'}OR{'\n'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.login} onPress={() => {handleAnonymousLogin();}}>Process as Guest</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
}
export default Login;