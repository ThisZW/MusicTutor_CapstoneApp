import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

//import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MidiImportScreen from '../screens/MidiImportScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
};


const MidiImportStack = createStackNavigator({
  Home: MidiImportScreen,
})

MidiImportStack.navigationOptions = {
  tabBarLabel: 'Import'
}

export default createBottomTabNavigator({
  HomeStack,
  MidiImportStack
});
