import React, { useState, useEffect } from 'react';

import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    Alert,
    Button
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
});


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
                                renderItem={({ item }) => <Text style={styles.item}>{item.id}</Text>}
                            />
                        </View>

                    )}
                </ScrollView>
            </View>
        </View>
    );
}
export default Home;