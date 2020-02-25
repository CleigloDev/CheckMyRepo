import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Text} from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from './config.json';
const Icon = createIconSetFromFontello(fontelloConfig);

const App = () => {
  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text style={{fontFamily: "OpenSans-Bold"}}>Ciao</Text>
        <Icon name="back" size={20} color="#bf1313" />
      </SafeAreaView>
    </>
  );
};

export default App;
