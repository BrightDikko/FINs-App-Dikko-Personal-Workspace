import React, { useState } from 'react'
import FirebaseAuthSerivce from '../FirebaseAuthService';
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

const Signup = ({ navigation, route }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
 
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await FirebaseAuthSerivce.registerUser(username, password);
            setUsername('');
            setPassword('');
            setIsLoaded(true);
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
                    <View style={{ flex: 10, paddingTop: 30, paddingRight: 10 }}>
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>Sign Up</Text>
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
                    <TouchableOpacity onPress={(event) => {handleSubmit(event)}} style={styles.loginBtn}>
                        <Text style={styles.loginText}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>{'\n'}Already have an account?
                            <Text style={styles.login} onPress={() => navigation.navigate('Log In')}> Log In</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
}
export default Signup;