import React, {createRef, SyntheticEvent, useEffect} from 'react';
import ingredientsStyles from './burger-ingredients.module.css';
import appStyles from '../app/app.module.css';
import Ingredient from "../ingredient/ingredient";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import {
    REMOVE_INGREDIENT_FROM_MODAL,
    SET_INGREDIENT_TO_MODAL
} from "../../services/actions/burger-ingredients";
import {TIngredient} from "../../types";

const BurgerIngredients = () => {
    const {ingredients, ingredientsRequest, ingredientsError, ingredientDetails}: any = useSelector<any>(state => state.burgerIngredients)
    const [current, setCurrent] = React.useState<string>('buns');
    const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);
    const scrollContRef = createRef<HTMLDivElement>();
    const bunsRef = createRef<HTMLDivElement>();
    const saucesRef = createRef<HTMLDivElement>();
    const mainsRef = createRef<HTMLDivElement>();
    const dispatch = useDispatch();

    const handleOpenModal = (e: SyntheticEvent) => {
        const id = e.currentTarget.getAttribute('id');
        dispatch({
            type: SET_INGREDIENT_TO_MODAL,
            item: ingredients.find((item: TIngredient) => item._id === id)
        })
        setModalIsOpen(true);
    }
    const handleCloseModal = () => {
        setModalIsOpen(false);
        dispatch({
            type: REMOVE_INGREDIENT_FROM_MODAL
        })
    }
    const handleTabClick = (value: string) => {
        setCurrent(value);
    }

    const handleScroll = (e: SyntheticEvent) => {
        const saucesContainer = saucesRef.current?.getBoundingClientRect();
        const mainsContainer = mainsRef.current?.getBoundingClientRect();
        const scrollContainer = scrollContRef.current;
        if (scrollContainer !== null && saucesContainer && mainsContainer) {
            if (scrollContainer.offsetTop - saucesContainer.top < 0) {
                setCurrent('buns');
            } else if (scrollContainer.offsetTop - mainsContainer.top < 0) {
                setCurrent('sauces');
            } else {
                setCurrent('mains');
            }
        }

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
                    <h1 className="text text_type_main-large mt-10 text_colo">Соберите бургер</h1>
                    <div style={{display: 'flex'}} className='mt-5'>
                        <a className={appStyles.link} href="#buns">
                            <Tab value="buns" active={current === 'buns'} onClick={handleTabClick}>
                                Булка
                            </Tab>
                        </a>
                        <a className={appStyles.link} href="#sauces">
                            <Tab value="sauces" active={current === 'sauces'} onClick={handleTabClick}>
                                Соусы
                            </Tab>
                        </a>
                        <a className={appStyles.link} href="#mains">
                            <Tab value="mains" active={current === 'mains'} onClick={handleTabClick}>
                                Начинки
                            </Tab>
                        </a>
                    </div>
                    <div className={`${ingredientsStyles.ingredients} mt-10`}>
                        <div className={ingredientsStyles.products} onScroll={handleScroll} ref={scrollContRef}>
                            <h3 className="text text_type_main-medium" ref={bunsRef} id="buns">Булки</h3>
                            <div className={ingredientsStyles.products__cont}>
                                {ingredients.filter((item: TIngredient) => item.type === 'bun').map((item: TIngredient) => <Ingredient
                                    onOpen={handleOpenModal} {...item} key={item._id}/>)}
                            </div>
                            <h3 className="text text_type_main-medium" ref={saucesRef} id="sauces">Соусы</h3>
                            <div className={ingredientsStyles.products__cont}>
                                {ingredients.filter((item: TIngredient) => item.type === 'sauce').map((item: TIngredient) => <Ingredient
                                    onOpen={handleOpenModal} {...item} key={item._id}/>)}
                            </div>
                            <h3 className="text text_type_main-medium" ref={mainsRef} id="mains">Начинки</h3>
                            <div className={ingredientsStyles.products__cont}>
                                {ingredients.filter((item: TIngredient) => item.type === 'main').map((item: TIngredient) => <Ingredient
                                    onOpen={handleOpenModal} {...item} key={item._id}/>)}
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
            {modalIsOpen && ingredientDetails && (
                <Modal onClose={handleCloseModal} title={'Детали ингредиента'}>
                    <IngredientDetails {...ingredientDetails}/>
                </Modal>)
            }
        </>
    );

}

export default BurgerIngredients;
