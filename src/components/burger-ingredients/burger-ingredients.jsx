import React, {useEffect} from 'react';
import ingredientsStyles from './burger-ingredients.module.css';
import appStyles from '../app/app.module.css';
import Ingredient from "../ingredient/ingredient";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/burger-ingredients";

function BurgerIngredients() {
    const {ingredients, ingredientsRequest, ingredientsError} = useSelector(state => state.burgerIngredients);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);
    const [current, setCurrent] = React.useState('but');
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [modalData, setModalData] = React.useState({});

    const handleOpenModal = (e) => {
        const target = e.currentTarget;
        const id = target.getAttribute('_id');
        setModalData(ingredients.find((item) => item._id === id));
        setModalIsOpen(true);
    }
    const handleCloseModal = () => {
        setModalIsOpen(false);
    }
    const handleTabClick = (value) => {
        setCurrent(value);
    }

    return (
        <>
            {ingredientsRequest && !ingredientsError && (
                <h1>Идет загрузка...</h1>
            )}
            {ingredientsError && !ingredientsRequest && (
                <h1>Произошла ошибка попробуйте позже</h1>
            )}
            {!ingredientsError && !ingredientsRequest && ingredients.length > 0 && (
                <div className={ingredientsStyles.constr}>
                    <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
                    <div style={{display: 'flex'}} className='mt-5'>
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
                                {ingredients.filter((item) => item.type === 'bun').map((item) => <Ingredient
                                    onOpen={handleOpenModal} {...item} key={item._id}/>)}
                            </div>
                            <h3 className="text text_type_main-medium" id="sauces">Соусы</h3>
                            <div className={ingredientsStyles.products__cont}>
                                {ingredients.filter((item) => item.type === 'sauce').map((item) => <Ingredient
                                    onOpen={handleOpenModal} {...item} key={item._id}/>)}
                            </div>
                            <h3 className="text text_type_main-medium" id="mains">Начинки</h3>
                            <div className={ingredientsStyles.products__cont}>
                                {ingredients.filter((item) => item.type === 'main').map((item) => <Ingredient
                                    onOpen={handleOpenModal} {...item} key={item._id}/>)}
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
            {modalIsOpen && modalData && (
                <Modal onClose={handleCloseModal} title={'Детали ингредиента'}>
                    <IngredientDetails data={modalData}/>
                </Modal>)
            }
        </>
    );

}

export default BurgerIngredients;
