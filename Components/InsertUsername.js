import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput, SafeAreaView, StatusBar, Dimensions} from 'react-native';

import fontSize from '../Modules/fontSize';
import Header from './Header';
import Footer from './Footer';

const { width: screenWidth } = Dimensions.get('window');

const InsertUsername = ({navigation}) => {
    const [tempUserName, setTempUsername] = useState("");

    useEffect(() => {
        var userName = navigation.getParam("userName", "");
        setTempUsername(userName);
    }, []);

    navToHome = () => {
        navigation.navigate('Home', {
            userName: tempUserName,
            repoName: navigation.getParam("repoName", ""),
        });
    };

    navBack = () => {
        navigation.goBack();
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
                                value={tempUserName}
                                onSubmitEditing={() => {navToHome()}}
                                onChangeText={text => setTempUsername(text)}
                                placeholder={"Type your github username"}></TextInput>
                        </View>
                    </View>
                </View>
                <Footer buttonTitle={"DONE"} buttonDisabled={false} functionToExecute={() => {navToHome()}}/>
            </SafeAreaView>
        </>
    );
};

var styles = StyleSheet.create({
    MainView: {
        flexDirection: 'column',
        flex: 1
    },
    flex7: {
        flex: 7
    },
    TextStyle: {
        fontSize: fontSize(20),
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