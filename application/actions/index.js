import * as types from '../constants/ActionTypes'

const midiStart = (parsedMidi) => ({
  type: types.MIDI_START_PLAYING,
  parsedMidi
})

export const midiStartPlaying = (parsedMidi) => (dispatch, getState) => {
  dispatch(midiStart(parsedMidi))
}
