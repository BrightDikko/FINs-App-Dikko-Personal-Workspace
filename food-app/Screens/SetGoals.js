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

import { goalCategories } from '../Constants/Goals';


const SetGoals = ({ navigation, route }) => {


    return (
        <View>
            <ScrollView>
                <Text>Goals</Text>
                {goalCategories.map(category => (
                    <Text key={category}>{category}</Text>
                ))}
            </ScrollView>

        </View>
    );
};

export default SetGoals;
