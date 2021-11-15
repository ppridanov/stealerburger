import React from "react";
import styles from "./profile.module.css";
import {ProfileForm} from "../../components/profile-form/profile-form";
import {ProfileMenu} from "../../components/profile-menu/profile-menu";
import {Route, Router, Switch, useRouteMatch} from "react-router-dom";
import {ProfileOrders} from "../../components/profile-orders/profile-orders";
import Modal from "../../components/modal/modal";
import {FeedDetails} from "../../components/feed-details/feed-details";

export function Profile() {
  const { path } = useRouteMatch();


    return (
      <>
        <div className="container">
          <div className={`${styles.profile__container} pr-5 pl-5`}>
            <ProfileMenu/>
            <div className={`${styles.profile__content}`}>
              <Switch>
                <Route path={`${path}/`} exact={true}>
                  <ProfileForm />
                </Route>
                <Route path={`${path}/orders`} exact={true}>
                  <ProfileOrders />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </>
    )
}