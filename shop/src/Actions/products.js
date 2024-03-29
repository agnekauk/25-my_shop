import { GET_PRODUCTS_FROM_SERVER, SORT_PRODUCTS, FILTER_PRICE, SHOW_PHOTO } from "../Constants/types";

export function getProductsFromServer(products) {
    return {
        type: GET_PRODUCTS_FROM_SERVER,
        payload: products
    }
}

export function sortProducts(sortType) {
    return {
        type: SORT_PRODUCTS,
        payload: sortType
    }
}

export function filterPrice(price) {
    return {
        type: FILTER_PRICE,
        payload: price
    }
}
export function filterShowPhoto(yes) {
    return {
        type: SHOW_PHOTO,
        payload: yes
    }
}