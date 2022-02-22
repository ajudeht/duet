import 'preact/debug';

import './style';
import { h, render, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Provider, useDispatch, useSelector } from 'react-redux'
import { createStore} from 'redux'
import songApp from './store/song/song.js';
import { updateClips, updateTracks, setLEN, setBPM, setSIG } from './store/song/song.js';

import Timeline from "./components/timeline/Timeline";
import Song from './song.js';

const store = createStore(songApp);

let ns = new Song();

// console.log(ns);

function App(){
	const dispatch = useDispatch();
	const song = useSelector(state => state.song);
	
	let trackAdd = ()=>{
		ns.addTrack();
		dispatch(updateTracks(ns.tracks));
		dispatch(updateClips(ns.clips));
	}

	let trackDelete = (t)=>{
		ns.deleteTrack(t);
		dispatch(updateTracks(ns.tracks));
		console.log(t, ns.tracks);
	}

	let setLength = (l)=>{
		ns.setLen(l)
		dispatch(setLEN(ns.global.len));
		dispatch(updateClips(ns.clips));
		console.log(ns.global.len);
	}

	let onClipSelect = (id)=>{
		ns.setClipProps(id,"status","TEST");
		dispatch(updateClips(ns.clips));
		console.log(id);
	}
	
	useEffect(() => {
		dispatch(updateTracks(ns.tracks));
		dispatch(updateClips(ns.clips));
	});
	  
	return (
		<div>
		<h1>Hello, world!</h1>
		<button onClick={()=>{setLength(ns.global.len-1)}}>Shorten Length</button>
		<button onClick={()=>{setLength(ns.global.len+1)}}>Increase Length</button>
		
		<button onClick={()=>{trackAdd()}}>Add Track</button>
		<Timeline song={song} deleteCallback={trackDelete} onClipSelect={onClipSelect}></Timeline>
		</div>
	);
	
}

// class App extends Component{
	
//   render() {
//     return (
//       <div>
//         <h1>Hello, world!</h1>
// 		<button onClick={()=>{trackAdd()}}>Add Track</button>
// 		<Timeline song={ns}></Timeline>
//       </div>
//     );
//   }
// }

render(<Provider store={store}>
    <App />
  </Provider>, document.body);