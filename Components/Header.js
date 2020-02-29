import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import fontSize from '../Modules/fontSize';

const Header = props => {

    _renderIcon = () => {
        return (props.iconVisible ? <View style={styles.MinFlex}>
                    <TouchableOpacity onPress={props.navBack}>
                        <Image source={require("../Images/back.png")} style={styles.IconDimension}/>
                    </TouchableOpacity>
                </View> : null);
    };

    _addSpaceFromIcon = () => {
        return {
            flex: 12,
            paddingLeft: (props.iconVisible ? "7%" : "0%")
        };
    }

    return (
        <View style={styles.MinFlex}>
            <View style={styles.MainViewStyle}>
                {_renderIcon()}
                <View style={_addSpaceFromIcon()}>
                    <Text style={styles.TextStyle}>{props.headerTitle}</Text>
                </View>
            </View>
        </View>
    );
};

var styles = StyleSheet.create({
    MainViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: "6%",
        paddingTop: "2%",
        paddingBottom: "4%"
    },
    MinFlex:{
        flex: 1
    },
    TextStyle: {
        fontSize: fontSize(25), 
        fontFamily: "OpenSans-Bold"
    },
    IconDimension: {
        height: 20, 
        width: 25,
        marginTop: "13%"
    }
});

export default Header;