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

const LoginModal = (props) => {
    return(
        <Modal
            animationType="slide"
            visible={props.show}
            transparent={true}
        >
            <View style={styles.loginModal}>
                <View style={{flexDirection:"row"}}>
                    <Image style={styles.appIcon} source={require('../assets/app-icon.png')}/>
                    <TouchableOpacity onPress={() => props.setshowLoginModal(false)}>
                            <Image style={styles.X} source={require('../assets/X.png')}></Image>
                    </TouchableOpacity>
                    </View>
                        <View style={styles.centeredView}>
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
                                    value={props.username}
                                    placeholder='Enter email address'
                                    placeholderTextColor='#BDBDBD'
                                    onChangeText={(username) => props.setUsername(username)}
                                />    
                            </View>
                            <View>
                                <Text style={styles.prompts}>  Password {'\n'}</Text>
                            </View>
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
                            <View style={styles.centeredView}>
                                <TouchableOpacity onPress={(event) => {props.handleSubmit(event)}} style={styles.LoginBtn}>
                                    <Text style={styles.loginText}>Sign in</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {props.handleResetPassword()}}>
                                    <Text>{'\n'}Forgot your password?</Text>
                                </TouchableOpacity>
                                <Text> {'\n\n'}</Text>
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
      LoginBtn: {
        width: 225,
        borderRadius: 24,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#70518A',
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
      loginModal: {
        backgroundColor: "white",
        borderRadius: 25,
        marginTop: 160,
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
      }
});

export default LoginModal;



