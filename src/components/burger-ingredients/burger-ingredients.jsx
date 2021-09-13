import React from 'react';
import ingredientsStyles from './burger-ingredients.module.css';
import appStyles from '../app/app.module.css';
import Ingredient from "../ingredient/ingredient";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { ingredientsPropTypes } from "../../utils/data";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState('but');
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [modalData, setModalData] = React.useState({});
    const handleToggleModal = (e) => {
        const target = e.currentTarget;
        const id = target.getAttribute('_id');
        setModalData(props.ingredients.find((item) => item._id === id));
        setModalIsOpen(!modalIsOpen);
    }
    const handleTabClick = (value) => {
        setCurrent(value);
    }
    return (
        <>
            <div className={ingredientsStyles.constr}>
                <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
                <div style={{ display: 'flex' }} className='mt-5'>
                    <a className={appStyles.link} href="#buts">
                        <Tab value="but" active={current === 'but'} onClick={handleTabClick}>
                            Булка
                        </Tab>
                    </a>
                    <a className={appStyles.link} href="#sauces">
                        <Tab value="sauce" active={current === 'sauce'} onClick={handleTabClick}>
                            Соусы
                        </Tab>
                    </a>
                    <a className={appStyles.link} href="#mains">
                        <Tab value="main" active={current === 'main'} onClick={handleTabClick}>
                            Начинки
                        </Tab>
                    </a>
                </div>
                <div className={`${ingredientsStyles.ingredients} mt-10`}>
                    <div className={ingredientsStyles.products}>
                        <h3 className="text text_type_main-medium" id="buts">Булки</h3>
                        <div className={ingredientsStyles.products__cont}>
                            {props.ingredients.filter((item) => item.type === 'bun').map((item) => <Ingredient onOpen={handleToggleModal} {...item} key={item._id} />)}
                        </div>
                        <h3 className="text text_type_main-medium" id="sauces">Соусы</h3>
                        <div className={ingredientsStyles.products__cont}>
                            {props.ingredients.filter((item) => item.type === 'sauce').map((item) => <Ingredient onOpen={handleToggleModal} {...item} key={item._id} />)}
                        </div>
                        <h3 className="text text_type_main-medium" id="mains">Начинки</h3>
                        <div className={ingredientsStyles.products__cont}>
                            {props.ingredients.filter((item) => item.type === 'main').map((item) => <Ingredient onOpen={handleToggleModal} {...item} key={item._id} />)}
                        </div>
                    </div>
                </div>
            </div>
            {modalIsOpen && modalData &&
                <Modal onClose={handleToggleModal}>
                    <IngredientDetails data={modalData} />
                </Modal>
            }
        </>
    );

}
BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired
}

export default BurgerIngredients;
