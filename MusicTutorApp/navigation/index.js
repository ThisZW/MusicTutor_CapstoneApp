import React, {Component} from 'react'
import Home from './../src/home'
import { StackNavigator } from 'react-navigation';

const RootStack = StackNavigator(
  {
    Home: {
      screen: Home
    }
  },
  {
    initialRouteName: 'Home',
  }
)

export default class Navigation extends Component {
  render() {
    return <RootStack />;
  }
}