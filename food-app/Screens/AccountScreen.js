import React from 'react';
import { Text, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { Icon as Iconify } from '@iconify/react';
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/Entypo';

const AccountScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width:'100%',
        backgroundColor: 'rgba(233, 239, 255, .3)'
      }}>
      <ScrollView style={{width:'100%'}}>
        <View style={{width:'100%'}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('Profile')}
            style={{...styles.navView, 
              borderColor: 'rgba(119, 119, 119, .25)',
              borderBottomWidth: 1,}}>
              <Ionicons name="person-circle" style={styles.leftIcon}/>
              <Text style={styles.navLabel}>Profile</Text>
              <Ionicons name="chevron-forward-circle-outline" style={styles.rightIcon}/>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('Profile')}
            style={styles.navView}
          >
              <Ionicons name="settings-outline" style={styles.leftIcon}/>
              <Text style={styles.navLabel}>Account Information</Text>
              <Ionicons name="chevron-forward-circle-outline" style={styles.rightIcon}/>
          </TouchableOpacity>
          <View style={styles.editGoals}>
            <Text style={styles.MyGoalsText}>My Goals</Text>
            <TouchableOpacity style={styles.editTouchable}
              onPress={() => navigation.navigate('Set Goals')}>
              <Ionicons name="pencil-sharp" style={{...styles.rightIcon, color: '#2E3A59'}}/>
              <Text style={{alignSelf: 'center', paddingHorizontal: 5, color: '#5148BB'}}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.goalHeader}>
              <Icon name="credit-card" size={25} style={styles.goalIcon}/>
              <Text style={styles.goalText}>My Budget</Text>
          </View>
          <View style={styles.goalHeader}>
              <Ionicons name="flag" size={25} style={styles.goalIcon}/>
              <Text style={styles.goalText}>My Goals</Text>
          </View>
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
  },
  editGoals: {
    flex: 1,
    flexDirection: 'row',
    width:'100%',
    height: 53,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
    backgroundColor: '#DFDCC1'
  },
  editTouchable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    height: 29,
    justifySelf: 'flex-end'
  },
  MyGoalsText: {
    color: '#59514A',
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 20,
    color: "#59514A",
  },
  goalHeader: {
    flexDirection: 'row',
    color: '#3D2E3D',
    paddingLeft: 20,
    marginVertical: 10
  },
  goalText: {
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 34,
    color: "#3D2E3D",
    paddingLeft: 10
  },
  goalIcon: {
    alignSelf: 'center',
    justifySelf: 'center'
  }
});

export default AccountScreen;