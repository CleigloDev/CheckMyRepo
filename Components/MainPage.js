import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator} from 'react-native';
import fontSize from '../Modules/fontSize';
import NetInfo from "@react-native-community/netinfo";

import Header from './Header';
import Footer from './Footer';

const Home = ({navigation}) => {
    const [footerTitle, setFooterTitle] = useState("CHECK");
    const [repoName, changeTextRepo] = useState("");
    const [userName, changeTextUsername] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("white");
    const [checkButtonDisabled, setButtonEnabled] = useState(false);
    const [error, setError] = useState("");
    const [showBusy, setShowBusy] = useState(false);

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
        setShowBusy(true);
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
            setShowBusy(false);
        });
    };

    navToInsertGit = () => {
        _clearErrorPage();
        navigation.navigate('InsertGit', {
            repoName,
            changeTextRepo: changeTextRepo.bind(this)
        });
    };

    navToUserName = () => {
        _clearErrorPage();
        navigation.navigate('UserName', {
            userName,
            changeTextUsername: changeTextUsername.bind(this)
        });
    };

    _sendMessage = () => {
        setShowBusy(true);
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
                setShowBusy(false);
                setTimeout(() => {
                    navigation.navigate('LastPage');
                }, 50);
            }else{
                setShowBusy(false);
                _setErrorPage("BADREQUEST");
            }
        }).catch(err => {
            setShowBusy(false);
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
            <SafeAreaView style={{...styles.MainView, ...{backgroundColor}}}>
                <Header headerTitle={"Set the repository address"} iconVisible={false}/>
                <View style={{...styles.flexContent, ...styles.flexDirectionColumn}}>
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
                {_renderFooter()}
                {showBusy &&
                    <View style={styles.busyIndicator}>
                        <ActivityIndicator animating={showBusy} size="large"/>
                        <Text>Loading..</Text>
                    </View>}
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
        fontSize: fontSize(40),
        fontFamily: 'OpenSans-Regular',
    },
    TextPlaceHolder: {
        fontSize: fontSize(40),
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
        flex: 7
    },
    flexErrorView: {
        flexDirection: 'row'
    },
    textCheckYour: {
        fontSize: fontSize(23), 
        fontFamily: 'OpenSans-Regular'
    },
    textBoldError: {
        fontSize: fontSize(23), 
        fontFamily: 'OpenSans-Bold'
    },
    busyIndicator:{
        flex: 1,
        backgroundColor: "white",
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Home;