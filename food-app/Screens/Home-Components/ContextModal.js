import React, { useState, useEffect } from 'react';
import { Alert, Modal, Style, StyleSheet, Text, Pressable, View, SafeAreaView, ScrollView, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { ButtonGroup, CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const ContextModal = ( displayModal, isRegisteredUser, route ) => {

    const [modalVisible, setModalVisible] = useState(true);
    const [budget, setBudget ] = useState(null);
    const [isItalianSelected, setItalianSelected] = useState(false);
    const [isIndianSelected, setIndianSelected] = useState(false);
    const [isMexicanSelected, setMexicanSelected] = useState(false);
    const [isChineseSelected, setChineseSelected] = useState(false);
    const [isAmericanSelected, setAmericanSelected] = useState(false);
    const [isFrenchSelected, setFrenchSelected] = useState(false);
    const [isMedSelected, setMedSelected] = useState(false);
    const [isGreekSelected, setGreekSelected] = useState(false);
    const [isJapaneseSelected, setJapaneseSelected] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const navigation = useNavigation();

    var paymentArray = ['PayPal', 'Credit', 'Debit'];
    var paymentMethod;

    useEffect(() => {
      paymentMethod = paymentArray[selectedIndex];
    }, [selectedIndex]);

    function checkFieldsHaveContent(){
      var fieldsHaveContent = false;
      if( budget == null){
        alert('Please enter a budget')
        return false;
      }else if(isNaN(budget)){
        alert('Invalid budget input')
        return false;
      }else{
        fieldsHaveContent = true;
      }
  
      if(fieldsHaveContent){
        setModalVisible(!modalVisible)
      }else{
        alert('Please fill out all fields.')
      }

      return true;
    }

    var cuisinePreferences = {
      isItalianSelected,
      isIndianSelected,
      isMexicanSelected,
      isChineseSelected,
      isAmericanSelected,
      isFrenchSelected,
      isMedSelected,
      isGreekSelected,
      isJapaneseSelected
    }


    function handleListContextSubmit() {

      const newListInfo = {
        cuisinePreferences, 
        budget,
        paymentMethod
      }

      try{
        route.params.addListInfo(newListInfo);
        alert('List information successfully saved.');
      }catch(e){
        console.log(e);
        alert('Unable to save list information');
      }
    }
    
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}> 
            <View style={styles.modalView}>
              <View style={styles.contextTitleView}>
                <Text style={styles.contextTitleText}>
                  Enter List Constraints
                </Text>
              </View>
              <View style={{ flex: 5, alignItems: 'center' }}>
                <ScrollView>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.TextInput}
                      value={budget}
                      placeholder="Enter budget"
                      placeholderTextColor='#525252'
                      keyboardType="numeric"
                      onChangeText={(budget) => setBudget(budget)}
                    />
                  </View>
                  <Text style={{ textAlign: 'center', fontSize: 14 }}>{'\n'}What cuisine would you like to shop for?</Text>
                        <CheckBox
                            title="Italian"
                            checked={isItalianSelected}
                            onPress={() => setItalianSelected(!isItalianSelected)}
                        />
                        <CheckBox
                            title="Indian"
                            checked={isIndianSelected}
                            onPress={() => setIndianSelected(!isIndianSelected)}
                        />
                        <CheckBox
                            title="Mexican"
                            checked={isMexicanSelected}
                            onPress={() => setMexicanSelected(!isMexicanSelected)}
                        />
                        <CheckBox
                            title="American"
                            checked={isAmericanSelected}
                            onPress={() => setAmericanSelected(!isAmericanSelected)}
                        />
                        <CheckBox
                            title="Chinese"
                            checked={isChineseSelected}
                            onPress={() => setChineseSelected(!isChineseSelected)}
                        />
                        <CheckBox
                            title="French"
                            checked={isFrenchSelected}
                            onPress={() => setFrenchSelected(!isFrenchSelected)}
                        />
                        <CheckBox
                            title="Mediterranean"
                            checked={isMedSelected}
                            onPress={() => setMedSelected(!isMedSelected)}
                        />
                        <CheckBox
                            title="Greek"
                            checked={isGreekSelected}
                            onPress={() => setGreekSelected(!isGreekSelected)}
                        />
                        <CheckBox
                            title="Japanese"
                            checked={isJapaneseSelected}
                            onPress={() => setJapaneseSelected(!isJapaneseSelected)}
                        />
                        <ButtonGroup
                          style={{
                            margin: 20
                          }}
                          buttons={paymentArray}
                          selectedIndex={selectedIndex}
                          onPress={(value) => {
                            setSelectedIndex(value);
                          }}
                          containerStyle={{ marginBottom: 20 }}
                          />
                </ScrollView>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={[styles.button, styles.loginBtn]}
                  onPress={() => { checkFieldsHaveContent() }}
                >
                  <Text style={styles.loginText}>Enter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>      
        </Modal>
        <Pressable
          style={styles.loginBtn}
          onPress={() => { navigation.navigate('HomeScreen'); /*handleListContextSubmit(); navigation.navigate('HomeScreen');*/ }}
        >
          <Text style={styles.textStyle}>Submit</Text>
        </Pressable>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 5
    },
    contextTitleText: {
      color: '#53B175',
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 18,
    },
    contextTitleView: {
      padding: 10
    },
    buttonView: {
      padding: 10
    },
    modalView: {
      margin: 50,
      backgroundColor: "white",
      borderRadius: 20,
      paddingBottom: 10,
      paddingTop: 10,
      paddingLeft: 25,
      paddingRight: 25,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    scrollView: {
      backgroundColor: 'pink',
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
    budgetInput: {
      // height: 40,
      flex: 1,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
    },
    loginBtn: {
      width: '100%',
      borderRadius: 25,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
      backgroundColor: '#53B175',
    },
    loginText: {
      color: '#FFFFFF'
    },
    TextInput: {
      height: 50,
      flex: 1,
      width: '80%',
      padding: 5,
    },
    inputView: {
      backgroundColor: '#E6E6E6',
      borderRadius: 20,
      width: '100%',
      height: 45,
      marginBottom: 20,
      alignItems: 'center',
      justifyContent: 'center'
    },
  });
  
  export default ContextModal;