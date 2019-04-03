import React, {Component} from 'react';
import Piano from '../components/Piano';
import {Platform, StyleSheet, Text, View, ScrollView, NativeModules, PermissionsAndroid} from 'react-native';
import Permissions from 'react-native-permissions'
import Orientation from 'react-native-orientation';
import Tuner from '../libs/note'
import { getMidi } from '../reducers'
import { connect } from 'react-redux'

class Home extends Component {

  constructor(){
    super()
    this.state = {
      note: {
        name: "A",
        octave: 4,
        frequency: 440
      },
      parsedMidi: null
    };
  }

  _update(note) {
    this.setState({ note });
  }

  async componentDidMount(){
    Orientation.lockToLandscape();
    Orientation.addOrientationListener(this._orientationDidChange);
    await Permissions.request('microphone') 

    const tuner = new Tuner();
    tuner.start();
    tuner.onNoteDetected = note => {
      if (this._lastNoteName === note.name) {
        this._update(note);
      } else {
        this._lastNoteName = note.name;
      }
    };

  }


  componentWillReceiveProps= (props) => {
    this.setState({
      parsedMidi: props.parsedMidi
    })
  }

  _orientationDidChange = (orientation) => {
    if (orientation === 'LANDSCAPE') {
      // do something with landscape layout
    } else {
      // do something with portrait layout  
    }
  }

  render() {
    console.log('parsed', this.state.parsedMidi)
    const playingNote = this.state.note.name + this.state.note.octave.toString()
    //console.log(playingNote)
    return (
      <View style={styles.container}>
        <Piano playingNote={playingNote}/>
        <Piano/>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  parsedMidi: getMidi(state)
})

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

export default connect(mapStateToProps)(Home)