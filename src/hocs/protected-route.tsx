import { Redirect, Route } from 'react-router-dom';
import {useSelector} from "react-redux";
import React from "react";
import {RootState} from "../types";

type TProtectedRouteProps = {
    exact?: boolean;
    path: string;
}

export const ProtectedRoute: React.FC<TProtectedRouteProps> = ({ children, exact, path }) => {
   const {isAuth} = useSelector((state: RootState) => state.userData);
    return (
        <Route
            exact={exact}
            path={path}
            render={({ location }) =>
                isAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}