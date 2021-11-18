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
import {Feed} from "../../pages/feed/feed";
import {getIngredients} from "../../services/actions/burger-ingredients";
import {FeedDetails} from "../feed-details/feed-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch } from '../../hooks/store';
import { TLocationState } from '../../utils/types';

const App = () => {
  const history = useHistory();
  const location = useLocation<TLocationState>();
  const background = history.action === 'PUSH' && location.state && location.state.background;
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
          <Route path="/feed" exact={true}>
            <Feed/>
          </Route>
          <Route path={`/feed/:id`} exact={true}>
            <FeedDetails/>
          </Route>
          <ProtectedRoute path={"/profile"} exact={true}>
            <Profile/>
          </ProtectedRoute>
          <ProtectedRoute path={"/profile/orders/:id"} exact={true}>
            <FeedDetails/>
          </ProtectedRoute>
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
            <IngredientDetails/>
          </Route>
          <Route path={`*`}>
            <Page404/>
          </Route>
        </Switch>
        {background &&
        (<>
          <Route path={'/ingredients/:id'}
                 children={<Modal><IngredientDetails/></Modal>}/>
          <Route path={'/sendOrder'}
                 children={<Modal><OrderDetails/></Modal>}/>
          <Route path={'/feed/:id'}
                 children={<Modal><FeedDetails/></Modal>} />
          <Route path={'/profile/orders/:id'}
                 children={<Modal><FeedDetails/></Modal>} />
        </>)
        }
      </main>
    </div>
  );
}

export default App;