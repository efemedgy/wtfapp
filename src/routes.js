/**
 * @author Doğuşcan Namal
 * @version 25.12.2017
 */
import React from "react";
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";
import {Redirect} from "react-router-dom";

import Home from './home'

export default () => (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/:videoUrl" component={Home}/>
        <Redirect from="*" to="/"/>
    </Switch>
)