import * as actions from './actions';

const updateProducts = (data) => {
  return {
  type: actions.UPDATE_PRODUCTS,
  payload: data
}};

const updateCurrentCategory = (data) => ({
  type: actions.UPDATE_CURRENT_CATEGORY,
  payload: data
});

const updateCategories = (data) => ({
  type: actions.UPDATE_CATEGORIES,
  payload: data
});

const addItemToCart = (data) => ({
  type: actions.ADD_TO_CART,
  payload: data
});

const updateCartQuantity = (data) => ({
  type: actions.UPDATE_CART_QUANTITY,
  payload: data
});

const removeItemFromCart = (data) => ({
  type: actions.REMOVE_FROM_CART,
  payload: data
});

export {
  updateProducts,
  updateCurrentCategory,
  updateCategories,
  addItemToCart,
  updateCartQuantity,
  removeItemFromCart,
};
