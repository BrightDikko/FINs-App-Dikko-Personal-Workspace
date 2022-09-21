import React, { useCallback } from 'react';

import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Image,
    Linking
} from 'react-native';


const firebase = require('firebase');

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    loginText: {
        color: '#FFFFFF'
    },
    loginBtn: {
        width: '70%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#53B175',
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
            <OpenURLButton url={item.data().url}></OpenURLButton>
        </View>
    );
}


const Home = ({ navigation, route }) => {

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 5 }}>
                <ScrollView>
                        <View style={{ padding: 10, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text>Home page</Text>
                        </View>
                </ScrollView>
            </View>
        </View>
    );
}
export default Home;