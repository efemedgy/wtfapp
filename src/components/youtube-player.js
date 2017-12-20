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
                videoId={this.props.videoId}
                opts={opts}
                onReady={this._onReady}
                onEnd={this._onEnd.bind(this)}
            />
        );
    }

    _onReady(event) {
        console.log("_onReady")
        // access to player in all event handlers via event.target
        event.target.playVideo();
    }

    _onEnd(event) {
        console.log("_onEnd")
        this.props.onEnd();
        //event.target.pauseVideo();
    }

}

export default YoutubePlayer;