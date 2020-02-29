import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Text, TouchableOpacity, SafeAreaView, StatusBar} from 'react-native';
import NetInfo from "@react-native-community/netinfo";

import Header from './Header';
import Footer from './Footer';

const { width: screenWidth } = Dimensions.get('window');

const Home = ({navigation}) => {
    const [footerTitle, setFooterTitle] = useState("CHECK");
    const [repoName, changeTextRepo] = useState("");
    const [userName, changeTextUsername] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("white");
    const [checkButtonDisabled, setButtonEnabled] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        var sRepoName = navigation.getParam("repoName", "NOREPO");
        var sUsername = navigation.getParam("userName", "NOUSERNAME");

        sRepoName !== "" && sRepoName !== "NOREPO" ? 
            repoName !== sRepoName ? changeTextRepo(sRepoName) : null : changeTextRepo("");
        sUsername !== "" && sUsername !== "NOUSERNAME" ? 
            userName !== sUsername ? changeTextUsername(sUsername) : null : changeTextUsername("");
    }, [navigation]);

    checkConnectionAndSend = () => {
        setButtonEnabled(true);
        NetInfo.fetch().then(state => {
            if(state.isConnected){
                _sendMessage();
            }else{
                _setErrorPage("INTERNET");
            }
        });
    };

    checkConnectionBeforeSend = () => {
        Promise.all([
            NetInfo.fetch(),
            _checkRepoExistence()
        ]).then(response => {
            var state = response[0];
            var checkRepo = response[1];
            if(state.isConnected && checkRepo === "OK"){
                setError("");
                setBackgroundColor("#caffda");
                setFooterTitle("SEND");
            }else if(!state.isConnected){
                _setErrorPage("INTERNET");
            }else{
                _setErrorPage("BADREQUEST");
            }
        });
    };

    navToInsertGit = () => {
        _clearErrorPage();
        navigation.navigate('InsertGit', {
            repoName,
            userName
        });
    };

    navToUserName = () => {
        _clearErrorPage();
        navigation.navigate('UserName', {
            repoName,
            userName
        });
    };

    _sendMessage = () => {
        fetch("https://pushmore.marc.io/webhook/qnUSj4NmQ2qdfzCPv4jM5ByZ", {
            method: "POST",
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify({repoUrl: `github.com/${userName}/${repoName}`, sender: "Carlo Lunetta"}),
        }).then(res => res.text()).then(textRes => {
            if (!(/Error/gmi.test(textRes))) {
                _clearErrorPage();
                changeTextRepo("");
                changeTextUsername("");
                setTimeout(() => {
                    navigation.navigate('LastPage');
                }, 50);
            }else{
                _setErrorPage("BADREQUEST");
            }
        }).catch(err => {
            _setErrorPage("BADREQUEST");
        });
    };

    _clearErrorPage = () => {
        setError("");
        setBackgroundColor("white");
        setFooterTitle("CHECK");
        setButtonEnabled(false);
    };

    _setErrorPage = (sErrorType) => {
        setBackgroundColor("#ffacab");
        setError(sErrorType);
        setButtonEnabled(false);
    };

    _checkRepoExistence = () => {
        return new Promise((resolve) => { 
            fetch(`https://github.com/${userName}/${repoName}`,{
                method: "GET",
            }).then(res => {
                if(res.status === 200){
                    resolve("OK");
                }else{
                    resolve("ERROR");
                }
            })
            .catch(err => {
                resolve("ERROR");
            });
        });
    };

    _renderFooter = () => {
        return (footerTitle === "CHECK" ?
                <Footer buttonTitle={footerTitle} buttonDisabled={checkButtonDisabled}
                    functionToExecute={_returnFnCheckBeforeSend()}/> :
                <Footer buttonTitle={footerTitle} buttonDisabled={checkButtonDisabled}
                    functionToExecute={_returnFnSend()}/>);
    };

    _returnFnCheckBeforeSend = () => {
        return (repoName !== "" && userName !== "" ? checkConnectionBeforeSend : 
            () => {(setBackgroundColor("#ffacab"), setError("BADREQUEST"))});
    };

    _returnFnSend = () => {
        return (repoName !== "" && userName !== "" ? checkConnectionAndSend : 
            () => {(setBackgroundColor("#ffacab"), setError("BADREQUEST"))});
    };

    _renderErrorMessages = () => {
        return (error !== "" ?
                <View style={{...styles.flexDirectionColumn, ...{flex: 2, paddingTop: "5%"}}}>
                    <View style={styles.flexErrorView}>
                        <Text style={styles.textCheckYour}>Check your </Text>
                        <Text style={styles.textBoldError}>
                            {_returnErrorMessage()}
                        </Text>
                    </View>
                    <View style={styles.flexErrorView}>
                        {_returnExtraErrorText()}
                    </View>
                </View> : null);
    };

    _returnErrorMessage = () => {
        return (error === "INTERNET" ? "internet connection" : 
                error === "BADREQUEST" ? "username" : "");
    };

    _returnExtraErrorText = () => {
        return (error === "BADREQUEST" ? 
                    <>
                        <Text style={styles.textCheckYour}>or your </Text>
                        <Text style={styles.textBoldError}>repository </Text>
                        <Text style={styles.textCheckYour}>name</Text>
                    </> : null);
    };

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{flex: 1, ...{backgroundColor}}}>
                <View style={{...styles.MainView, ...{backgroundColor}}}>
                    <Header headerTitle={"Set the repository address"} iconVisible={false}/>
                    <View style={styles.ViewContent}>
                        <View style={{...styles.flexContent, ...styles.flexDirectionColumn}}>
                            <View style={styles.flexGitInfoView}>
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
                                {_renderErrorMessages()}
                            </View>
                        </View>
                    </View>
                </View>
                {_renderFooter()}
            </SafeAreaView>
        </>
    );
};

var styles = StyleSheet.create({
    MainView: {
        flexDirection: 'column',
        flex: 1
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
        paddingLeft: "8%",
        flex: 10
    },
    flexGitInfoView: {
        flex: 0.7
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