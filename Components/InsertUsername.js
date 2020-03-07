import React, {useState} from 'react';
import {View, StyleSheet, TextInput, SafeAreaView, StatusBar} from 'react-native';

import fontSize from '../Modules/fontSize';
import Header from './Header';
import Footer from './Footer';

const InsertUsername = ({navigation}) => {
    const [tempUserName, setTempUsername] = useState(navigation.getParam("userName", ""));

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
                    <View style={styles.ViewText}>
                        <TextInput style={styles.TextStyle} 
                            autoFocus={true}
                            value={tempUserName}
                            onSubmitEditing={() => {navToHome()}}
                            onChangeText={text => setTempUsername(text)}
                            placeholder={"Type your github username"}></TextInput>
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
    TextStyle: {
        width: 300,
        borderBottomWidth: 3, 
        borderBottomColor: 'black',
        fontSize: fontSize(20),
        fontFamily: 'OpenSans-Light'
    },
    ViewText: {
        flex: 7,
        paddingLeft: 40
    }
});

export default InsertUsername;