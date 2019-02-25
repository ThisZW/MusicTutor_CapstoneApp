import React, { Component } from 'react';
import { Pitcher } from 'pitch-detector';
import Tone from 'tone';
import Piano from './piano';

AudioContext = window.AudioContext || window.webkitAudioContext
const audioContext = new AudioContext()
const analyser = audioContext.createAnalyser()
const scriptProcessor = audioContext.createScriptProcessor(8192, 1, 1)

export default class PitchDetector extends Component{

  constructor(){
    super()
    this.state = {
      playingNotes: ""
    }
  }

  componentDidMount = () =>{
    navigator.mediaDevices.getUserMedia({audio: true})
    .then( streamSource => {
      audioContext.createMediaStreamSource(streamSource).connect(analyser)
      analyser.connect(scriptProcessor)
      scriptProcessor.connect(audioContext.destination)
      scriptProcessor.addEventListener('audioprocess', event => {
        const data = event.inputBuffer.getChannelData(0)
        const hz = Pitcher.pitch(data, 44100);
        const note = Tone.Frequency(Tone.Frequency.ftom(hz), 'midi').toNote()
        //console.log('tone', hz, note)
        this.setState({
          playingNotes: note
        })
      })
    })
    .catch(function(err) {
      console.log(err)
    });
  }

  render(){
    return(
      <Piano playingNotes={this.state.playingNotes} />
    )
  }
}