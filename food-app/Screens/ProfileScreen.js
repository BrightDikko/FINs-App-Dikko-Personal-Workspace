import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet, Modal, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
// import {Icon as EntypoIcon} from 'react-native-vector-icons/Entypo';
// import {Icon} from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/AntDesign'
import Ionicons from "@expo/vector-icons/Ionicons";
import firebase from '../firebase/FirebaseConfig'
import "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';




const ProfileScreen = ({ navigation }) => {
  const [ displayName, setDisplayName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ uploadingNewImage, setUploadingNewImage ] = useState(false)
  const [ photo, setPhoto ] = useState(null)
  const [ gotUserInfo, setGotUserInfo ] = useState(false)
  const [ uploadingImage, setUploadingImage ] = useState(false)
  const [ user, setUser ] = useState()

  useEffect(() => {
    const auth = firebase.auth();
    const user = auth.currentUser;

    if (user) {
      setDisplayName(user.displayName)
      setEmail(user.email)
      setPhoto(user.photoURL)
      setGotUserInfo(true)
      setUser(user)
    } else {
      // No user is signed in.
    }
  }, [])

  useEffect(() => {
    if(uploadingNewImage){
      uploadImage()
    }
  }, [photo])

  const pickImage = async () => {
    setUploadingNewImage(true)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // We can specify whether we need only Images or Videos
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,   // 0 means compress for small size, 1 means compress for maximum quality
    });

    console.log(result);

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  const uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', photo, true);
      xhr.send(null);
    })
    const ref = firebase.storage().ref(user.uid + '/profilePicture/profile.png')
    const snapshot = ref.put(blob)
    snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
      ()=>{
        setUploadingImage(true)
      },
      (error) => {
        setUploadingImage(false)
        setUploadingNewImage(false)
        console.log(error)
        blob.close()
        return 
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploadingImage(false)
          setUploadingNewImage(false)
          console.log("Download URL: ", url)
          setPhoto(url)
          user.updateProfile({
            photoURL: url
          })
          blob.close()
          return url
        })
      }
      )
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
                imageStyle={{ borderRadius: '50%' }}
                // defaultSource={require('../assets/images/account/profile.png')}
                source={photo ? {uri: photo} : require('../assets/images/account/profile.png')}
              >
                { uploadingImage ? <ActivityIndicator style={styles.camera} size={'small'} color='white'/> : 
                <Icon 
                  name="camera" 
                  style={styles.camera} size="sm" 
                  color="#fff" 
                  onPress={() => {
                    console.log('pressed')
                    pickImage()}}/>}
              </ImageBackground>
              <Text style={styles.name}>{displayName}</Text>
              <Text style={styles.email}>{email}</Text>
              <TouchableOpacity style={{...styles.row, marginTop: 10}}>
                <Text style={styles.rowText}>Name</Text>
                <Ionicons name="chevron-forward" style={styles.rightIcon}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.row}>
                <Text style={styles.rowText}>Email</Text>
                <Ionicons name="chevron-forward" style={styles.rightIcon}/>
              </TouchableOpacity>
              <TouchableOpacity style={{...styles.row, borderBottomWidth: 1}}>
                <Text style={styles.rowText}>Phone Number</Text>
                <Ionicons name="chevron-forward" style={styles.rightIcon}/>
              </TouchableOpacity>
            </View>
            : <Text>No user logged in.</Text> }
          </View>
        </View>

    </View>
  )
}
export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0
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