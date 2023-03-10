import React from 'react';

import {
    Pressable,
    StyleSheet
} from 'react-native';

const SelectButton = ({ selected, handlePress, disabled=false }) => {
    return <Pressable disabled={disabled} style={selected? styles.selected : styles.unselected} onPress={() => handlePress()}/>
};

const styles = StyleSheet.create({
    selected: {
        borderWidth: 2,
        borderRadius: "50%",
        borderColor: '#70518A',
        backgroundColor: '#70518A',
        marginTop: 5,
        marginLeft: 3,
        height: 24,
        width: 24
    },
    unselected: {
        borderWidth: 2,
        borderRadius: "50%",
        backgroundColor: "#FFFFFF",
        borderColor: '#70518A',
        marginTop: 5,
        marginLeft: 3,
        height: 24,
        width: 24
    }
});

export default SelectButton;