import * as actions from './actions';

const updateProducts = (products) => {
  return {
  type: actions.UPDATE_PRODUCTS,
  payload: products
}};

const updateCurrentCategory = (catId) => ({
  type: actions.UPDATE_CURRENT_CATEGORY,
  payload: catId
});

const updateCategories = (categories) => ({
  type: actions.UPDATE_CATEGORIES,
  payload: categories
});

const addToCart = (product) => ({
  type: actions.ADD_TO_CART,
  payload: product
});

const updateCartQuantity = (productData) => ({
  type: actions.UPDATE_CART_QUANTITY,
  payload: productData
});

const removeFromCart = (productId) => ({
  type: actions.REMOVE_FROM_CART,
  payload: productId
});

const toggleCart = () => ({
  type: actions.TOGGLE_CART,
});

const addMultipleToCart = (products) => ({
  type: actions.ADD_MULTIPLE_TO_CART,
  payload: products
});

export {
  updateProducts,
  updateCurrentCategory,
  updateCategories,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  toggleCart,
  addMultipleToCart,
};
