import React, {Component} from 'react';
import logo from './logo.svg';
import './components/App.css';
import firebase from 'firebase'
import YoutubePlayer from './components/youtube-player'
import config from './config'

require("firebase/firestore");

var wtfApp = firebase.initializeApp(config);

// You can retrieve services via the defaultApp variable...
var defaultStorage = wtfApp.storage();
var defaultDatabase = wtfApp.database();

// ... or you can use the equivalent shorthand notation
defaultStorage = firebase.storage();
defaultDatabase = firebase.database();

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            index: 0,
            wtfCount: 0,
            videoMode: false
        };
        this.onNextButtonClick = this.onNextButtonClick.bind(this);
        this.onWtfButtonClick = this.onWtfButtonClick.bind(this);
        this._onEnd = this._onEnd.bind(this);
        this._onPause = this._onPause.bind(this);
        this.incrementIndex = this.incrementIndex.bind(this);
        this._onReady = this._onReady.bind(this);
    }

    onNextButtonClick() {
        this.incrementIndex();
    }

    _onEnd() {
        this.incrementIndex();
    }

    _onPause(event) {
        this.incrementIndex();
    }

    incrementIndex() {
        let index = this.state.index;
        if ((index + 1) === this.state.data.length) index = -1;
        this.setState({index: index + 1, wtfCount: this.state.data[index + 1].wtfCount});
    }

    onWtfButtonClick() {
        const wtfCount = this.state.wtfCount;
        this.setState({wtfCount: wtfCount + 1});
    }

    componentWillMount() {
        var db = firebase.firestore();
        //console.log(db);
        db.collection("videos").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log("doc.data(): ", doc.data());
                let docData = doc.data();
                this.setState({data: [...this.state.data, docData]});
            });
        });
    }

    _onReady() {
        console.log("_onReady");
        const index = this.state.index;
        const length = this.state.data.length;
        let randomIndex = Math.floor(Math.random() * length);

        this.setState({videoMode: true, index: randomIndex})
    }

    openingContent = () => {
        return (
            <h1 className="App-title">WHAT THE FUCK DID I JUST WATCH</h1>
        )
    }

    render() {
        let data = this.state.data[this.state.index] ? this.state.data[this.state.index] : undefined;
        return (
            <div>
                <div className="App">
                    <header className="App-header">
                        {!this.state.videoMode && this.openingContent()}
                        {data &&
                        <YoutubePlayer videoId={data.url} onEnd={this._onEnd}
                                       onPause={this._onPause} onReady={this._onReady}/>}
                    </header>
                </div>
            </div>
        );

    }
}

// class YouTube extends Component {
//     render() {
//         let videoSrc = "https://www.youtube.com/embed/" +
//             this.props.video.url + "?autoplay=" +
//             this.props.autoplay + "&rel=" +
//             this.props.rel + "&modestbranding=" +
//             this.props.modest;
//         return (
//             <iframe className="player" type="text/html" width="100%" height="750px"
//                     id="yotubeFrame"
//                     src={videoSrc}
//                     frameborder="0"/>
//         );
//     }
// }

export default App;
