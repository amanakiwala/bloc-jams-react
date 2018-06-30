import React, { Component } from 'react';
import albumData from './../data/albums';


class Album extends Component {
	constructor(props) {
		super(props);
	 
	    const album = albumData.find( album => {
	    	return album.slug === this.props.match.params.slug
	    });

	    this.state = {
	    	album: album,
	    	
	    };

	    
	   
	    const songList =this.state.album.songs.map((x,index) => {
                       x.number=index+1;
                       return x;
                 	});
         

        this.setState.album = {
         	songList:songList
         }
         
     }

    
    render() {
		return (
           <section className="album">
             <section id="album-info">
               <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
               <div className="album-details">
                 <h1 id="album-title">{this.state.album.title}</h1>
                 <h2 className="artist">{this.state.album.artist}</h2>
                 <div id="release-info">{this.state.album.releaseInfo}</div>
               </div>
             </section>
             <table id="song-list">
               <colgroup>
               	<col id="song-number-colomn" />
               	<col id="song-title-colomn" />
               	<col id="song-duration-colomn" />
               </colgroup>
               <tbody>
               {this.setState.album.songList.map((song,index) => {
               	    return([
               		
               		<tr key={index}>{song.number} {song.title} {song.duration}</tr>
               			
               		])
               
               </tbody>
             	
             </table>
           </section>
			);
	}
}

export default Album;