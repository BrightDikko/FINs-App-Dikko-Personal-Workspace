import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { firebase } from '../src/firebase/config'

import { Button, Center, NativeBaseProvider } from "native-base";


export const storeHighScore = (score) => {
  // firebase.auth().createUserWithEmailAndPassword("jgordley99@gmail.com", "screwit").then((response) => {
  //   const uid = response.user.uid;
  //   const data = {
  //     id: uid,
  //     email,
  //     fullName
  //   };
  //   console.log(data);
  // });
  let ref = firebase.database().ref('recipe_list');
  // Attach an asynchronous callback to read the data at our posts reference
  ref.on('value', (snapshot) => {
    console.log(snapshot.val());
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  });
}

export const Example = () => {
  return (
    <>
      <Button onPress={() => storeHighScore(10)}>Primary Button</Button>
    </>
  )
}

export default function TabOneScreen(navigation) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>

      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <NativeBaseProvider>
        <Example />
      </NativeBaseProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
