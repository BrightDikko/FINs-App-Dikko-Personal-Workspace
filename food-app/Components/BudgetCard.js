import React, { useState, useEffect } from 'react';

import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
} from 'react-native';

import { Payment } from '../Classes/Payment'
import SelectButton from './SelectButton'

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});  

const BudgetCard = ({payment, setPayment}) => {
    const [ cashCredit, setCashCredit ] = useState(0) // a number value
    const [ cashCreditSelected, setCashCreditSelected ] = useState()
    const [ pebt, setPebt ] = useState(0)
    const [ pebtSelected, setPebtSelected ] = useState()
    const [ wic, setWic ] = useState(0)
    const [ wicSelected, setWicSelected ] = useState()
    const [ snap, setSnap ] = useState(0)
    const [ snapSelected, setSnapSelected ] = useState()
    const [ totalBudget, setTotalBudget ] = useState(0)

    let icons = new Map([
        ["WIC", require('../assets/images/goals/wic.png')],
        ["SNAP", require('../assets/images/goals/snap.png')],
        ["P-EBT", require('../assets/images/goals/p-ebt.png')],
        ["Cash/Credit", require('../assets/images/goals/card.png')]
    ]);

    useEffect(() => {
        if(payment){
            setCashCredit(payment.cashCredit)
            setPebt(payment.pebt)
            setSnap(payment.snap)
            setWic(payment.wic)
            payment.wic == 0 ? setWicSelected(false) : setWicSelected(true)
            payment.pebt == 0 ? setPebtSelected(false) : setPebtSelected(true)
            payment.snap == 0 ? setSnapSelected(false) : setSnapSelected(true)
            payment.cashCredit == 0 ? setCashCreditSelected(false) : setCashCreditSelected(true)
        }else{
            console.log("There has been an error")
        }
    }, [])

    useEffect(() => {
        setTotalBudget(calcTotalBudget(cashCredit, pebt, snap, wic))
    }, [cashCredit, pebt, snap, wic])

    const calcTotalBudget = (cashCredit, pebt, snap, wic) => {
        return cashCredit + pebt + snap + wic
    }

    const updatePaymentState = () => {
        setPayment(new Payment( cashCredit, pebt, snap, wic))
    }

    const verifySelections = () => {
        wic == 0 ? setWicSelected(false) : setWicSelected(true)
        pebt == 0 ? setPebtSelected(false) : setPebtSelected(true)
        snap == 0 ? setSnapSelected(false) : setSnapSelected(true)
        cashCredit == 0 ? setCashCreditSelected(false) : setCashCreditSelected(true)
    }

    const handlePress = (type) => {
        if(type == "WIC"){
            if(wicSelected){
                setWic(0)
                setPayment(new Payment( cashCredit, pebt, snap, 0))
            }
            setWicSelected(!wicSelected)
        }else if(type == "SNAP"){
            if(snapSelected){
                setSnap(0)
                setPayment(new Payment( cashCredit, pebt, 0, wic))
            }
            setSnapSelected(!snapSelected)
        }else if(type == "P-EBT"){
            if(pebtSelected){
                setPebt(0)
                setPayment(new Payment( cashCredit, 0, snap, wic))
            }
            setPebtSelected(!pebtSelected)
        }else if(type == "Cash/Credit"){
            if(cashCreditSelected){
                setCashCredit(0)
                setPayment(new Payment( 0, pebt, snap, wic))
            }
            setCashCreditSelected(!cashCreditSelected)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.budgetHeaders}>
                <Text style={styles.headerText}>I will pay using:</Text>
                <Text style={styles.headerText}>Amount:</Text>
            </View>
                <View style={styles.methodRow}>
                    <SelectButton selected={wicSelected} handlePress={() => handlePress("WIC")} />
                    <Image source={icons.get("WIC")} style={styles.paymentIcon}/>
                    <Text style={styles.methodLabel}>WIC</Text>
                    <TextInput
                        style={wicSelected ? styles.moneyInput : styles.unselectedMoneyInput}
                        keyboardType='numeric'
                        textAlign='center'
                        value={wic == 0 ? '' : String(wic)}
                        onFocus={() => setWicSelected(true)}
                        onChangeText={(value) => setWic(Number(value))}
                        onEndEditing={() => {
                            verifySelections()
                            updatePaymentState()
                        }}
                    />
                </View>
                <View style={styles.methodRow}>
                    <SelectButton selected={snapSelected} handlePress={() => handlePress("SNAP")} />
                    <Image source={icons.get("SNAP")} style={styles.paymentIcon}/>
                    <Text style={styles.methodLabel}>SNAP</Text>
                    <TextInput
                        style={snapSelected ? styles.moneyInput : styles.unselectedMoneyInput}
                        keyboardType='numeric'
                        textAlign='center'
                        value={snap == 0 ? '' : String(snap)}
                        onFocus={() => setSnapSelected(true)}
                        onChangeText={(value) => setSnap(Number(value))}
                        onEndEditing={() => {
                            verifySelections()
                            updatePaymentState()
                        }}
                    />
                </View>
                <View style={styles.methodRow}>
                    <SelectButton selected={pebtSelected} handlePress={() => handlePress("P-EBT")} />
                    <Image source={icons.get("P-EBT")} style={styles.paymentIcon}/>
                    <Text style={styles.methodLabel}>P-EBT</Text>
                    <TextInput
                        style={pebtSelected ? styles.moneyInput : styles.unselectedMoneyInput}
                        keyboardType='numeric'
                        textAlign='center'
                        value={pebt == 0 ? '' : String(pebt)}
                        onFocus={() => setPebtSelected(true)}
                        onChangeText={(value) => setPebt(Number(value))}
                        onEndEditing={() => {
                            verifySelections()
                            updatePaymentState()
                        }}
                    />
                </View>
                <View style={styles.methodRow}>
                    <SelectButton selected={cashCreditSelected} handlePress={() => handlePress("Cash/Credit")} />
                    <Image source={icons.get("Cash/Credit")} style={styles.paymentIcon}/>
                    <Text style={styles.methodLabel}>Cash/Credit</Text>
                    <TextInput
                        style={cashCreditSelected ? styles.moneyInput : styles.unselectedMoneyInput}
                        keyboardType='numeric'
                        onFocus={() => setCashCreditSelected(true)}
                        textAlign='center'
                        value={cashCredit == 0 ? '' : String(cashCredit)}
                        onChangeText={(value) => setCashCredit(Number(value))}
                        onEndEditing={() => {
                            verifySelections()
                            updatePaymentState()
                        }}
                    />
                </View>
            <View style={styles.amountArea}/>
            <View style={styles.totalBudgetLabel}>
                <Text style={styles.totalBudgetText}>
                {`Total Budget - ${formatter.format(totalBudget)}`}
                </Text>
            </View>
        </View> 
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 2,  
        elevation: 5,
        borderRadius: 12,
        width: '100%',
        height: '100%'
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
        gap: 20,
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        zIndex: 1
    },
    paymentIcon: {
        width: 40
    },
    methodLabel: {
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 22,
        color: '#3D2E3D',
        marginTop: 10,
        width: 100
    },
    moneyInput: {
        borderWidth: 1,
        borderColor: '#5148BB',
        borderRadius: 6,
        width: 70,
        height: 41,
        justifySelf: "flex-end",
        backgroundColor: '#FFFFFF',
        color: '#70518A',
        fontWeight: '600'
    },
    unselectedMoneyInput: {
        borderRadius: 6,
        width: 70,
        height: 41,
        justifySelf: "flex-end",
        backgroundColor: '#DDDDDD'
    },
    amountArea: {
        position: 'absolute',
        width: 81,
        height: 302,
        right: 10,
        top: 10,
        backgroundColor: 'rgba(246, 157, 3, 0.67)',
        borderRadius: '12'
    },
    totalBudgetLabel: {
        marginTop: 10,
        marginBottom: -20,
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
    }
});

export default BudgetCard;