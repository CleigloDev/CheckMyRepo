import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput, SafeAreaView, StatusBar, Dimensions} from 'react-native';

import fontSize from '../Modules/fontSize';
import Header from './Header';
import Footer from './Footer';

const { width: screenWidth } = Dimensions.get('window');

const InsertGitRepo = ({navigation}) => {
    const [tempRepoName, setTempRepoName] = useState("");

    useEffect(() => {
        var repoName = navigation.getParam("repoName", "");
        setTempRepoName(repoName);
    }, []);

    navToHome = () => {
        navigation.navigate('Home', {
            repoName: tempRepoName,
            userName: navigation.getParam("userName", ""),
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
                    <Header headerTitle={"Repository"} iconVisible={true} 
                        navBack={() => {navBack()}}/>
                    <View style={styles.flex7}>
                        <View style={styles.ViewText}>
                            <TextInput style={styles.TextStyle}
                                autoFocus={true}
                                value={tempRepoName}
                                onSubmitEditing={() => {navToHome()}}
                                onChangeText={text => setTempRepoName(text)}
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

export default InsertGitRepo;