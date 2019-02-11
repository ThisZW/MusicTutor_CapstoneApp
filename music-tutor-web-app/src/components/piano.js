import React, { Component } from 'react';
//import Aubio from '.././aubio/index'
import { Pitcher } from 'pitch-detector';
import Tone from 'tone'

AudioContext = window.AudioContext || window.webkitAudioContext
const audioContext = new AudioContext()
const analyser = audioContext.createAnalyser()
const scriptProcessor = audioContext.createScriptProcessor(8192, 1, 1)
const bufferSize = 4096
const middleA = 440
const semitone = 69

const whiteKeyNotes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
const blackKeyNotes = ['A#', '', 'C#', 'D#', '', 'F#', 'G#']

const style={
  blackKeyNote: {
    width: 8,
    height: 45,
    backgroundColor: 'black',
    display: 'inline-block',
    marginLeft: 3,
    marginRight: 3,
  },
  blackKeyPlaying: {
    width: 8,
    height: 45,
    backgroundColor: 'green',
    display: 'inline-block',
    marginLeft: 3,
    marginRight: 3,
  },
  emptyBlackKey: {
    width: 8,
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    display: 'inline-block',
    marginLeft: 3,
    marginRight: 3
  },
  whiteKeyNote: {
    width: 12,
    height: 65,
    backgroundColor: 'white',
    display: 'inline-block',
    border: '1px solid black',
    borderRadius: '1px'
  },
  whiteKeyPlaying: {
    width: 12,
    height: 65,
    backgroundColor: 'green',
    display: 'inline-block',
    border: '1px solid black',
    borderRadius: '1px'
  },
  blackKeyContainer: {
    left: 7,
    position: 'fixed',
    display: 'inline-block'
  }
}

class Piano extends Component {

  constructor(){
    super()
    this.state = {
      playingNotes: ''
    }
  }
  getWhiteKeys = () => {
    let arr = []
    let count = 1
    let index = 0
    let octave = 0
    while(count < 53){
      whiteKeyNotes[index] === 'C' && octave++
      let note = whiteKeyNotes[index] + octave.toString()
      arr.push(<WhiteKey key={count} note={note} isPlaying={this.state.playingNotes === note}/>)
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
      blackKeyNotes[index] === 'C#' && octave++
      let note = blackKeyNotes[index] + octave.toString()
      blackKeyNotes[index] ? arr.push(<BlackKey key={count} note={note} isPlaying={this.state.playingNotes === note} />) : arr.push(<EmptyBlackKey key={0}/>)
      //prepare for next note
      index < 6 ? index++ : index = 0
      count++
    }
    return arr;
  }
  

  componentDidMount = () => {

    function getNote(frequency) {
      var note = 12 * (Math.log(frequency / middleA) / Math.log(2))
      return Math.round(note) + semitone
    }
    function getStandardFrequency(note) {
      return middleA * Math.pow(2, (note - semitone) / 12)
    }
    function getCents(frequency, note) {
      return Math.floor(1200 * Math.log(frequency / getStandardFrequency(note)) / Math.log(2))
    }

    navigator.mediaDevices.getUserMedia({audio: true})
      .then( streamSource => {
        audioContext.createMediaStreamSource(streamSource).connect(analyser)
        analyser.connect(scriptProcessor)
        scriptProcessor.connect(audioContext.destination)
        scriptProcessor.addEventListener('audioprocess', event => {
          const data = event.inputBuffer.getChannelData(0)
          const hz = Pitcher.pitch(data, 44100);
          const note = Tone.Frequency(Tone.Frequency.ftom(hz), 'midi').toNote()
          console.log('tone', hz, note)
          this.setState({
            playingNotes: note
          })
        })
      })
      .catch(function(err) {
        /* handle the error */
      });

  }

  render(){
    return(
      <div>
        <div style={style.container}>
          {this.getWhiteKeys()}
          <div style={style.blackKeyContainer}>
            {this.getBlackKeys()}
          </div>
        </div>
      </div>
    );
  }   
} 


class WhiteKey extends Component {
  constructor(){
    super()
  }
  render(){
    return (
      <div style={ this.props.isPlaying ? style.whiteKeyPlaying : style.whiteKeyNote}>
      </div>
    )
  }
}


class BlackKey extends Component {
  constructor(){
    super()
  }
  render(){
    return (
      <div style={ this.props.isPlaying ? style.blackKeyPlaying : style.blackKeyNote}>
      </div>
    )
  }
}

class EmptyBlackKey extends Component {
  render(){
    return <div style={style.emptyBlackKey}/>
  }
}

export default Piano