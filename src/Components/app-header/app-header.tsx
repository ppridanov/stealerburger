import React from 'react';
import appHeaderStyles from './app-header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

class AppHeader extends React.Component {
  constructor(props: object) {
    super(props);
  }
  render() {
    return (
        <>
          <header className={[appHeaderStyles.header, 'p-4'].join(' ')}>
            <div className="container">
              <nav className={appHeaderStyles.nav}>
                <ul className={appHeaderStyles.nav__menu}>
                  <li className={[appHeaderStyles.nav__item, 'pl-4 pr-4 pt-2 pb-2'].join(' ')}>
                    <a href='#' className={[appHeaderStyles.nav__link, 'text text_type_main-default', appHeaderStyles.active].join(' ')}>
                      <BurgerIcon type="primary" /><p>Конструктор</p>
                    </a>
                  </li>
                  <li className={[appHeaderStyles.nav__item, 'pl-4 pr-4 pt-2 pb-2'].join(' ')}>
                    <a href='#' className={[appHeaderStyles.nav__link, 'text text_type_main-default'].join(' ')}>
                      <ListIcon type="secondary" /><p>Лента заказов</p>
                    </a>
                  </li>              </ul>
                <div className={appHeaderStyles.header__logo}>
                  <Logo />
                </div>
                <a href="#" className={['text text_type_main-default pl-4 pr-4 pt-2 pb-2', appHeaderStyles.login].join(' ')}><ProfileIcon type={"secondary"} /><span>Личный кабинет</span></a>
              </nav>
            </div>
          </header>
        </>
    );
  }
}


export default AppHeader;
