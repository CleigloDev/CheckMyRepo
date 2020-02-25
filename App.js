import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text style={{fontFamily: "OpenSans-Bold"}}>Ciao</Text>
        <Icon name="rocket" size={80} color="#bf1313" />
      </SafeAreaView>
    </>
  );
};

export default App;
