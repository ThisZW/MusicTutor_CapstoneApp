import {
  midiToObject,
} from './MusicManager';

const parseMidi = async (midiSource, midiSourceType) => {
  if(midiSource){
    const metaAndTracks = await midiToObject(midiSource, midiSourceType);
    return metaAndTracks;
  }
};

export default parseMidi