import { h, render, Component } from 'preact';

class Timeline extends Component {
  render() {
	//   console.log("song", this.props.song);
    return (
      <table>
		{
			this.props.song.tracks.map((t,tk)=>(
				<tr key={tk}>
					<td><button onClick={()=>{this.props.deleteCallback(t.id)}}>x</button>{t.name}</td>
					{
					this.props.song.clips.filter((c)=>(c.track==t.id)).map((c, ck)=>(
						<td key={ck} onClick={()=>{this.props.onClipSelect(c.id)}}>{c.status}</td>
					))
				}</tr>
			))
		}
	  </table>
    );
  }
}

export default Timeline;