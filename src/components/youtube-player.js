/**
 * @author Doğuşcan Namal
 * @version 20.12.2017
 */
import React from 'react';
import YouTube from 'react-youtube';

class YoutubePlayer extends React.Component {
    render() {
        const opts = {
            height: '100%',
            width: '100%',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            },
            frameborder:0
        };

        return (
            <YouTube
                className="App-player"
                videoId={this.props.videoId}
                opts={opts}
                onReady={this._onReady}
                onEnd={this._onEnd.bind(this)}
                onClick={this._onClick}
            />
        );
    }

    _onClick(event){
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
    }

    _onEnd(event) {
        this.props.onEnd();
    }

}

export default YoutubePlayer;