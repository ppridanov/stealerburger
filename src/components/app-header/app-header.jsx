import React from 'react';
import appHeaderStyles from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, NavLink, useRouteMatch} from "react-router-dom";
import {useSelector} from "react-redux";

function AppHeader() {
  const {isAuth} = useSelector(state => state.userData);
  const isConstructor = !!useRouteMatch({ path: '/', exact: true});
  const isFeed = !!useRouteMatch('/feed');
  const isProfile = !!useRouteMatch('/profile');
  const isLogin = !!useRouteMatch('/login');
  const isIngredient = !!useRouteMatch({path: '/ingredients/:id'})
  return (
      <header className={`${appHeaderStyles.header} p-4`}>
        <div className="container">
          <nav className={appHeaderStyles.nav}>
            <ul className={appHeaderStyles.nav__menu}>
              <li className={`${appHeaderStyles.nav__item} pl-5 pr-5 pt-2 pb-2`}>
                <NavLink exact={true} to={"/"} activeClassName={appHeaderStyles.nav__linkActive}  className={`${appHeaderStyles.nav__link} ${isIngredient && appHeaderStyles.nav__linkActive} text text_type_main-default`}>
                  <BurgerIcon type={(isConstructor || isIngredient) ? "primary" : "secondary"} /><p>Конструктор</p>
                </NavLink>
              </li>
              <li className={`${appHeaderStyles.nav__item} pl-4 pr-4 pt-2 pb-2`}>
                <NavLink to={"/feed"} activeClassName={appHeaderStyles.nav__linkActive}  className={`${appHeaderStyles.nav__link} text text_type_main-default`}>
                  <ListIcon type={isFeed ? "primary" : "secondary"} /><p>Лента заказов</p>
                </NavLink>
              </li>
            </ul>
            <div className={appHeaderStyles.header__logo}>
              <Link to={`/`}>
                <Logo />
              </Link>
            </div>
            {isAuth ? (
                <NavLink to={"/profile"} activeClassName={appHeaderStyles.nav__linkActive} className={`${appHeaderStyles.login} text text_type_main-default pl-4 pr-4 pt-2 pb-2`}>
                  <ProfileIcon type={isProfile ? "primary" : "secondary"} /><span>Профиль</span>
                </NavLink>
            ) : (
                <NavLink to={"/login"} activeClassName={appHeaderStyles.nav__linkActive} className={`${appHeaderStyles.login} text text_type_main-default pl-4 pr-4 pt-2 pb-2`}>
                  <ProfileIcon type={isLogin ? "primary" : "secondary"} /><span>Личный кабинет</span>
                </NavLink>
            )}
          </nav>
        </div>
      </header>
  );
}



export default AppHeader;
