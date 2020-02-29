import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const Footer = props => {
  return (
    <View style={styles.ViewStyle}>
        <TouchableOpacity onPress={props.functionToExecute} disabled={props.buttonDisabled}>
            <Text style={styles.TextStyle}>{props.buttonTitle}</Text>
        </TouchableOpacity>
    </View>
  );
};

var styles = StyleSheet.create({
    ViewStyle: {
        position: 'absolute',
        bottom: 20,
        right: 25,
    },
    TextStyle: {
        fontSize: Math.abs((screenWidth*25)/414), 
        fontFamily: "OpenSans-Bold"
    }
});

export default Footer;