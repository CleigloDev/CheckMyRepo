import React, {useState, useEffect} from 'react';
import { StackActions, NavigationActions} from 'react-navigation';
import {View, StyleSheet, TextInput, Dimensions, SafeAreaView, StatusBar, BackHandler} from 'react-native';
import Header from './Header';
import Footer from './Footer';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const InsertUsername = ({navigation}) => {
    const [tempUserName, setTempUsername] = useState("");

    handleHardwareBack = () => {
        navToHome();
        return true;
    };

    useEffect(() => {
        console.log("width: "+ screenWidth);
        console.log("height: "+ screenHeight);
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', handleHardwareBack);
    }, []);

    navToHome = (bDonePressed) => {
        var oNavigationParm = { routeName: 'Home'};
        oNavigationParm = {...oNavigationParm, ...{params: {
            userName: bDonePressed ? tempUserName : navigation.getParam("userName", ""),
            repoName: navigation.getParam("repoName", ""),
        }}};
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
                <View style={styles.MainView}>
                    <Header headerTitle={"User"} iconVisible={true} 
                        navBack={() => {navToHome(false)}}/>
                    <View style={styles.flex7}>
                        <View style={styles.ViewText}>
                            <TextInput style={styles.TextStyle} 
                                autoFocus={true}
                                value={
                                    tempUserName === "" ? 
                                    navigation.getParam("userName", "") : tempUserName
                                }
                                onSubmitEditing={() => {navToHome(true)}}
                                onChangeText={text => setTempUsername(text)}
                                placeholder={"Type your github username"}></TextInput>
                        </View>
                    </View>
                </View>
                <Footer buttonTitle={"Done"} buttonDisabled={false} functionToExecute={() => {navToHome(true)}}/>
            </SafeAreaView>
        </>
    );
};

var styles = StyleSheet.create({
    MainView: {
        flexDirection: 'column',
        flex: Math.abs((screenHeight*1)/896),
    },
    flex7: {
        flex: Math.abs((screenHeight*7)/896),
    },
    TextStyle: {
        fontSize: Math.abs((screenWidth*20)/414),
        fontFamily: 'OpenSans-Light',
    },
    ViewText: {
        position: 'absolute', 
        left: 40, 
        width: (screenWidth-(screenWidth*0.20)),
        borderBottomWidth: 3, 
        borderBottomColor: 'black'
    }
});

export default InsertUsername;