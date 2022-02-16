import React, { useState } from 'react';
import { Alert, Modal, Style, StyleSheet, Text, Pressable, View, SafeAreaView, ScrollView, StatusBar, TextInput } from 'react-native';




const ContextModal = ( displayModal, isRegisteredUser ) => {

    const [modalVisible, setModalVisible] = useState(true);
    const [ budget, setBudget ] = useState(null);
    const [ cuisine, setCuisine ] = useState([]);
    const [ paymentMethod, setPaymentMethod ] = useState()
    
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
              <ScrollView>
              <TextInput
                style={styles.budgetInput}
                onChangeText={setBudget}
                value={budget}
                placeholder="Enter budget"
                keyboardType="numeric"
              />
                {/* <View style={styles.contextItem}>
                  <View style={{ alignItems: "left", flex: 1, padding: 2}}>
                      <Text style={{ fontWeight: "bold" }}></Text>
                  </View>
                  <Image source={{ uri: item.data().img }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                    <View style={{ alignItems: "center", flex: 1 }}>
                      <Text style={{ fontWeight: "bold" }}>{item.id}</Text>
                    </View>
                  <OpenURLButton url={item.data().url}></OpenURLButton>
                </View> */}
              </ScrollView>
              <View style={styles.buttonView}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Enter</Text>
                </Pressable>
              </View>
            </View>
          </View>      
        </Modal>
        {/* <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable> */}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10
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
    buttonOpen: {
      backgroundColor: '#53B175',
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      backgroundColor: 'pink',
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
    contextItem: {
      margin: 10,
      padding: 10,
      backgroundColor: "#FFF",
      width: "80%",
      flex: 1,
      alignSelf: "center",
      flexDirection: "row",
      borderRadius: 5
    },
    budgetInput: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
    },
  });
  
  export default ContextModal;