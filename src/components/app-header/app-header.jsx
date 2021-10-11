import React from 'react';
import appHeaderStyles from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";

function AppHeader() {
  return (
      <header className={`${appHeaderStyles.header} p-4`}>
        <div className="container">
          <nav className={appHeaderStyles.nav}>
            <ul className={appHeaderStyles.nav__menu}>
              <li className={`${appHeaderStyles.nav__item} pl-5 pr-5 pt-2 pb-2`}>
                <NavLink to={"/"} activeClassName={"text_color_primary"}  className={`${appHeaderStyles.nav__link} text text_type_main-default ${appHeaderStyles.active}`}>
                  <BurgerIcon type="primary" /><p>Конструктор</p>
                </NavLink>
              </li>
              <li className={`${appHeaderStyles.nav__item} pl-4 pr-4 pt-2 pb-2`}>
                <NavLink to={"/orders"} activeClassName={"text_color_primary"}  className={`${appHeaderStyles.nav__link} text text_type_main-default`}>
                  <ListIcon type="secondary" /><p>Лента заказов</p>
                </NavLink>
              </li>
            </ul>
            <div className={appHeaderStyles.header__logo}>
              <Logo />
            </div>
            <NavLink to={"/profile"} activeClassName={"text_color_primary"} className={`${appHeaderStyles.login} text text_type_main-default pl-4 pr-4 pt-2 pb-2`}>
              <ProfileIcon type={"secondary"} /><span>Личный кабинет</span>
            </NavLink>
          </nav>
        </div>
      </header>
  );
}



export default AppHeader;
