import React, { useState } from 'react';

import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';


import SelectButton from './SelectButton';

const ChipCard = ({ type, choices, setChoices, include }) => {

    const [ addChoiceActive, setAddChoiceActive ] = useState(false)
    const [ addChoice, setAddChoice ] = useState()

    const handleChipPress = (choice) => {
        let updateChoices = {...choices}
        if(choice in include){
            updateChoices[choice] = !choices[choice]
        }else{
            delete updateChoices[choice]
        }
        setChoices(updateChoices)
    }

    const handleAddChoice = () => {
        let updateChoices = {...choices}
        updateChoices[addChoice] = true
        setChoices(updateChoices)
    }

    return (
        <View style={styles.chipContainer}>
            { Object.keys(choices).map((choice) => {
                return (
                    <TouchableOpacity style={choices[choice] ? styles.selectedChip : styles.unselectedChip} key={choice} onPress={() => handleChipPress(choice)}>
                        <SelectButton selected={choices[choice]} handlePress={() => handleChipPress(choice)}/>
                        <Text style={styles.choiceLabel}>{choice}</Text>
                    </TouchableOpacity>
                )
            })}
            <TouchableOpacity style={addChoiceActive ? styles.selectedChip : styles.unselectedChip} onPress={() => handleAddChoice()}>
                        <SelectButton selected={addChoiceActive} handlePress={() => {}}/>
                        <TextInput 
                            style={styles.input}
                            placeholder="Other"
                            value={addChoice}
                            onChangeText={(value) => {
                                setAddChoice(value)
                                setAddChoiceActive(true)
                            }}
                            onEndEditing={() => {
                                handleAddChoice()
                                setAddChoice('')
                                setAddChoiceActive(false)
                            }}
                        />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    choiceLabel: {
        fontStyle: 'normal',
        fontWeight: "600",
        fontSize: 14,
        lineHeight: 22,
        color: '#3D2E3D',
        paddingHorizontal: 5,
        alignSelf: 'center'
    },
    chipContainer: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 2,  
        elevation: 5,
        borderRadius: 12,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    selectedChip: {
        backgroundColor: '#DDDDDD',
        borderRadius: 10.5,
        height: 41,
        flexDirection: 'row', 
        alignContent: 'center',
        justifyContent: 'center',
        padding: 3,
        margin: 5,
        
    }, 
    unselectedChip: {
        borderRadius: 10.5,
        height: 41,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 3,
        margin: 5
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
    }
});

export default ChipCard;