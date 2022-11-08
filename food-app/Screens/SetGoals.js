import React, { useState, useEffect } from 'react';

import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import firebase from '../firebase/FirebaseConfig'
import "firebase/firestore";

import ChipCard from '../Components/ChipCard'
import BudgetCard from '../Components/BudgetCard';
import { Payment } from '../Classes/Payment'
import { Goals, lessOfOptions, moreOfOptions, avoidOptions } from '../Classes/Goals'

const db = firebase.firestore();

var goalConverter = {
    toFirestore: function(goal) {
        return {
            payment: {
                cashCredit: goal.payment.cashCredit,
                pebt: goal.payment.pebt,
                snap: goal.payment.snap,
                wic: goal.payment.wic
            },
            avoid: goal.avoid,
            less: goal.less,
            more: goal.more
        };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        let curPayment = new Payment(data.payment.cashCredit, data.payment.pebt, data.payment.snap, data.payment.wic)
        let theirGoals = new Goals(curPayment, data.avoid, data.less, data.more);
        return theirGoals;
    }
};

const SetGoals = ({ navigation }) => {
    
    const [ userId, setUserId ] = useState()
    const [ payment, setPayment ] = useState()
    const [ less, setLess ] = useState()
    const [ more, setMore ] = useState()
    const [ avoid, setAvoid ] = useState()
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        setUserId(null)
        try {
            const user = firebase.auth().currentUser;
            setUserId(user.uid)
        } catch {
            console.log("There has been an error");
        }
    }, [])

    useEffect(() => {
        if(userId){
            db.collection("user-goals").doc(userId)
                .withConverter(goalConverter)
                .get().then((doc) => {
                    if (doc.exists) {
                        setPayment(doc.data().payment)
                        setLess(doc.data().less)
                        setMore(doc.data().more)
                        setAvoid(doc.data().avoid)
                    } else {
                        let defPayment = new Payment()
                        setPayment(defPayment)
                        setLess(lessOfOptions)
                        setMore(moreOfOptions)
                        setAvoid(avoidOptions)
                    }
                    setLoading(false)
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
        }
    }, [userId])

    const handleSubmitGoals = () => {
        let updatedGoals = new Goals( payment, avoid, less, more)
        db.collection("user-goals").doc(userId)
            .withConverter(goalConverter)
            .set(updatedGoals)
        navigation.navigate('Your List')
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    !loading &&
                    <View style={styles.scrollContainer}>
                        <View style={styles.budgetSection}>
                            <Text style={styles.goalLabel}>My Budget</Text>
                            <BudgetCard payment={payment} setPayment={setPayment}/>
                        </View>
                        <View style={styles.goalSection}>
                            <Text style={styles.goalLabel}>
                                Get 
                                <Text style={{fontWeight: "bold"}}> LESS </Text>
                                 of...
                            </Text>
                            <ChipCard include={lessOfOptions} choices={less} setChoices={setLess}/>
                        </View>
                        <View style={styles.goalSection}>
                            <Text style={styles.goalLabel}>
                                Get 
                                <Text style={{fontWeight: "bold"}}> MORE </Text>
                                 of...
                            </Text>
                            <ChipCard include={moreOfOptions} choices={more} setChoices={setMore}/>
                        </View>
                        <View style={styles.goalSection}>
                            <Text style={styles.goalLabel}>
                                I'd like to
                                <Text style={{fontWeight: "bold"}}> AVOID</Text>
                                ...
                            </Text>
                            <ChipCard include={avoidOptions} choices={avoid} setChoices={setAvoid}/>
                        </View>
                        <TouchableOpacity onPress={handleSubmitGoals} style={styles.continueButton}>
                            <Text style={styles.continueText}>CONTINUE</Text>
                        </TouchableOpacity>
                    </View>
                }
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 88
    },
    scrollContainer: {
        flex: 1
        
    },
    budgetSection: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingBottom: 70
    },
    goalSection: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingBottom: 40
    },
    goalLabel: {
        fontStyle: 'normal',
        fontWeight: "600",
        fontSize: 22,
        lineHeight: 34,
        color: '#3D2E3D',
        paddingBottom: 10
    },
    continueButton: {
        width: 226,
        height: 45,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#70518A',
        alignSelf: 'center',
        marginBottom: 20
    },
    continueText: {
        color: '#FFFFFF',
        fontStyle: 'normal',
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 22
    }
});

export default SetGoals;
