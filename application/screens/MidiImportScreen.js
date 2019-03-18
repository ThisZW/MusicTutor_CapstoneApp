import React, {Component} from 'react';
import { Text, ScrollView, Picker } from 'react-native';
import { Button, Flex, WhiteSpace, WingBlank } from '@ant-design/react-native';
//import { Orchestra } from '../react-orchestra/native'
import { parseMidi } from '../react-orchestra/native'

const fs = require('react-native-fs');

export default class MidiImport extends Component {

  constructor(){
    super()
    this.state = {
      midiSelected: null,
      midiList: [],
      playSong: false,
    }

    this.onMidiLoaded = this.onMidiLoaded.bind(this);
    this.onInstrumentsReady = this.onInstrumentsReady.bind(this);
  }

  componentDidMount = async() => {
    //console.log('midi', MIDI)
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

  loadMidi = (midiBase64) => {
    parseMidi(midiBase64, 'base64').then(res=>{
      console.log(res)
      this.setState({
        //set something
      })
    })
  }

  handlePlayMidiAction = async(e) => {
    e.preventDefault()
    //console.log('state', this.state.midiSelected)
    fs.readFileAssets(`midis/${this.state.midiSelected}`, 'base64')
    .then( res=>{
      this.loadMidi(res)
    })
    .catch( e => {
      console.log(e)
    })
  }

  //test for react-orchestra
  onMidiLoaded(parsedMidi) {
    console.warn(`Midi loaded ${JSON.stringify(parsedMidi, 2, 2)}. Loading instruments now ...`);
    return parsedMidi;
  }
  onInstrumentsReady(instruments) {
    console.warn(`Instruments ${JSON.stringify(instruments, 2, 2)} are loaded into memory and ready !`);
    this.setState({ play: true });
    return instruments;
  }
  onNotePlayed(noteName) {
    console.warn(`Note ${noteName} was played, optionally handle this event`);
  }
  //end

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