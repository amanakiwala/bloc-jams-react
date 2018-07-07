import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';


class Album extends Component {
	constructor(props) {
		super(props);
	 
	    const album = albumData.find( album => {
	    	return album.slug === this.props.match.params.slug
	    });

	    this.state = {
	    	album: album,
	    	currentSong: album.songs[0],
	    	isPlaying: false,
	    	currentlyHoveredSong: null
	    };

	    this.audioElement = document.createElement('audio');
	    this.audioElement.src = album.songs[0].audioSrc;

	    
	   
	    const songList =this.state.album.songs.map((x,index) => {
                       x.number=index+1;
                       return x;
                 	});
         

        this.setState.album = {
         	songList:songList
         }
         

     }
    
    play() {
    	this.audioElement.play();
    	this.setState({ isPlaying: true});
    }
    
    pause() {
    	this.audioElement.pause();
    	this.setState({ isPlaying: false});
    }

    setSong(song) {
    	this.audioElement.src = song.audioSrc;
    	this.setState({ currentSong: song });
    }

    handleSongClick(song) {
    	const isSameSong = this.state.currentSong === song;
    	if (this.state.isPlaying && isSameSong) {
    		this.pause();
    	} else {
    		if (!isSameSong) { this.setSong(song);}
    		this.play();
    	}
    }

    handlePrevClick() {
    	const currentIndex = this.state.album.songs.findIndex(song =>this.state.currentSong === song);
    	const newIndex = Math.max(0, currentIndex - 1);
    	const newSong = this.state.album.songs[newIndex];
    	this.setSong(newSong);
    	this.play();
    }

    mOver(song){
    	this.setState({currentlyHoveredSong: song})
    }

    mOut(song){
    	this.setState({currentlyHoveredSong: null})
    }

    renderSong(song, index) {
    	let songContent = null;

    	if (this.state.isPlaying === true && this.state.currentSong === song) {
    		songContent = (<span className="ion-pause" ></span>);
    	} else if(this.state.currentlyHoveredSong === song){
    		songContent = (<span className="ion-play" ></span>);
    	}else {
    		songContent = song.number;
    	}

    	return([

		       <tr className="song" 
		           key={index} 
		           onClick={() => this.handleSongClick(song)} 
		           onMouseEnter={() => this.mOver(song)}

		           onMouseLeave={() => this.mOut(song)}><td>{songContent}</td><td>{song.title}</td><td>{song.duration}</td></tr>
             

          ])

		          

    }
    
   
	render() {
         console.log(this.state.currentlyHoveredSong)
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
               	<col id="song-number-colomn"/>
               	<col id="song-title-colomn"/>
               	<col id="song-duration-colomn"/>
               </colgroup>

               <tbody>
               {this.setState.album.songList.map(this.renderSong.bind(this))}
               </tbody>

               
               
             

             </table>

             <PlayerBar 
                 isPlaying={this.state.isPlaying} 
                 currentSong={this.state.currentSong}
                 handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                 handlePrevClick={() => this.handlePrevClick()}
                 />
           
           </section>
			);
	}
}

export default Album;