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
  //console.log(data);
  // const data = [
  //   {
  //     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28b",
  //     fullName: "Aafreen Khan",
  //     timeStamp: "12:47 PM",
  //     recentText: "Good Day!",
  //     avatarUrl:
  //       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //   },
  //   {
  //     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28",
  //     fullName: "Aafreen Khan",
  //     timeStamp: "12:47 PM",
  //     recentText: "Good Day!",
  //     avatarUrl:
  //       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //   },
  //   {
  //     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb2",
  //     fullName: "Aafreen Khan",
  //     timeStamp: "12:47 PM",
  //     recentText: "Good Day!",
  //     avatarUrl:
  //       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //   },
  //   {
  //     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb",
  //     fullName: "Aafreen Khan",
  //     timeStamp: "12:47 PM",
  //     recentText: "Good Day!",
  //     avatarUrl:
  //       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //   },
  //   {
  //     id: "bd7acbea-c1b1-46c2-aed5-3ad53ab",
  //     fullName: "Aafreen Khan",
  //     timeStamp: "12:47 PM",
  //     recentText: "Good Day!",
  //     avatarUrl:
  //       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //   },
  //   {
  //     id: "bd7acbea-c1b1-46c2-aed5-3ad53a",
  //     fullName: "Aafreen Khan",
  //     timeStamp: "12:47 PM",
  //     recentText: "Good Day!",
  //     avatarUrl:
  //       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //   },
  //   {
  //     id: "bd7acbea-c1b1-46c2-aed5-3ad53",
  //     fullName: "Aafreen Khan",
  //     timeStamp: "12:47 PM",
  //     recentText: "Good Day!",
  //     avatarUrl:
  //       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //   },
  //   {
  //     id: "bd7acbea-c1b1-46c2-aed5-3ad5",
  //     fullName: "Aafreen Khan",
  //     timeStamp: "12:47 PM",
  //     recentText: "Good Day!",
  //     avatarUrl:
  //       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //   },
  //   {
  //     id: "bd7acbea-c1b1-46c2-aed5-3ada",
  //     fullName: "Aafreen Khan",
  //     timeStamp: "12:47 PM",
  //     recentText: "Good Day!",
  //     avatarUrl:
  //       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //   },
  //   {
  //     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
  //     fullName: "Sujitha Mathur",
  //     timeStamp: "11:11 PM",
  //     recentText: "Cheer up, there!",
  //     avatarUrl:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
  //   },
  //   {
  //     id: "58694a0f-3da1-471f-bd96-145571e29d72",
  //     fullName: "Anci Barroco",
  //     timeStamp: "6:22 PM",
  //     recentText: "Good Day!",
  //     avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
  //   },
  //   {
  //     id: "68694a0f-3da1-431f-bd56-142371e29d72",
  //     fullName: "Aniket Kumar",
  //     timeStamp: "8:56 PM",
  //     recentText: "All the best",
  //     avatarUrl:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
  //   },
  //   {
  //     id: "28694a0f-3da1-471f-bd96-142456e29d72",
  //     fullName: "Kiara",
  //     timeStamp: "12:47 PM",
  //     recentText: "I will call today.",
  //     avatarUrl:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
  //   },
  // ]
  return (
    <Box
    >
      {/* <Heading fontSize="xl" p="4" pb="3">
        Popular Recipes
      </Heading> */}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2"
          >
            <HStack space={3} justifyContent="space-between">
              <Image
                size="64px"
                source={{
                  uri: item.imageURL,
                }}
                alt="Recipe Image"
              />
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.name}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.recentText}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                alignSelf="flex-start"
              >
                {item.timeStamp}
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.name}
      />
    </Box>
  );
}
