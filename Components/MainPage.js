import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Text, TouchableOpacity, SafeAreaView, StatusBar} from 'react-native';
import Header from './Header';
import Footer from './Footer';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Home = () => {
    const [repoName, changeTextRepo] = useState("");
    const [userName, changeTextUsername] = useState("");
    const [isAddUserVisible, changeVisibleUser] = useState(false);
    const [isAddRepoVisible, changeVisibleRepo] = useState(false);

    sendMessage = () => {
        fetch("https://pushmore.marc.io/webhook/qnUSj4NmQ2qdfzCPv4jM5ByZ", {
            method: "POST",
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify({repoUrl: `github.com/${userName}/${repoName}`, sender: "Carlo Lunetta"}),
        }).then(res => res.text()).then(textRes => {
            if (!(/Error/gmi.test(textRes))) {
            alert("Yes, message has been sent");
            }
        }).catch(err => {
            alert("Ops some error occured, please retry.");
        });
    };

    showRepoPage = () => {
        changeVisibleRepo(!isAddRepoVisible);
    };

    showUserPage = () => {
        changeVisibleUser(!isAddUserVisible);
    };

  return (
    <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.MainView}>
                <Header headerTitle={"Set the repository address"} iconVisible={false}/>
                <View style={styles.ViewContent}>
                    <View style={styles.flexNullView}/>
                    <View style={{...styles.flexContent, ...styles.flexDirectionColumn}}>
                        <Text style={styles.TextMain}>github.com</Text>
                        
                        <TouchableOpacity onPress={() => {}}>
                            <View style={styles.flexDirectionRow}>
                                <Text style={styles.TextMain}>/</Text>
                                <Text style={styles.TextPlaceHolder}>
                                    {userName !== "" ? userName : "user"}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() =>{}}>
                            <View style={styles.flexDirectionRow}>
                                <Text style={styles.TextMain}>/</Text>
                                <Text style={styles.TextPlaceHolder}>
                                    {repoName !== "" ? repoName : "repo"}
                                </Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
                <Footer buttonTitle={"Check"} functionToExecute={() => {}}/>
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
        fontSize: 40,
        fontFamily: 'OpenSans-Regular',
    },
    TextPlaceHolder: {
        fontSize: 40,
        fontFamily: 'OpenSans-Light',
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
    }
});

export default Home;