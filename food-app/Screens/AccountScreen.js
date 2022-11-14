import React from 'react';
import { Text, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { Icon as Iconify } from '@iconify/react';
import Ionicons from "@expo/vector-icons/Ionicons";


const AccountScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width:'100%'
      }}>
      <ScrollView style={{width:'100%'}}>
        <View style={{width:'100%'}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('Profile')}
            style={styles.navView}
          >
              <Ionicons name="person-circle-outline" style={styles.leftIcon}/>
              <Text style={styles.navLabel}>Profile</Text>
              <Ionicons name="chevron-forward-circle-outline" style={styles.rightIcon}/>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('Profile')}
            style={styles.navView}
          >
              <Ionicons name="cog-outline" style={styles.leftIcon}/>
              <Text style={styles.navLabel}>Account Information</Text>
              <Ionicons name="chevron-forward-circle-outline" style={styles.rightIcon}/>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  navView: {
      flex: 1,
      flexDirection: 'row',
      width:'100%',
      height: 60,
      paddingHorizontal: 20,
      alignItems: 'center',
      borderColor: 'black',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      gap: 15
  },
  navLabel : {
    paddingLeft: 10,
    width: '80%',
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 34,
    color: "#3D2E3D"
  },
  leftIcon: {
    justifySelf: 'flex-start',
    fontSize: 40
  },
  rightIcon: {
    justifySelf: 'flex-end',
    fontSize: 24
  }
});

export default AccountScreen;