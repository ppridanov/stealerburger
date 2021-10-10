import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Home, Login} from "../../pages";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact={true}>
                    <Home />
                </Route>
                <Route path="/login" exact={true}>
                    <Login />
                </Route>
            </Switch>
        </Router>
    );
}


export default App;
