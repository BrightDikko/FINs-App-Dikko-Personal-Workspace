import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, SafeAreaView, ScrollView, StyleSheet, Image, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { Icon as Iconify } from '@iconify/react';
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/Entypo';
import { Payment } from '../Classes/Payment'
import { Goals } from '../Classes/Goals'
import firebase from '../firebase/FirebaseConfig'
import "firebase/firestore";
import SelectButton from '../Components/SelectButton';

const db = firebase.firestore();

const goalConverter = {
  fromFirestore: function(snapshot, options){
      const data = snapshot.data(options);
      let curPayment = new Payment(data.payment.cashCredit, data.payment.pebt, data.payment.snap, data.payment.wic)
      let theirGoals = new Goals(curPayment, data.avoid, data.less, data.more);
      return theirGoals;
  }
};

let icons = new Map([
  ["WIC", require('../assets/images/goals/wic.png')],
  ["SNAP", require('../assets/images/goals/snap.png')],
  ["P-EBT", require('../assets/images/goals/p-ebt.png')],
  ["Cash/Credit", require('../assets/images/goals/card.png')]
]);

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const AccountScreen = ({ navigation }) => {

  const [ userId, setUserId ] = useState(null)
  const [ payment, setPayment ] = useState()
  const [ noGoals, setNoGoals ] = useState(true)
  const [ noPayment, setNoPayment ] = useState(true)
  const [ totalPayment, setTotalPayment ] = useState(0)
  const [ less, setLess ] = useState()
  const [ more, setMore ] = useState()
  const [ avoid, setAvoid ] = useState()
  const [ hasLess, setHasLess ] = useState(false)
  const [ hasMore, setHasMore ] = useState(false)
  const [ hasAvoid, setHasAvoid ] = useState(false)
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    setLoading(true)
    try {
        const user = firebase.auth().currentUser;
        setUserId(user.uid)
    } catch {
        console.log("There has been an error getting profile information.");
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
    let getFirestoreGoals = () => {};
      if(userId){
        getFirestoreGoals = 
          db.collection("user-goals").doc(userId).onSnapshot((doc) => {
            if (doc.exists) {
              setPayment(doc.data().payment)
              setLess(Object.keys(doc.data().less).filter((choice) => doc.data().less[choice]))
              setMore(Object.keys(doc.data().more).filter((choice) => doc.data().more[choice]))
              setAvoid(Object.keys(doc.data().avoid).filter((choice) => doc.data().avoid[choice]))
              // determine which fields have been set
              if(doc.data().payment.cashCredit != 0 || doc.data().payment.pebt != 0 || doc.data().payment.snap != 0 || doc.data().payment.wic != 0){
                setNoPayment(false)
              } 
              setTotalPayment(doc.data().payment.cashCredit + doc.data().payment.pebt + doc.data().payment.snap + doc.data().payment.wic)
              setLoading(false)
            } else {
              setNoPayment(true)
              setNoGoals(true)
              setLoading(false)
            }
          })
      }

    return () => getFirestoreGoals()
    }, [userId])
  )



  useEffect(() => {
    if(less && less.length != 0){
      setHasLess(true)
      setNoGoals(false)
    }
  }, [less])

  useEffect(() => {
    if(more && more.length != 0){
      setHasMore(true)
      setNoGoals(false)
    }
  }, [more])

  useEffect(() => {
    if(avoid && avoid.length != 0){
      setHasAvoid(true)
      setNoGoals(false)
    }
  }, [avoid])

  useEffect(() => {
    if(totalPayment == 0){
      setNoPayment(true)
    }
  }, [totalPayment])

  return loading ? <ActivityIndicator style={{ alignSelf: "center", justifySelf: "center"}}size="large">

  </ActivityIndicator> : 
  
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width:'100%',
        backgroundColor: 'rgba(233, 239, 255, .3)',
        height: '100%'
      }}>
      <ScrollView style={{width:'100%', height: '100%'}}>
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
            onPress={() => navigation.navigate('Account Information')}
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
              <Text style={styles.goalText}>Budget</Text>
          </View>
          { noPayment ? <View style={styles.container}> 
            <Text style={{...styles.noneLabel, marginTop: 7}}>You do not currently have any payments set.</Text>
          </View> : 
          <View style={styles.container}>
            <View style={styles.budgetHeaders}>
                <Text style={styles.headerText}>Payment Used:</Text>
                <Text style={styles.headerText}>Amount:</Text>
            </View> 
               { payment.wic != 0 && <View style={styles.methodRow}>
                    <Image source={icons.get("WIC")} style={styles.paymentIcon}/>
                    <Text style={styles.methodLabel}>WIC</Text>
                    <TextInput
                        style={styles.unselectedMoneyInput}
                        keyboardType='numeric'
                        textAlign='center'
                        value={formatter.format(payment.wic)}
                        editable={false}
                        selectTextOnFocus={false}
                    />
                </View>} 
                { payment.snap != 0 && <View style={styles.methodRow}>
                    <Image source={icons.get("SNAP")} style={styles.paymentIcon}/>
                    <Text style={styles.methodLabel}>SNAP</Text>
                    <TextInput
                        style={styles.unselectedMoneyInput}
                        keyboardType='numeric'
                        textAlign='center'
                        value={formatter.format(payment.snap)}
                        editable={false}
                        selectTextOnFocus={false}

                    />
                </View>}              
                { payment.pebt != 0 && <View style={styles.methodRow}>
                    <Image source={icons.get("P-EBT")} style={styles.paymentIcon}/>
                    <Text style={styles.methodLabel}>P-EBT</Text>
                    <TextInput
                        style={styles.unselectedMoneyInput}
                        keyboardType='numeric'
                        textAlign='center'
                        value={formatter.format(payment.pebt)}
                        editable={false}
                        selectTextOnFocus={false}
                    />
                </View>}
                { payment.cashCredit != 0 && <View style={styles.methodRow}>
                    <Image source={icons.get("Cash/Credit")} style={styles.paymentIcon}/>
                    <Text style={styles.methodLabel}>Cash/Credit</Text>
                    <TextInput
                        style={styles.unselectedMoneyInput}
                        keyboardType='numeric'
                        textAlign='center'
                        value={formatter.format(payment.cashCredit)}
                        selectTextOnFocus={false}
                        editable={false}
                    />
                </View>}
            <View style={styles.totalBudgetLabel}>
                <Text style={styles.totalBudgetText}>
                { totalPayment == 0 ? 'No payment methods saved' : `Total Budget - ${formatter.format(totalPayment)}`}
                </Text>
            </View>
        </View> }
        <View style={styles.goalHeader}>
                <Ionicons name="flag" size={25} style={styles.goalIcon}/>
                <Text style={styles.goalText}>Goals</Text>
        </View>
        { noGoals ? <View style={styles.goalBackground}> 
            <Text style={{alignSelf: 'center', padding: 10}}>You do not currently have any goals set.</Text>
          </View> : 
          <View style={styles.goalBackground}>
            <Text style={styles.goalLabel}>
                Get
                <Text style={{fontWeight: "bold"}}> LESS </Text>
                of ...
            </Text>
            <View style={styles.chipContainerFlex}>
              { hasLess ? less.map((choice) => {
                  
                  return (
                      <Pressable disabled={true} style={styles.selectedChip} key={choice} onPress={null}>
                          <SelectButton disabled={true} selected={true} handlePress={null}/>
                          <Text style={styles.choiceLabel}>{choice}</Text>
                      </Pressable>
                  )
              }) : <Text style={styles.noneLabel}> None chosen </Text>
            }
            </View>
            <View style={styles.horizontalLine}/>
            <Text style={styles.goalLabel}>
                Get
                <Text style={{fontWeight: "bold"}}> MORE </Text>
                of ...
            </Text>
            <View style={styles.chipContainerFlex}>
              { hasMore ? more.map((choice) => {
                  return (
                      <Pressable disabled={true} style={styles.selectedChip} key={choice} onPress={null}>
                          <SelectButton disabled={true} selected={true} handlePress={null}/>
                          <Text style={styles.choiceLabel}>{choice}</Text>
                      </Pressable>
                  )
              }) : <Text style={styles.noneLabel}> None chosen </Text>
            }
            </View>
            <View style={styles.horizontalLine}/>
            <Text style={styles.goalLabel}>
                I'd like to
                <Text style={{fontWeight: "bold"}}> AVOID</Text>
                ...
            </Text>
            <View style={styles.chipContainerFlex}>
              { hasAvoid ?  avoid.map((choice) => {
                  return (
                      <Pressable disabled={true} style={styles.selectedChip} key={choice} onPress={null}>
                          <SelectButton disabled={true} selected={true} handlePress={null}/>
                          <Text style={styles.choiceLabel}>{choice}</Text>
                      </Pressable>
                  )
              }) : <Text style={styles.noneLabel}> None chosen </Text>}
            </View>
          </View>}
        </View>
      </ScrollView>
    </SafeAreaView>
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
  },
  container: {
    backgroundColor: '#FFFFFF',
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: {
      width: 4,
      height: 8
    },
    shadowRadius: 24,
    shadowOpacity: 1,
    elevation: 5,
    borderRadius: 12,
    width: '90%',
    alignSelf: 'center',
    paddingBottom: 10
  },
  chipContainerFlex: {
    alignSelf: 'center',
    width: '100%',
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: {
      width: 4,
      height: 8
    },
    shadowRadius: 24,
    shadowOpacity: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
},
  budgetHeaders: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 10,
      paddingRight: 10,
      paddingLeft: 5,
      zIndex: 1
  },
  headerText: {
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 20,
      color: '#3D2E3D',
      margin: 10
  },
  methodRow: {
      flexDirection: 'row',
      margin: 10,
      borderBottomColor: 'rgba(119, 119, 119, 0.2)',
      borderBottomWidth: 1,
      paddingBottom: 5,
      gap: 10,
      justifyContent: 'flex-start',
      paddingHorizontal: 5,
  },
  paymentIcon: {
      width: 40
  },
  methodLabel: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 14,
      lineHeight: 22,
      color: '#3D2E3D',
      marginTop: 10,
      paddingLeft: 20,
      alignSelf: 'center'
  },
  unselectedMoneyInput: {
      position: 'absolute',
      right: 5,
      bottom: 5,
      borderRadius: 6,
      width: 70,
      height: 41,
      justifySelf: "flex-end",
      backgroundColor: '#DDDDDD',
      fontWeight: 'bold'
  },
  amountArea: {
      position: 'absolute',
      width: 81,
      right: 10,
      top: 10,
      backgroundColor: 'rgba(246, 157, 3, 0.67)',
      borderRadius: '12'
  },
  totalBudgetLabel: {
      marginTop: 10,
      backgroundColor: '#70518A',
      borderRadius: 12,
      width: 226,
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center'
  },
totalBudgetText: {
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: 16,
  lineHeight: 22,
  color: '#FFFFFF'
},
choiceLabel: {
    fontStyle: 'normal',
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 22,
    color: '#3D2E3D',
    paddingHorizontal: 5,
    alignSelf: 'center'
},
noneLabel: {
  fontStyle: 'normal',
  fontWeight: "600",
  fontSize: 14,
  lineHeight: 22,
  color: '#3D2E3D',
  padding: 5,
  alignSelf: 'center',
},
selectedChip: {
  backgroundColor: '#DDDDDD',
  borderRadius: 10.5,
  height: 41,
  flexDirection: 'row', 
  alignContent: 'center',
  justifyContent: 'center',
  padding: 3,
  margin: 10
},
input: {
  fontSize: 14,
  lineHeight: 22,
  fontStyle: 'normal',
  fontWeight: '600',
  color: '#3D2E3D',
  paddingHorizontal: 5,
  width: 80,
  paddingBottom: 5
},
goalLabel: {
  fontStyle: 'normal',
  fontWeight: "600",
  fontSize: 22,
  lineHeight: 34,
  color: '#3D2E3D',
  paddingBottom: 5
},
goalBackground: {
  flex: 1,
  borderRadius: 12,
  backgroundColor: "#FFFFFF",
  shadowColor: "rgba(0, 0, 0, 0.16)",
  shadowOffset: {
    width: 4,
    height: 8
  },
  shadowRadius: 24,
  shadowOpacity: 1,
  width: '90%',
  alignSelf: 'center',
  padding: 10,
  flex: 1,
  justifyContent: 'flex-start',
  marginBottom: '20%'
},
horizontalLine: {
  height: .5,
  backgroundColor: "#D8D8D8",
  borderStyle: 'solid',
  borderWidth: .33,
  borderColor: "rgba(119, 119, 119, 0.25)",
  margin: 10,
  justifySelf: 'flex-start'
}
});

export default AccountScreen;