import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Home, Login, Register} from "../../pages";

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
                <Route path={"/register"} exact={true}>
                    <Register />
                </Route>
            </Switch>
        </Router>
    );
}


export default App;
