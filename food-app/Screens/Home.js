import React, { useState, useEffect, useCallback } from 'react';

import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    Alert,
    Button,
    TouchableOpacity,
    Image,
    Linking
} from 'react-native';

const firebase = require('firebase');

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        paddingTop: 60,
        paddingBottom: 50,
        flex: 1, flexDirection: 'row', justifyContent: 'space-between'
    },
    listItem: {
        margin: 10,
        padding: 10,
        backgroundColor: "#FFF",
        width: "80%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5
    }
});

const OpenURLButton = ({ url }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  
    return (
        <TouchableOpacity onPress={handlePress} style={{ height: 50, width: 50, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "green" }}>See Recipe</Text>
        </TouchableOpacity>
    )
  };

function Item({ item }) {
    return (
        <View style={styles.listItem}>
            <Image source={{ uri: item.data().img }} style={{ width: 60, height: 60, borderRadius: 30 }} />
            <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>{item.id}</Text>
                {/* <Text>{item.position}</Text> */}
            </View>
            {/* <TouchableOpacity onPress={() => {goToRecipe(item.data().url)}} style={{ height: 50, width: 50, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "green" }}>Call</Text>
            </TouchableOpacity> */}
            <OpenURLButton url={item.data().url}></OpenURLButton>
        </View>
    );
}


const Home = ({ navigation, route }) => {
    const [recipes, setRecipes] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const list = [];

            await firebase.firestore().collection('recipes').get().then((data) => {
                data.forEach(doc => {
                    // console.log(doc.id, '=>', doc.data())
                    list.push(doc);
                    console.log(doc.data().img)
                })
            });

            setRecipes(list);

            if (loading) {
                setLoading(false);
            }

            // console.log('Posts: ', recipes);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.title}>
                    <View style={{ flex: 1 }}>
                        <Text>
                            <Button
                                onPress={() => navigation.openDrawer()}
                                title="="
                                color="black"
                                accessibilityLabel="Toggle navigation drawer"
                            />
                        </Text>
                    </View>
                    <View style={{ flex: 8, paddingRight: 10 }}>
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>Firebase Recipes</Text>
                    </View>
                    <View
                        style={{ flex: 1, paddingRight: 10 }}>
                    </View>
                </View>
            </View>
            <View style={{ flex: 5 }}>
                <ScrollView>
                    {loading ? (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text>Loading...</Text>
                        </View>
                    ) : (
                        <View style={styles.container}>
                            <FlatList
                                data={recipes}
                                //renderItem={({ item }) => <Text style={styles.item}>{item.id}</Text>}
                                renderItem={({ item }) => <Item item={item} />}
                            />
                        </View>

                    )}
                </ScrollView>
            </View>
        </View>
    );
}
export default Home;