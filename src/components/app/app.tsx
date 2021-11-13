import React, {useEffect} from 'react';
import {Switch, Route, useLocation, useHistory} from 'react-router-dom';
import {Home, Login, Register} from "../../pages";
import {ForgotPassword} from "../../pages/forgot-password/forgot-password";
import AppHeader from "../app-header/app-header";
import {ResetPassword} from "../../pages/reset-password/reset-password";
import {Profile} from "../../pages/profile/profile";
import {ProtectedRoute} from "../../hocs/protected-route";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {Page404} from "../../pages/page-404/page-404";
import { TLocationState } from '../../types';
import {useDispatch} from "react-redux";
import {getIngredients} from "../../services/actions/burger-ingredients";

function App() {
    const history = useHistory();
    const location = useLocation<TLocationState>();
    let background = history.action === 'PUSH' && location.state && location.state.background;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);
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
                        <Route path={`*`}>
                            <Page404 />
                        </Route>
                    </Switch>
                </main>
</div>
)
    ;
}


export default App;
