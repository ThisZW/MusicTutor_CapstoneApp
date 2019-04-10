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
      parsedMidi: null,
      midiIsPlaying: false,
      midiPlayingNotes: [],
    };
  }

  _update(note) {
    this.setState({ note });
  }

  componentDidMount = async() => {
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


  componentWillReceiveProps = (props) => {
    this.setState({
      isPlaying: true,
    }, () => {
      props.parsedMidi.tracks[0].forEach( val => {
        this.addNoteToState(val),
        this.dropNoteFromState(val)
      })
    })
  }

  addNoteToState = (val) => {
    setTimeout(() => {
      notes = this.state.midiPlayingNotes
      notes.push(val.noteName)
      this.setState({
        midiPlayingNotes: notes
      })
    }, val.startTimeInMS)
  }

  dropNoteFromState = (val) => {
    setTimeout(() => {
      notes = this.state.midiPlayingNotes
      //console.log('before', notes, val.noteName)
      notes = notes.filter( note => 
        note !== val.noteName
      )
      //console.log('after', notes)
      this.setState({
        midiPlayingNotes: notes
      })
    }, val.endTimeInMS)
  }

  _orientationDidChange = (orientation) => {
    if (orientation === 'LANDSCAPE') {
      // do something with landscape layout
    } else {
      // do something with portrait layout  
    }
  }

  render() {
    const { midiPlayingNotes, midiIsPlaying} = this.state
    const playingNote = this.state.note.name + this.state.note.octave.toString()
    return (
      <View style={styles.container}>
        <Piano playingNote={playingNote}/>
        <Piano midiPlayingNotes={midiPlayingNotes} midiIsPlaying={midiIsPlaying}/>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.midi
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