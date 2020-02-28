import React from 'react';
import {View, StyleSheet, Text, Dimensions, SafeAreaView, StatusBar} from 'react-native';
import Footer from "./Footer";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const LastPage = ({navigation}) => {

    navToHome = () => {
        navigation.navigate('Home');
    };

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                <View style={styles.ViewStyle}>
                    <View style={styles.nullViewSmall}></View>
                    <View style={styles.ViewTextStyle}>
                        <Text style={styles.TextStyle}>All done!</Text>
                        <Text style={styles.TextStyle}>Repository sent.</Text>
                    </View>
                    <View style={styles.nullViewBig}></View>
                </View>
                <Footer buttonTitle={"COOL"} buttonDisabled={false}
                        functionToExecute={() => {navToHome()}}/>
            </SafeAreaView>
        </>
    );
};

var styles = StyleSheet.create({
    ViewStyle: {
        flex: 1,
        alignItems: 'center'
    },
    TextStyle: {
        fontSize: Math.abs((screenWidth*45)/414), 
        fontFamily: "OpenSans-Bold"
    },
    ViewTextStyle: {
        flex: 2,
        alignItems: 'center'
    },
    nullViewSmall: {
        flex: 2
    },
    nullViewBig: {
        flex: 10
    }
});

export default LastPage;