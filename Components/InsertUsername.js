import React from 'react';
import {View, StyleSheet, TextInput, Text, Dimensions, TouchableOpacity} from 'react-native';
import Header from './Header';
import Footer from './Footer';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const InsertUsername = props => {

  return (
    <View style={styles.MainView}>
        <Header headerTitle={"User"}/>
        <View style={styles.flex7}>
            <View style={styles.ViewText}>
                <TextInput style={styles.TextStyle} 
                    placeholder={"Type your github username"}></TextInput>
            </View>
        </View>
        <Footer buttonTitle={"Done"}/>
    </View>
  );
};

var styles = StyleSheet.create({
    MainView: {
        flexDirection: 'column',
        flex: 1,
    },
    flex7: {
        flex: 7,
    },
    TextStyle: {
        fontSize: 20,
        fontFamily: 'OpenSans-Light',
    },
    ViewText: {
        position: 'absolute', 
        left: 40, 
        width: (screenWidth-(screenWidth*0.20)),
        borderBottomWidth: 3, 
        borderBottomColor: 'black'}
});

export default InsertUsername;