import * as types from '../constants/ActionTypes'

const midiStart = parsedMidi => ({
  type: types.MIDI_START_PLAYING,
  parsedMidi
})

export const midiStartPlaying = () => dispatch => {
  dispatch(midiStart)
}