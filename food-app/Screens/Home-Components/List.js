import React, { useState, useEffect, useCallback } from 'react';

import {
    Text,
    StyleSheet,
    Button,
    View,
} from 'react-native';

import ContextModal from './ContextModal';

const styles = StyleSheet.create({
    title: {
        color: '#53B175',
        textAlign: 'center'
    },
    ContextButton:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#53B175',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
      },
});

const List = ({ navigation, route }) => {

    const [modalVisible, setModalVisible] = useState(true);

    return(
        <View>
            
                <ContextModal 
                    isRegisteredUser={true}
                    displayModal={modalVisible}
                />
                       

            <View>
                <Text style={styles.title}>
                    Shopping List
                </Text>
            </View>         
        </View>
    );
};

export default List;