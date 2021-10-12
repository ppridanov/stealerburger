import React from 'react';
import {Switch, Route, useLocation, useHistory} from 'react-router-dom';
import {Home, Login, Register} from "../../pages";
import {ForgotPassword} from "../../pages/forgot-password/forgot-password";
import AppHeader from "../app-header/app-header";
import {ResetPassword} from "../../pages/reset-password/reset-password";
import {Profile} from "../../pages/profile/profile";
import {ProtectedRoute} from "../../hocs/protected-route";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {
    const history = useHistory();
    const location = useLocation();
    let background = history.action === 'PUSH' && location.state && location.state.background;
    console.log(background, "background");

    return (
        <div>
                <AppHeader/>
                <main>
                    <Switch location={background || location}>
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
                        <Route path={"/ingredients/:id"} exact={true}>
                            <IngredientDetails />
                        </Route>
                        <ProtectedRoute path={"/profile"} exact={true}>
                            <Profile/>
                        </ProtectedRoute>
                    </Switch>
                </main>
</div>
)
    ;
}


export default App;
