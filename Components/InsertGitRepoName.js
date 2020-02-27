import React, {useState, useEffect} from 'react';
import { StackActions, NavigationActions} from 'react-navigation';
import {View, StyleSheet, TextInput, Dimensions, SafeAreaView, StatusBar, BackHandler} from 'react-native';
import Header from './Header';
import Footer from './Footer';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const InsertGitRepo = ({navigation}) => {
    const [tempRepoName, setTempRepoName] = useState("");

    handleHardwareBack = () => {
        navToHome();
        return true;
    };

    useEffect(() => {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleHardwareBack);
    }, []);

    navToHome = (bDonePressed) => {
        var oNavigationParm = { routeName: 'Home'};
        oNavigationParm = {...oNavigationParm, ...{params: {
            repoName: bDonePressed ? tempRepoName : navigation.getParam("repoName", ""),
            userName: navigation.getParam("userName", ""),
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
                    <Header headerTitle={"Repository"} iconVisible={true} 
                        navBack={() => {navToHome()}}/>
                    <View style={styles.flex7}>
                        <View style={styles.ViewText}>
                            <TextInput style={styles.TextStyle}
                                autoFocus={true}
                                value={
                                    tempRepoName === "" ? 
                                    navigation.getParam("repoName", "") : tempRepoName
                                }
                                onChangeText={text => setTempRepoName(text)}
                                placeholder={"Type your github username"}></TextInput>
                        </View>
                    </View>
                    <Footer buttonTitle={"Done"} buttonDisabled={false} functionToExecute={() => {navToHome(true)}}/>
                </View>
            </SafeAreaView>
        </>
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
        borderBottomColor: 'black'
    }
});

export default InsertGitRepo;