import React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    title: {
        color: '#53B175',
        textAlign: 'center'
    }
});

const ListHistory = () => {
  return (
    <Text style={styles.title}>
      List History
    </Text>
  );
};



export default ListHistory;