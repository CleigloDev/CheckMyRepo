import React, {useEffect} from 'react';
import { StackActions, NavigationActions} from 'react-navigation';
import {View, StyleSheet, Text, Dimensions, SafeAreaView, StatusBar, BackHandler} from 'react-native';
import Footer from "./Footer";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const LastPage = ({navigation}) => {

    handleHardwareBack = () => {
        navToHome();
        return true;
    };

    useEffect(() => {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', handleHardwareBack);
    }, []);

    navToHome = () => {
        var oNavigationParm = { routeName: 'Home'};
        const resetHomeScreen = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate(oNavigationParm)],
        });
        this.backHandler && this.backHandler.remove ? this.backHandler.remove() : null;
        navigation.dispatch(resetHomeScreen);
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
        flex: Math.abs((screenHeight*1)/896), 
        alignItems: 'center'
    },
    TextStyle: {
        fontSize: Math.abs((screenWidth*45)/414), 
        fontFamily: "OpenSans-Bold"
    },
    ViewTextStyle: {
        flex: Math.abs((screenHeight*2)/896), 
        alignItems: 'center'
    },
    nullViewSmall: {
        flex: Math.abs((screenHeight*2)/896)
    },
    nullViewBig: {
        flex: Math.abs((screenHeight*10)/896)
    }
});

export default LastPage;