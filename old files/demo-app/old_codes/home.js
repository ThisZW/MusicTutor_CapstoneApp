/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Piano from './components/piano';
import Orientation from 'react-native-orientation';
import {Platform, StyleSheet, Text, View, ScrollView, NativeModules} from 'react-native';
import frequency from './assets/Frequency.json';
import {Map} from 'immutable';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shak for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    
    'Shake or press menu button for dev menu',
});

const frequencyMap = Map(frequency)

//type Props = {};
export default class Home extends Component {

  componentDidMount() {
    Orientation.lockToLandscape();
    Orientation.addOrientationListener(this._orientationDidChange);
  }

  _orientationDidChange = (orientation) => {
    if (orientation === 'LANDSCAPE') {
      // do something with landscape layout
    } else {
      // do something with portrait layout
    }
  }

  testModules = () =>{
    NativeModules.AudioModule.takeSampleFreq((err, val)=>{
      this.setState({test: val})
    })
  }

  render() {
    console.log(frequencyMap)
    return (
      <View style={styles.container}>
        <Piano frequency={frequencyMap}/>
        <Piano frequency={frequencyMap}/>
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
