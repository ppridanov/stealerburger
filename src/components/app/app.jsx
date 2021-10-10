import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Home, Login, Register} from "../../pages";
import {ForgotPassword} from "../../pages/forgot-password/forgot-password";
import AppHeader from "../app-header/app-header";

function App() {
    return (
        <div>
            <AppHeader />
            <main>
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
                        <Route path={"/forgot-password"} exact={true}>
                            <ForgotPassword />
                        </Route>
                    </Switch>
                </Router>
            </main>

        </div>
    );
}


export default App;
