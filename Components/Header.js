import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config.json';
const Icon = createIconSetFromFontello(fontelloConfig);

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Header = props => {
  return (
    <View style={styles.MinFlex}>
        <View style={{flex: 0.3}}/>
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
        alignItems: 'center',
        paddingLeft: 20
    },
    MinFlex:{
        flex: Math.abs((screenHeight*1)/896),
    },
    MaxFlex: {
        flex: Math.abs((screenHeight*12)/896),
    },
    TextStyle: {
        fontSize: Math.abs((screenWidth*25)/414), 
        fontFamily: "OpenSans-Bold"
    }
});

export default Header;