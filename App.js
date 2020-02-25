import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Text, TextInput} from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from './config.json';
const Icon = createIconSetFromFontello(fontelloConfig);
import InsertUsername from './Components/InsertUsername';

const App = () => {
  const [textProva, setProva] = useState("");

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <InsertUsername />
      </SafeAreaView>
    </>
  );
};

export default App;
