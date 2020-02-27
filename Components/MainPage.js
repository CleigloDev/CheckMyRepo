import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Text, TouchableOpacity, SafeAreaView, StatusBar} from 'react-native';
import NetInfo from "@react-native-community/netinfo";

import Header from './Header';
import Footer from './Footer';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Home = ({navigation}) => {
    const [repoName, changeTextRepo] = useState("");
    const [userName, changeTextUsername] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("white");
    const [checkButtonDisabled, setButtonEnabled] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        var sRepoName = navigation.getParam("repoName", "NOREPO");
        var sUsername = navigation.getParam("userName", "NOUSERNAME");

        sRepoName !== "" && sRepoName !== "NOREPO" ? 
            repoName !== sRepoName ? changeTextRepo(sRepoName) : null : null;
        sUsername !== "" && sUsername !== "NOUSERNAME" ? 
            userName !== sUsername ? changeTextUsername(sUsername) : null : null;
    }, []);

    _sendMessage = () => {
        setButtonEnabled(true);
        fetch("https://pushmore.marc.io/webhook/qnUSj4NmQ2qdfzCPv4jM5ByZ", {
            method: "POST",
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify({repoUrl: `github.com/${userName}/${repoName}`, sender: "Carlo Lunetta"}),
        }).then(res => res.text()).then(textRes => {
            if (!(/Error/gmi.test(textRes))) {
                setError("");
                setBackgroundColor("#caffda");
                
            }else{
                setBackgroundColor("#ffacab");
                setError("BADREQUEST");
                setButtonEnabled(true);
            }
        }).catch(err => {
            setBackgroundColor("#ffacab");
            setError("BADREQUEST");
            setButtonEnabled(true);
        });
    };

    checkConnectionBeforeSend = () => {
        NetInfo.fetch().then(state => {
            if(state.isConnected){
                _sendMessage();
            }else{
                setBackgroundColor("#ffacab");
                setError("INTERNET");
            }
        });
    };

    navToInsertGit = () => {
        navigation.navigate('InsertGit', {
            repoName,
            userName
        });
    };

    navToUserName = () => {
        navigation.navigate('UserName', {
            repoName,
            userName
        });
    };

  return (
    <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex: 1, ...{backgroundColor}}}>
            <View style={{...styles.MainView, ...{backgroundColor}}}>
                <Header headerTitle={"Set the repository address"} iconVisible={false}/>
                <View style={styles.ViewContent}>
                    <View style={styles.flexNullView}/>
                    <View style={{...styles.flexContent, ...styles.flexDirectionColumn}}>
                        <View style={styles.flexNullView}>
                        <Text style={styles.TextMain}>github.com</Text>
                        
                        <TouchableOpacity onPress={navToUserName}>
                            <View style={styles.flexDirectionRow}>
                                <Text style={styles.TextMain}>/</Text>
                                <Text style={styles.TextPlaceHolder}>
                                    {userName !== "" ? userName : "user"}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={navToInsertGit}>
                            <View style={styles.flexDirectionRow}>
                                <Text style={styles.TextMain}>/</Text>
                                <Text style={styles.TextPlaceHolder}>
                                    {repoName !== "" ? repoName : "repo"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                        
                        {error !== "" ?
                            <View style={{...styles.flexDirectionColumn, ...{flex: 2.2}}}>
                                <View style={styles.flexErrorView}>
                                    <Text style={styles.textCheckYour}>Check your </Text>
                                    <Text style={styles.textBoldError}>
                                        {error === "INTERNET" ? "internet connection" : 
                                            error === "BADREQUEST" ? "username" : ""}
                                    </Text>
                                </View>
                                <View style={styles.flexErrorView}>
                                    {error === "BADREQUEST" ? 
                                        <>
                                            <Text style={styles.textCheckYour}>or your </Text>
                                            <Text style={styles.textBoldError}>repository </Text>
                                            <Text style={styles.textCheckYour}>name</Text>
                                        </> : null}
                                </View>
                            </View> : null}
                    </View>
                </View>
                <Footer buttonTitle={"Check"} buttonDisabled={checkButtonDisabled}
                 functionToExecute={
                    repoName !== "" && userName !== "" ? checkConnectionBeforeSend : 
                    () => {(setBackgroundColor("#ffacab"), setError("BADREQUEST"))}}/>
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
    ViewContent: {
        flex: 7,
        flexDirection: 'row',
    },
    TextMain: {
        fontSize: Math.abs((screenWidth*40)/414),
        fontFamily: 'OpenSans-Regular',
    },
    TextPlaceHolder: {
        fontSize: Math.abs((screenWidth*40)/414),
        fontFamily: 'OpenSans-Light',
        color: 'gray'
    },
    flexDirectionRow: {
        flexDirection: 'row',
    },
    flexDirectionColumn: {
        flexDirection: 'column',
    },
    flexContent: {
        flex: 10,
    },
    flexNullView: {
        flex: 0.7,
    },
    flexErrorView: {
        flexDirection: 'row'
    },
    textCheckYour: {
        fontSize: Math.abs((screenWidth*23)/414), 
        fontFamily: 'OpenSans-Regular'
    },
    textBoldError: {
        fontSize: Math.abs((screenWidth*23)/414), 
        fontFamily: 'OpenSans-Bold'
    }
});

export default Home;