import { combineReducers } from 'redux'
import midi, * as fromMidi from './midi'

export default combineReducers({
  midi
})

export const getMidi = state => 
  fromMidi.getMidi(state)