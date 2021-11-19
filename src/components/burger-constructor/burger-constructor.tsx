import React, { useMemo } from 'react';
import constructorStyle from './burger-constructor.module.css';
import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ADD_BUN_TO_CONSTRUCTOR, ADD_INGREDIENT_TO_CONSTRUCTOR, CLEAR_CONSTRUCTOR } from "../../services/actions/burger-constructor";
import { CLEAR_ORDER_NUMBER, postOrder } from "../../services/actions/orders";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import BurgerConstructorIngredient from "../burger-constructor-item/burger-constructor-item";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from '../../hooks/store';
import { TConstructorIngredient } from '../../utils/types';

const BurgerConstructor: React.FC = () => {
  const { ingredients, bun, orderNumber, isAuth } = useSelector((state) => ({
    ingredients: state.burgerConstructor.ingredients,
    bun: state.burgerConstructor.bun,
    orderNumber: state.orderData.orderNumber,
    isAuth: state.userData.isAuth
  }));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const moveIngredient = (ingredient: TConstructorIngredient) => {
    if (ingredient.type === 'bun') {
      dispatch({
        type: ADD_BUN_TO_CONSTRUCTOR,
        item: { ...ingredient, uuid: uuidv4() }
      })
    } else {
      dispatch({
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        item: { ...ingredient, uuid: uuidv4() }
      })
    }

  }

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredients',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item: TConstructorIngredient) {
      moveIngredient(item);
    }
  });

  const handleOpenModal = () => {
    dispatch({
      type: CLEAR_ORDER_NUMBER
    })
    if (!bun) {
      return alert('Выберите булку');
    }
    if (!isAuth) {
      return history.push('/login');
    }

    const idsArr = [...ingredients.map((item) => item._id), bun._id, bun._id];
    dispatch(postOrder(idsArr));
    history.push({
      pathname: "/sendOrder",
      state: {
        background: location,
      },
    });
    orderNumber && dispatch({
      type: CLEAR_CONSTRUCTOR
    })
  }

  const totalPrice = useMemo(() => {
    let price = ingredients.reduce((acc, item) => {
      return item.price + acc;
    }, 0);
    bun && (price += bun.price * 2);
    return price;
  }, [ingredients, bun])

  return (
    <>
      <div ref={dropTarget} className={`${constructorStyle.constr} mt-25`}>
        <ul className={`${constructorStyle.list}`}>
          <li className={`${constructorStyle.item} ${isHover ? constructorStyle.item_isHovering : ''}`}>

            {bun ? (
              <ConstructorElement
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
                type="top"
                isLocked={true}
              />
            ) : (
              <div className={`${constructorStyle.nobun_top} text text_type_main-default`}>
                <p>Выберите булочку</p>
              </div>
            )}
          </li>
          <li className={`${constructorStyle.item} ${isHover ? constructorStyle.item_isHovering : ''}`}>
            <ul className={constructorStyle.list__scroll}
              style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: "flex-end" }}>
              {ingredients.map((item, idx: number) => {
                return <BurgerConstructorIngredient {...item} index={idx} key={item.uuid} />
              })}
            </ul>
          </li>
          <li className={`${constructorStyle.item} ${isHover ? constructorStyle.item_isHovering : ''}`}>
            {bun ? (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            ) : (
              <div className={`${constructorStyle.nobun_bottom} text text_type_main-default`}>
                <p>Выберите булочку</p>
              </div>
            )}
          </li>
        </ul>
        {(ingredients || bun) && (
          <div className={`${constructorStyle.order} mr-8`}>
            <div className={`${constructorStyle.total__price} mr-10`}>
              <span className="text text_type_digits-medium">{totalPrice}</span>
              <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="large" onClick={handleOpenModal}>
              Оформить заказ
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default BurgerConstructor;
