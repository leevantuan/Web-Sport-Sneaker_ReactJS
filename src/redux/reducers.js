import data from "../data/data";

const initState = {
    products: data,
    search: "",
    cart: [],
    favorite: [],
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default rootReducer;