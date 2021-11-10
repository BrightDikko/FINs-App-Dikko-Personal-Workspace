import * as React from 'react';
import { StyleSheet } from 'react-native';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { firebase } from '../src/firebase/config'

import { Button, Center, NativeBaseProvider, ScrollView, VStack, Heading, Stack, Divider } from "native-base";


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

export const Example2 = () => {
  return (
    <ScrollView>
      <VStack
        w="100%"
        space={2.5}
        px="2"
        mt="4"
        alignItems="center"
        justifyContent="center"
      >
        {/* Solid */}
        <Heading size="md">Solid</Heading>
        <Stack
          mb="2.5"
          mt="1.5"
          direction={{
            base: "column",
            md: "row",
          }}
          space={2}
          mx={{
            base: "auto",
            md: "0",
          }}
        >
          <Button
            size="sm" //  onPress={() => console.log('hello world')}
            isLoading
          >
            PRIMARY
          </Button>
          <Button
            size="sm"
            colorScheme="secondary" // onPress={() => console.log('hello world')}
          >
            SECONDARY
          </Button>
          <Button
            size="sm"
            isDisabled // onPress={() => console.log('hello world')}
          >
            DISABLED
          </Button>
        </Stack>

        <Divider w="100%" />

        <Heading size="md">Subtle</Heading>

        {/* Subtle */}
        <Stack
          mb="2.5"
          mt="1.5"
          direction={{
            base: "column",
            md: "row",
          }}
          space={2}
          mx={{
            base: "auto",
            md: "0",
          }}
        >
          <Button
            size="sm"
            variant="subtle" // onPress={() => console.log('hello world')}
          >
            PRIMARY
          </Button>
          <Button
            size="sm"
            variant="subtle"
            colorScheme="secondary" // onPress={() => console.log('hello world')}
          >
            SECONDARY
          </Button>
          <Button
            size="sm"
            variant="subtle"
            isDisabled // onPress={() => console.log('hello world')}
          >
            DISABLED
          </Button>
        </Stack>
        <Divider />
        <Heading size="md">Outline</Heading>

        {/* Outline */}
        <Stack
          mb="2.5"
          mt="1.5"
          direction={{
            base: "column",
            md: "row",
          }}
          space={2}
          mx={{
            base: "auto",
            md: "0",
          }}
        >
          <Button
            size="sm"
            variant="outline" // onPress={() => console.log('hello world')}
          >
            PRIMARY
          </Button>
          <Button
            size="sm"
            variant="outline"
            colorScheme="secondary" // onPress={() => console.log('hello world')}
          >
            SECONDARY
          </Button>
          <Button
            size="sm"
            variant="outline"
            isDisabled // onPress={() => console.log('hello world')}
          >
            DISABLED
          </Button>
        </Stack>
        <Divider w="100%" />

        <Heading size="md">Link</Heading>

        {/* Link */}
        <Stack
          mb="2.5"
          mt="1.5"
          direction={{
            base: "column",
            md: "row",
          }}
          space={2}
          mx={{
            base: "auto",
            md: "0",
          }}
        >
          <Button
            size="sm"
            variant="link" // onPress={() => console.log('hello world')}
          >
            PRIMARY
          </Button>
          <Button
            size="sm"
            variant="link"
            colorScheme="secondary" // onPress={() => console.log('hello world')}
          >
            SECONDARY
          </Button>
          <Button
            size="sm"
            variant="link"
            isDisabled // onPress={() => console.log('hello world')}
          >
            DISABLED
          </Button>
        </Stack>
        <Divider w="100%" />

        <Heading size="md">Ghost</Heading>

        {/* Ghost */}
        <Stack
          mb="2.5"
          mt="1.5"
          direction={{
            base: "column",
            md: "row",
          }}
          space={2}
          mx={{
            base: "auto",
            md: "0",
          }}
        >
          <Button
            size="sm"
            variant="ghost" // onPress={() => console.log('hello world')}
          >
            PRIMARY
          </Button>
          <Button
            size="sm"
            variant="ghost"
            colorScheme="secondary" // onPress={() => console.log('hello world')}
          >
            SECONDARY
          </Button>
          <Button
            size="sm"
            variant="ghost"
            isDisabled // onPress={() => console.log('hello world')}
          >
            DISABLED
          </Button>
        </Stack>

        <Divider w="100%" />

        <Heading size="md">Unstyled</Heading>

        {/* Unstyled */}
        <Stack
          mb="2.5"
          mt="1.5"
          direction={{
            base: "column",
            md: "row",
          }}
          space={2}
          mx={{
            base: "auto",
            md: "0",
          }}
        >
          <Button
            variant="unstyled" // onPress={() => console.log('hello world')}
          >
            Unstyled
          </Button>
        </Stack>
      </VStack>
    </ScrollView>
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
