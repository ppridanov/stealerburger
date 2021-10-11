import { Redirect, Route } from 'react-router-dom';
import {useSelector} from "react-redux";
import PropTypes, {object} from "prop-types";

export function ProtectedRoute({ children, ...rest }) {
   const {isAuth} = useSelector(state => state.user);

    return (
        <Route
            {...rest}
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

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    rest: PropTypes.object
}
