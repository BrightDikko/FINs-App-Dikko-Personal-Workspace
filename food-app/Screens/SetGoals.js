import React, { useState } from 'react';

import {
    Text,
    StyleSheet,
    View,
    Alert,
    Modal,
    ScrollView,
    TextInput,
    TouchableOpacity,
    FlatList

} from 'react-native';

import FirebaseAuthSerivce from '../firebase/FirebaseAuthService';
import FirestoreService from '../firebase/FirestoreService';


const SetGoals = ({ navigation, route }) => {


    return (
        <View>
            <Text>Set Goals</Text>
        </View>
    );
};

export default SetGoals;
