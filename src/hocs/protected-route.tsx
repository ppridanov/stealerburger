import { Redirect, Route } from 'react-router-dom';
import React from "react";
import { useSelector } from '../hooks/store';

type TProtectedRouteProps = {
  exact?: boolean;
  path: string;
}

export const ProtectedRoute: React.FC<TProtectedRouteProps> = ({ children, exact, path }) => {
  const { isAuth } = useSelector((state) => state.userData);
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