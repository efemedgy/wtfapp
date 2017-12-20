/**
 * @author Doğuşcan Namal
 * @version 20.12.2017
 */
import React from 'react';
import YouTube from 'react-youtube';

class YoutubePlayer extends React.Component {

    constructor(props){
        super(props);
        this._onPause = this._onPause.bind(this);
        this._onReady = this._onReady.bind(this);
    }

    render() {
        const opts = {
            height: '100%',
            width: '100%',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                controls:0,
                showCaptions:0,
                disableKeyboard:0,
                allowFullscreen:1,
                annotations:0,
                modestBranding:1,
                showInfo:0,
                volume:0.8
            },
            frameborder:0,
        };

        return (
            <YouTube
                className="App-player"
                videoId={this.props.videoId}
                opts={opts}
                onReady={this._onReady}
                onEnd={this._onEnd.bind(this)}
                onPause={this._onPause}
            />
        );
    }

    _onPause(event){
        this.props.onPause();
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        if(process.env.NODE_ENV === 'development'){
            console.log("Video is ready.")
            event.target.pauseVideo();
        }
        else{
            event.target.playVideo();
        }
        this.props.onReady();
    }

    _onEnd(event) {
        this.props.onEnd();
    }

}

export default YoutubePlayer;