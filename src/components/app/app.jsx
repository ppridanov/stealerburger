import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Home, Login, Register} from "../../pages";
import {ForgotPassword} from "../../pages/forgot-password/forgot-password";
import AppHeader from "../app-header/app-header";
import {ResetPassword} from "../../pages/reset-password/reset-password";
import {Profile} from "../../pages/profile/profile";
import {ProtectedRoute} from "../../hocs/protected-route";

function App() {
    return (
        <div>
            <Router>
                <AppHeader/>
                <main>
                    <Switch>
                        <Route path="/" exact={true}>
                            <Home/>
                        </Route>
                        <Route path="/login" exact={true}>
                            <Login/>
                        </Route>
                        <Route path={"/register"} exact={true}>
                            <Register/>
                        </Route>
                        <Route path={"/forgot-password"} exact={true}>
                            <ForgotPassword/>
                        </Route>
                        <Route path={"/reset-password"} exact={true}>
                            <ResetPassword/>
                        </Route>
                        <ProtectedRoute path={"/profile"} exact={true}>
                            <Profile/>
                        </ProtectedRoute>
                    </Switch>
                </main>
            </Router>

</div>
)
    ;
}


export default App;
