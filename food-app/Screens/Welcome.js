import React from 'react'
import FirebaseAuthSerivce from '../firebase/FirebaseAuthService';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
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

const Welcome = ({ navigation, route }) => {

    function handleLogout() {
        FirebaseAuthSerivce.logoutUser();
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
                        <Text style={{ textAlign: 'center', fontSize: 15 }}>Welcome, {route.params.existingUser.email}!</Text>
                    </View>
                </View>
                <View style={{ flex: 5, alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Text style={styles.login} onPress={() => navigation.navigate('Home')}>Get Started</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {handleLogout()}} style={styles.loginBtn}>
                        <Text style={styles.loginText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
}
export default Welcome;