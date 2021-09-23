import React, {createRef, useEffect} from 'react';
import ingredientsStyles from './burger-ingredients.module.css';
import appStyles from '../app/app.module.css';
import Ingredient from "../ingredient/ingredient";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/burger-ingredients";

function BurgerIngredients() {
    const {ingredients, ingredientsRequest, ingredientsError} = useSelector(state => state.burgerIngredients)
    const [current, setCurrent] = React.useState('buns');
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [modalData, setModalData] = React.useState({});
    const bunsRef = createRef();
    const saucesRef = createRef();
    const mainsRef = createRef();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

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

    const handleScroll = (e) => {
        const mainContainer = e.target.getBoundingClientRect();
        const bunsContainer = bunsRef.current.getBoundingClientRect();
        const saucesContainer = saucesRef.current.getBoundingClientRect();
        const mainsContainer = mainsRef.current.getBoundingClientRect();
        if (bunsContainer.top >= 0 && bunsContainer.bottom <= mainsContainer.height) {
            setCurrent('buns')
        } else if (saucesContainer.top >= 0 && saucesContainer.bottom <= mainsContainer.height) {
            setCurrent('sauces');
        } else if (mainsContainer.top >= 0 && mainContainer.bottom <= mainsContainer.height) {
            setCurrent('mains');
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
                    <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
                    <div style={{display: 'flex'}} className='mt-5'>
                        <a className={appStyles.link} href="#buns">
                            <Tab value="but" active={current === 'buns'} onClick={handleTabClick}>
                                Булка
                            </Tab>
                        </a>
                        <a className={appStyles.link} href="#sauces">
                            <Tab value="sauce" active={current === 'sauces'} onClick={handleTabClick}>
                                Соусы
                            </Tab>
                        </a>
                        <a className={appStyles.link} href="#mains">
                            <Tab value="main" active={current === 'mains'} onClick={handleTabClick}>
                                Начинки
                            </Tab>
                        </a>
                    </div>
                    <div className={`${ingredientsStyles.ingredients} mt-10`}>
                        <div className={ingredientsStyles.products} onScroll={handleScroll}>
                            <h3 className="text text_type_main-medium" id="buns">Булки</h3>
                            <div className={ingredientsStyles.products__cont} ref={bunsRef}>
                                {ingredients.filter((item) => item.type === 'bun').map((item) => <Ingredient
                                    onOpen={handleOpenModal} {...item} key={item._id}/>)}
                            </div>
                            <h3 className="text text_type_main-medium"  id="sauces">Соусы</h3>
                            <div className={ingredientsStyles.products__cont} ref={saucesRef}>
                                {ingredients.filter((item) => item.type === 'sauce').map((item) => <Ingredient
                                    onOpen={handleOpenModal} {...item} key={item._id}/>)}
                            </div>
                            <h3 className="text text_type_main-medium" id="mains">Начинки</h3>
                            <div className={ingredientsStyles.products__cont} ref={mainsRef}>
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
