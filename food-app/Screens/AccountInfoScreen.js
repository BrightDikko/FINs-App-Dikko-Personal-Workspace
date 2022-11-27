import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet, Modal, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
// import {Icon as EntypoIcon} from 'react-native-vector-icons/Entypo';
// import {Icon} from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/AntDesign'
import Ionicons from "@expo/vector-icons/Ionicons";

import firebase from '../firebase/FirebaseConfig'
import "firebase/firestore";




const AccountInfoScreen = ({ navigation }) => {
  const [ displayName, setDisplayName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ photoURL, setPhotoURL ] = useState()
  const [ gotUserInfo, setGotUserInfo ] = useState(false)

  useEffect(() => {
    const auth = firebase.auth();
    const user = auth.currentUser;

    if (user) {
      setDisplayName(user.displayName)
      setEmail(user.email)
      setPhotoURL(user.photoURL != null ? user.photoURL : false)
      setGotUserInfo(true)
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // ...
    } else {
      // No user is signed in.
    }
  }, [])

  const signOut = () => {
    firebase.auth().signOut().then(() => {
      console.log('success')
    }).catch((error) => {
      console.log("Error: " + error)
    });
  }

  return (
    <View style={{height: '100%', width: '100%', backgroundColor: '#ffffff'}}>
      <Image 
        style={styles.header}
        source={require('../assets/images/account/background.png')}/>
      <TouchableOpacity style={{zIndex: 1}} onPress={() => navigation.navigate('Account')}>
        <Icon style={styles.back} name='arrowleft' size={24} color="#fff"/>
      </TouchableOpacity>
      <TouchableOpacity style={{zIndex: 1}} onPress={()=>{}}>
        <Icon style={styles.more} name='ellipsis1' rotate={90} size={24} color="#fff"/>
      </TouchableOpacity>
      {/* <EntypoIcon name="three-dots-vertical" style={styles.threeDots}/> */}
        <View style={styles.center}>
          <View style={styles.modal}>
          { gotUserInfo ? 
            <View style={{width: '100%'}}>
              <ImageBackground
                style={styles.profilePic}
                // defaultSource={require('../assets/images/account/profile.png')}
                source={require('../assets/images/account/profile.png')}
              >
                <Icon name="camera" style={styles.camera} size="sm" color="#fff" />
              </ImageBackground>
              <Text style={styles.name}>{displayName}</Text>
              <Text style={styles.email}>{email}</Text>
              <View style={{...styles.row, marginTop: 10}}>
                <Text style={styles.rowText}>Password</Text>
                <Ionicons name="chevron-forward" style={styles.rightIcon}/>
              </View>
              <TouchableOpacity style={styles.row}>
                <Text style={styles.rowText}>About Fins</Text>
                <Ionicons name="chevron-forward" style={styles.rightIcon}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.row}>
                <Text style={styles.rowText}>Legal</Text>
                <Ionicons name="chevron-forward" style={styles.rightIcon}/>
              </TouchableOpacity>
              <TouchableOpacity style={{...styles.row, borderBottomWidth: 1}} onPress={signOut}>
                <Text style={styles.rowText}>Sign Out</Text>
                <Ionicons name="chevron-forward" style={styles.rightIcon}/>
              </TouchableOpacity>
            </View>
            : <Text>No user logged in.</Text> }
          </View>
        </View>

    </View>
  )
}
export default AccountInfoScreen;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0
  },
  threeDots: {

  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%'
  },
  modal: {
    width: '100%',
    height: '75%',
    position: 'absolute',
    bottom: 95,
    borderTopRightRadius: 46,
    borderTopLeftRadius: 46,
    backgroundColor: "#fff",
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 35
  },
  name: {
    fontSize: 22,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 34,
    textAlign: "center",
    color: "#080040"
  }, 
  email: {
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 22,
    textAlign: "center",
    color: "#F2AE2E"
  },
  profilePic: {
    height: 80,
    width: 80,
    borderRadius: 80/2,
    alignSelf: 'center'
  },
  camera: {
    position: 'absolute',
    bottom: "10%",
    right: "20%"
  },
  row: {
    height: 56,
    borderColor: "rgba(119, 119, 119, 0.25)",
    borderTopWidth: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  rowText: {
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 34,
    color: "#3D2E3D"
  },
  rightIcon: {
    color: "#D1D1D6",
    borderStyle: 'solid',
    borderWidth: 0,
    borderColor: "rgba(151, 151, 151, 1.0)"
  },
  back: {
    position: 'absolute',
    left: '10%',
    top: 50
  },
  more: {
    position: 'absolute',
    right: '10%',
    top: 50,
    transform: [{ rotate: "90deg" }]
  }
})