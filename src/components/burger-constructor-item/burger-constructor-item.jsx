import React from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import constructorStyle from "../burger-constructor/burger-constructor.module.css";
import {useDispatch} from "react-redux";
import {REMOVE_INGREDIENT_FROM_CONSTRUCTOR} from "../../services/actions/burger-constructor";

const BurgerConstructorIngredient =(props) => {
    const {_id, name, price, image, uuid} = props;
    const dispatch = useDispatch();
    const handleRemoveIngredient = () => {
        dispatch({
            type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
            id: uuid
        })
    }
    return (<li _id={_id} className={constructorStyle.item}>
        <div className="mr-2">
            <DragIcon type={"primary"}/>
        </div>
        <ConstructorElement
            text={name}
            price={price}
            thumbnail={image}
            handleClose={handleRemoveIngredient}
        />
    </li>)
}

BurgerConstructorIngredient.propTypes = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
}
export default BurgerConstructorIngredient;