import {
  MIDI_START_PLAYING,
  MIDI_STOP_PLAYING
} from '../constants/ActionTypes'

const initialState = {
  isPlaying: false,
  parsedMidi: []
}

const midi = (state = initialState, action) => {
  switch(action.type){
    case MIDI_START_PLAYING:
      return {
        ...state,
        parsedMidi: action.parsedMidi
      }
    case MIDI_STOP_PLAYING:
      return initialState
    default:
      return state
  }
}

export const getMidi = state => state

export default midi