import React from 'react';
import {View, StyleSheet, Text, SafeAreaView, StatusBar} from 'react-native';
import fontSize from '../Modules/fontSize';
import Footer from "./Footer";

const LastPage = ({navigation}) => {

    navToHome = () => {
        navigation.navigate('Home', {
            repoName: "",
            userName: ""
        });
    };

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                <View style={styles.ViewStyle}>
                    <View style={styles.ViewTextStyle}>
                        <Text style={styles.TextStyle}>All done!</Text>
                        <Text style={styles.TextStyle}>Repository sent.</Text>
                    </View>
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
        fontSize: fontSize(45), 
        fontFamily: "OpenSans-Bold"
    },
    ViewTextStyle: {
        paddingTop: "35%",
        flex: 2,
        alignItems: 'center'
    }
});

export default LastPage;