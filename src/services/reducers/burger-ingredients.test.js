import {burgerIngredientsReducer, initialState} from '../reducers/burger-ingredients'
import {GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS} from "../actions/burger-ingredients";

const result = [{
    calories: 643,
    carbohydrates: 85,
    fat: 26,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    name: "Флюоресцентная булка R2-D3",
    price: 988,
    proteins: 44,
    type: "bun",
    __v: 0,
    _id: "60d3b41abdacab0026a733c7"
}, {
    calories: 3377,
    carbohydrates: 420,
    fat: 48,
    image: "https://code.s3.yandex.net/react/code/cheese.png",
    image_large: "https://code.s3.yandex.net/react/code/cheese-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/cheese-mobile.png",
    name: "Сыр с астероидной плесенью",
    price: 4142,
    proteins: 84,
    type: "main",
    __v: 0,
    _id: "60d3b41abdacab0026a733d4"
}, {
    calories: 2674,
    carbohydrates: 300,
    fat: 800,
    image: "https://code.s3.yandex.net/react/code/meat-04.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    name: "Говяжий метеорит (отбивная)",
    price: 3000,
    proteins: 800,
    type: "main",
    __v: 0,
    _id: "60d3b41abdacab0026a733ca"
}]

describe('burger-ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(burgerIngredientsReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(
            burgerIngredientsReducer(initialState, {type: GET_INGREDIENTS_REQUEST})
        ).toEqual({...initialState, ingredientsRequest: true, ingredientsFailed: false, ingredients: []})
    })

    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(
            burgerIngredientsReducer(initialState, {type: GET_INGREDIENTS_FAILED})
        ).toEqual({...initialState, ingredientsFailed: true, ingredientsRequest: false, ingredients: []})
    })
    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(
            burgerIngredientsReducer(initialState, {
                type: GET_INGREDIENTS_SUCCESS, ingredients: result
            })).toEqual({...initialState, ingredientsFailed: false, ingredientsRequest: false, ingredients: result})
    })
})