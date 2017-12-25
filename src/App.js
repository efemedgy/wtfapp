import React, {Component} from 'react';
import Routes from "./routes";
import Router from "react-router-dom/es/Router";
import history from './history'

class App extends Component {

    render() {
        return (
            <Router history={history}>
                <Routes/>
            </Router>
        )
    }
}

export default App;
