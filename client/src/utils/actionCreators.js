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

const addToCart = (data) => ({
  type: actions.ADD_TO_CART,
  payload: data
});

const updateCartQuantity = (data) => ({
  type: actions.UPDATE_CART_QUANTITY,
  payload: data
});

const removeFromCart = (data) => ({
  type: actions.REMOVE_FROM_CART,
  payload: data
});

export {
  updateProducts,
  updateCurrentCategory,
  updateCategories,
  addToCart,
  updateCartQuantity,
  removeFromCart,
};
