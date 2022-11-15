import { StyleSheet, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomTabBarButton = props => {
  const {children, accessibilityState, onPress} = props;
  return (
    <View style={styles.btnWrapper}>
      { accessibilityState.selected && <View style={styles.selectedLine}/>}
        <TouchableOpacity 
          onPress={onPress} 
          activeOpacity={1}
          style={styles.btn}
        >
          <View>{children}</View>
        </TouchableOpacity>
    </View>
  );
};

export default CustomTabBarButton;

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F7F7F7',
    justifyContent: 'space-around',
  },
  btnWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: 88,
    width: 60,
    paddingTop: 10
  },
  selectedLine: {
    height: 4,
    zIndex: 1,
    position: 'absolute',
    top: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    width: 50,
    backgroundColor: '#F2AE2E',
  }
});