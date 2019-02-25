import React, { Component } from 'react';

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
    width: 14,
    height: 65,
    backgroundColor: 'white',
    display: 'inline-block',
    border: '1px solid black',
    borderRadius: '1px'
  },
  whiteKeyPlaying: {
    width: 14,
    height: 65,
    backgroundColor: 'green',
    display: 'inline-block',
    border: '1px solid black',
    //borderRadius: '1px'
  },
  blackKeyContainer: {
    left: 7,
    position: 'absolute',
    display: 'inline-block'
  }
}

class Piano extends Component {
  
  getWhiteKeys = () => {
    let arr = []
    let count = 1
    let index = 0
    let octave = 0
    while(count < 53){
      whiteKeyNotes[index] === 'C' && octave++
      let note = whiteKeyNotes[index] + octave.toString()
      arr.push(<WhiteKey key={count} note={note} isPlaying={this.props.playingNotes === note}/>)
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
      blackKeyNotes[index] ? arr.push(<BlackKey key={count} note={note} isPlaying={this.props.playingNotes === note} />) : arr.push(<EmptyBlackKey key={count}/>)
      //prepare for next note
      index < 6 ? index++ : index = 0
      count++
    }
    return arr;
  }

  render(){
    return(
      <div style={{position: 'relative'}}>
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