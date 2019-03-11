import React, {Component} from 'react';
import { Text, ScrollView, Picker } from 'react-native';
import { Button, Flex, WhiteSpace, WingBlank } from '@ant-design/react-native';

//import base64binary
import base64binary from '../base64binary';
//import MIDI package
import AudioDetect from '../MIDI/AudioDetect';
import LoadPlugin from '../MIDI/LoadPlugin';
import Plugin from '../MIDI/Plugin';
import Player from '../MIDI/Player';
//import Loader from '../MIDI/Loader';
//import jasmid package
import stream from '../jasmid/stream';
import midifile from '../jasmid/midifile';
import replayer from '../jasmid/replayer';

const fs = require('react-native-fs');



export default class MidiImport extends Component {

  constructor(){
    super()
    this.state = {
      midiSelected: null,
      midiList: []
    }
  }

  componentDidMount = async() => {
    let files = await this.readMidiFiles()
    let filenames = files.map(v=>{
      return v.name
    })
    this.setState({
      midiList: filenames,
      midiSelected: filenames[0]
    })
  }

  readMidiFiles = () => {
    return fs.readDirAssets('midis')
  }
  

  //midi file goes here.
  handlePlayMidiAction = async(e) => {
    e.preventDefault()
    console.log('state', this.state.midiSelected)
    fs.readFileAssets(`midis/${this.state.midiSelected}`, 'base64')
    .then( res=>{
      console.log(res)
    })
    .catch( e => {
      console.log(e)
    })
  }

  render(){
     return(
      <ScrollView        
      style={{ flex: 1 }}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
        <WingBlank style={{ marginTop: 20, marginBottom: 5 }}>
          <Text style={{ marginBottom: 10 }}>Select your Midi file over here</Text>
        </WingBlank>
        <WingBlank style={{ marginBottom: 5 }}>
          <Flex>
            <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
              <Picker
                selectedValue={this.state.midiSelected}
                style={{height: 50}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({midiSelected: itemValue})
                }>
                {this.state.midiList.map( name=> {
                  return <Picker.Item label={name} value={name} key={name} />
                })}
              </Picker>
            </Flex.Item>
            <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
              <Button size="small" onPress={(e) => this.handlePlayMidiAction(e)}>Start Playing</Button>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </ScrollView>
    )
  }
}