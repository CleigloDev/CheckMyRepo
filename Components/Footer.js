import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import fontSize from '../Modules/fontSize';

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
        fontSize: fontSize(25), 
        fontFamily: "OpenSans-Bold"
    }
});

export default Footer;