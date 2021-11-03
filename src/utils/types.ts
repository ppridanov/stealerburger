import {Location} from 'history';

export type TIngredient = {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v?: number;
    _id: string;
    index: number;
}

export type TLocationState = {
    background?: Location;
    state?: Location;
    location: Location;
}

export type TConstructorIngredient = TIngredient & {
    onOpen: () => {},
    uuid: string;
}

export type TConstructorItemIngredient = TIngredient & {
    uuid: string;
}

export type TMoveCards = {
    dragIndex: number,
    hoverIndex: number
}

export type TIngredientDetailParams = {
    id: string
}

export type TFormData = {
    name: string,
    email: string,
    password: string
}