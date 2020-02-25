import React from 'react';
import {View, StyleSheet, Dimensions, Text, TouchableOpacity} from 'react-native';
import Header from './Header';
import Footer from './Footer';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Home = props => {

  return (
    <View style={styles.MainView}>
        <Header headerTitle={"Set the repository address"} iconVisible={false}/>
        <View style={styles.ViewContent}>
            <View style={styles.flexNullView}/>
            <View style={{...styles.flexContent, ...styles.flexDirectionColumn}}>
                <Text style={styles.TextMain}>github.com</Text>
                
                <TouchableOpacity onPress={props.showUserPage}>
                    <View style={styles.flexDirectionRow}>
                        <Text style={styles.TextMain}>/</Text>
                        <Text style={styles.TextPlaceHolder}>{props.userName !== "" ? props.userName : "user"}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={props.showRepoPage}>
                    <View style={styles.flexDirectionRow}>
                        <Text style={styles.TextMain}>/</Text>
                        <Text style={styles.TextPlaceHolder}>{props.repoName !== "" ? props.repoName : "repo"}</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
        <Footer buttonTitle={"Check"}/>
    </View>
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