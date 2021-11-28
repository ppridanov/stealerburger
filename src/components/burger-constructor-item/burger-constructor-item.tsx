import React, { useRef } from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyle from "../burger-constructor/burger-constructor.module.css";
import { MOVE_INGREDIENT_IN_CONSTRUCTOR, REMOVE_INGREDIENT_FROM_CONSTRUCTOR } from "../../services/actions/burger-constructor";
import { useDrag, useDrop } from "react-dnd";
import { TConstructorItemIngredient, TIngredient } from "../../utils/types";
import { useDispatch } from '../../hooks/store';

const BurgerConstructorIngredient: React.FC<TConstructorItemIngredient> = (props) => {
  const { index, _id, name, price, image, uuid } = props;
  const dispatch = useDispatch();
  const handleRemoveIngredient = () => {
    dispatch({
      type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      id: uuid
    })
  }

  const ref = useRef<HTMLLIElement>(null);

  const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
    dispatch({
      type: MOVE_INGREDIENT_IN_CONSTRUCTOR,
      dragIndex,
      hoverIndex
    })
  }

  const [{ isDragging }, drag] = useDrag({
    type: 'sortable',
    item: () => {
      return { _id, name, price, image, uuid, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  const [, drop] = useDrop({
    accept: 'sortable',
    hover(item: TIngredient, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      //Как типизировать clientOffset?
      const clientOffset: any = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCardHandler(dragIndex, hoverIndex);
      item.index = hoverIndex
    },
  });

  drag(drop(ref))

  return (<li style={{ opacity: opacity }} className={constructorStyle.item} ref={ref} id={_id}>
    <div className="mr-2" style={{ cursor: 'pointer' }}>
      <DragIcon type={"primary"} />
    </div>
    <ConstructorElement
      text={name}
      price={price}
      thumbnail={image}
      handleClose={handleRemoveIngredient}
    />
  </li>)
}

export default BurgerConstructorIngredient;