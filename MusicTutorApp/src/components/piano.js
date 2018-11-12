
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';

const whiteKeyNotes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

const blackKeyNotes = ['A#', '', 'C#', 'D#', '', 'F#', 'G#']

export default class Piano extends Component {

  getWhiteKeys = () => {
    let arr = []
    let count = 1
    let index = 0
    let octave = 0
    while(count < 53){
      whiteKeyNotes[index] == 'C' ? octave++: null
      let notes = whiteKeyNotes[index] + octave.toString()
      arr.push(<WhiteKey key={count} notes={notes}/>)
      //prepare for next note
      index < 6 ? index++ : index = 0
      count++
    }
    return arr;
  }

  getBlackKeys = () => {
    let arr = []
    let count = 1
    let index = 0
    let octave = 0
    while(count < 52){
      blackKeyNotes[index] == 'C#' ? octave++: null
      let notes = blackKeyNotes[index] + octave.toString()
      blackKeyNotes[index] ? arr.push(<BlackKey key={count} notes={notes} />) : arr.push(<EmptyBlackKey key={0}/>)
      //prepare for next note
      index < 6 ? index++ : index = 0
      count++
    }
    return arr;
  }

  render(){
    return(
      <ScrollView  horizontal={true} showsHorizontalScrollIndicator={true}>
        <View style={style.container}>
          {this.getWhiteKeys()}
          <View style={style.blackKeyContainer}>
            {this.getBlackKeys()}
          </View>
        </View>
      </ScrollView>
    );
  }
} 


class WhiteKey extends Component {
  constructor(){
    super()
  }
  render(){
    return (
      <View>
        <View style={ this.props.isPlaying ? style.whiteKeyPlaying: style.whiteKey}/>
        <Text style={style.notesText}>{this.props.notes}</Text>
      </View>
    )
  }
}


class BlackKey extends Component {
  constructor(){
    super()
  }
  render(){
    return (
      <View>
        <View style={style.blackKey}/>
        <Text style={style.notesText}>{this.props.notes}</Text>
      </View>
    )
  }
}

class EmptyBlackKey extends Component {
  render(){
    return <View style={style.emptyBlackKey}/>
  }
}

const style = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  whiteKey: {
    width: 30,
    height: 130,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  whiteKeyPlaying: {
    width: 30,
    height: 130,
    backgroundColor: 'green',
    borderWidth: 1,
    borderColor: 'black',
  },
  blackKeyContainer:{
    position: 'absolute',
    top: 0,
    left: 15,
    bottom: 0,
    right: 0,
    flexDirection: 'row'
  },
  blackKey: {
    width: 18,
    height: 90,
    backgroundColor: 'black',
    marginHorizontal: 6
  },
  emptyBlackKey: {
    width: 30,
    height: 90,
    backgroundColor: 'white',
    opacity: 0,
  },
  notesText: {
    textAlign: 'center',
  }
})

			
