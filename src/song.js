import shortid from 'shortid';

const DEFAULT_BPM = 120;
const DEFAULT_LEN = 8;
const DEFAULT_SIG = [4,4];

const DOES_PRELOAD_TRACK = true;

class Song{

	constructor(i) {
		const init = Object.assign({}, i);
		this.global = {
			bpm: init.bpm || DEFAULT_BPM,
			len: init.len || DEFAULT_LEN,
			sig: init.sig || DEFAULT_SIG
		}
		this.tracks = []
		this.clips = [];

		if (DOES_PRELOAD_TRACK){
			this.addTrack()
		}
	}

	addClip(t, index){
		const newClip = {
			id: shortid.generate(),
			track: t,
			index: index,
			author: null,
			status: "clear",
			url: null
		}
		this.clips.push(newClip);
		return newClip;
	}

	setClipProps(id, prop, value){
		this.clips = this.clips.map((c,i)=>{
			if(c.id==id){
				c[prop] = value;
			}
			return c;
		});
		return this;
	}

	setLen(length){
		console.log(this.global.len, length)
		if (this.global.len == length){
			// Same Length, No Change
		} else if (this.global.len > length){
			// New Length Shorter, Reduce Current Length
			this.tracks.map((t)=>{
				let affectedClips = t.clips.splice(length);
				// console.log(affectedClips);
				this.clips = this.clips.filter((c)=>(!affectedClips.includes(c.id)));
			})
			this.global.len = length;
		} else {
			this.tracks.map((t)=>{
				let loadClips = Array.from(Array(length - this.global.len),(n,i)=>this.addClip(t.id, i+this.global.len));
				t.clips = t.clips.concat(loadClips.map((c)=>c.id));
			})
			this.global.len = length;
		}
		return this;
	}

	addTrack(){
		const trackId = shortid.generate();
		
		const loadClips = Array.from(Array(this.global.len),(t,i)=>this.addClip(trackId, i));
		console.log(trackId);
		const newTrack = {
			id: trackId,
			name: "New Track",
			clips: loadClips.map((c)=>c.id)
		}
		console.log(loadClips);
		this.tracks.push(newTrack);

		return newTrack;
	}

	deleteTrack(id){
		this.tracks = this.tracks.filter((t)=>(t.id!==id));
		return this;
	}

}

export default Song;