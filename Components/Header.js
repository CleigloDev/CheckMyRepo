import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config.json';
const Icon = createIconSetFromFontello(fontelloConfig);

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Header = props => {
  return (
    <View style={styles.MinFlex}>
        <View style={styles.MainViewStyle}>
            {props.iconVisible ? <View style={styles.MinFlex}>
                <TouchableOpacity onPress={props.navBack}>
                    <Icon name={"back"} size={20}></Icon>
                </TouchableOpacity>
            </View> : null}
            {props.iconVisible ? <View style={styles.MinFlex}/> : null}
            <View style={styles.MaxFlex}>
                <Text style={styles.TextStyle}>{props.headerTitle}</Text>
            </View>
        </View>
    </View>
  );
};

var styles = StyleSheet.create({
    MainViewStyle: {
        flexDirection: 'row', 
        position: 'absolute', 
        top: 15, 
        left: 20,
        alignItems: 'center'
    },
    MinFlex:{
        flex: 1,
    },
    MaxFlex: {
        flex: 12,
    },
    TextStyle: {
        fontSize: Math.abs((screenWidth*25)/414), 
        fontFamily: "OpenSans-Bold"
    }
});

export default Header;