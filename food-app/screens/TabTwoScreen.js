import * as React from 'react';
import { Text, View } from '../components/Themed';
import { firebase } from '../src/firebase/config'
import {
  Box,
  FlatList,
  Heading,
  Image,
  HStack,
  VStack,
  Spacer,
  Center,
  NativeBaseProvider,
} from "native-base"
// import ListWithImages from '../components/ListWithImages';

// export const GetRecipeList = () => {
//   firebase.database().ref('recipe_list').get();
// }

function repeat(arr, n){
  var a = [];
  for (var i=0;i<n;[i++].push.apply(a,arr));
  return a;
}

export default function TabTwoScreen() {
  let data = [];
  let ref = firebase.database().ref('recipe_list');
  // Attach an asynchronous callback to read the data at our posts reference
  ref.on('value', (snapshot) => {
    //console.log(snapshot.val());
    data = snapshot.val();
    console.log(data);
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  });

  return (
    <Box
    >
      {/* <Heading fontSize="xl" p="4" pb="3">
        Popular Recipes
      </Heading> */}
      <FlatList
        extraData={data}
        data={repeat(data, 2)}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "gray.800",
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2"
          >
            <HStack space={3}>
              <Image
                size="64px"
                source={{
                  uri: item.imageURL,
                }}
                alt="Recipe Image"
              />
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.name}
                </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.name}
      />
    </Box>
  );
}
