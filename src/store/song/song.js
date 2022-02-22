import { combineReducers } from 'redux';
const UPDATE_TRACKS = 'UPDATE_TRACKS';
const UPDATE_CLIPS = 'UPDATE_CLIPS';
const SET_BPM = 'SET_BPM';
const SET_LEN = 'SET_LEN';
const SET_SIG = 'SET_SIG';

const initialState = {
	global: {
		bpm: 120,
		len: 8,
		sig: [4,4]
	},
	tracks: [],
	clips: []
  }

export function updateTracks(tracks) {
  return {
    type: UPDATE_TRACKS,
    tracks
  }
}

export function updateClips(clips) {
	return {
	  type: UPDATE_CLIPS,
	  clips
	}
}

export function setBPM(bpm) {
	return {
	  type: SET_BPM,
	  bpm
	}
}

export function setLEN(len) {
	return {
	  type: SET_LEN,
	  len
	}
}

export function setSIG(sig) {
	return {
	  type: SET_SIG,
	  sig
	}
}

function song(state = initialState, action) {
	switch (action.type) {
		case UPDATE_TRACKS:
		return {
			global: state.global,
			tracks: action.tracks,
			clips: state.clips
		};
		case UPDATE_CLIPS:
			return {
				global: state.global,
				tracks: state.tracks,
				clips: action.clips
			};
		case SET_BPM:
			return {
				global: {
					bpm: action.bpm,
					len: state.global.len,
					sig: state.global.sig
				},
				tracks: state.tracks,
				clips: state.clips
			};
		case SET_LEN:
			return {
				global: {
					bpm: state.global.bpm,
					len: action.len,
					sig: state.global.sig
				},
				tracks: state.tracks,
				clips: state.clips
			};
		case SET_SIG:
			return {
				global: {
					bpm: state.global.bpm,
					len: state.global.len,
					sig: action.sig
				},
				tracks: state.tracks,
				clips: state.clips
			};
		default:
			return state;
	}
}

const songApp = combineReducers(
	{song}
  );
  
  export default songApp;