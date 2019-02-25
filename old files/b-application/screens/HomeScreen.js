/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Piano from '../components/Piano';
import {Platform, StyleSheet, Text, View, ScrollView, NativeModules} from 'react-native';
import Orientation from 'react-native-orientation';
//import {ScreenOrientation, Audio, Permissions} from 'expo';
//import frequency from './assets/Frequency.json';
//import {Map} from 'immutable';


export default class Home extends Component {

  async componentDidMount(){
    Orientation.lockToLandscape();
    Orientation.addOrientationListener(this._orientationDidChange);
    //const {status} = await Permissions.getAsync(Permissions.AUDIO_RECORDING)
  }


  _orientationDidChange = (orientation) => {
    if (orientation === 'LANDSCAPE') {
      // do something with landscape layout
    } else {
      // do something with portrait layout  
    }
  }

  render() {
    //console.log(frequencyMap)
    return (
      <View style={styles.container}>
        <Piano/>
        <Piano/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
