import { rootReducer as reducer } from '../utils/reducers';

import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART
} from '../utils/actions';

// import our actions
import {
  updateProducts,
  updateCartQuantity,
  updateCurrentCategory,
  updateCategories,
  addToCart,
  addMultipleToCart,
  removeFromCart,
  toggleCart,
} from '../utils/actionCreators';

// create a sample of what our global state will look like
const initialState = {
  products: [],
  categories: [{ name: 'Food' }],
  currentCategory: '1',
  cart: [
    {
      _id: '1',
      name: 'Soup',
      purchaseQuantity: 1
    },
    {
      _id: '2',
      name: 'Bread',
      purchaseQuantity: 2
    }
  ],
  cartOpen: false
};

test('UPDATE_PRODUCTS', () => {
  let newState = updateProducts({
    type: UPDATE_PRODUCTS,
    payload: [{}, {}]
  });

  expect(newState.products.length).toBe(2);
  expect(initialState.products.length).toBe(0);
});

test('UPDATE_CATEGORIES', () => {
  let newState = updateCategories({
    type: UPDATE_CATEGORIES,
    payload: [{}, {}]
  });

  expect(newState.categories.length).toBe(2);
  expect(initialState.categories.length).toBe(1);
});

test('UPDATE_CURRENT_CATEGORY', () => {
  let newState = updateCurrentCategory({
    type: UPDATE_CURRENT_CATEGORY,
    payload: '2'
  });

  expect(newState.currentCategory).toBe('2');
  expect(initialState.currentCategory).toBe('1');
});

test('ADD_TO_CART', () => {
  let newState = addToCart({
    type: ADD_TO_CART,
    payload: { purchaseQuantity: 1 }
  });

  expect(newState.cart.length).toBe(3);
  expect(initialState.cart.length).toBe(2);
});

test('ADD_MULTIPLE_TO_CART', () => {
  let newState = addMultipleToCart({
    type: ADD_MULTIPLE_TO_CART,
    payload: [{}, {}]
  });

  expect(newState.cart.length).toBe(4);
  expect(initialState.cart.length).toBe(2);
});

test('REMOVE_FROM_CART', () => {
  let newState1 = removeFromCart({
    type: REMOVE_FROM_CART,
    payload: '1'
  });

  // cart is still open
  expect(newState1.cartOpen).toBe(true);

  // the second item should now be the first
  expect(newState1.cart.length).toBe(1);
  expect(newState1.cart[0]._id).toBe('2');

  let newState2 = removeFromCart(newState1, {
    type: REMOVE_FROM_CART,
    payload: '2'
  });

  // cart is empty and closed
  expect(newState2.cartOpen).toBe(false);
  expect(newState2.cart.length).toBe(0);

  expect(initialState.cart.length).toBe(2);
});

test('UPDATE_CART_QUANTITY', () => {
  let newState = updateCartQuantity(initialState, {
    type: UPDATE_CART_QUANTITY,
    payload: { _id: '1', purchaseQuantity: 3 },
  });

  expect(newState.cartOpen).toBe(true);
  expect(newState.cart[0].purchaseQuantity).toBe(3);
  expect(newState.cart[1].purchaseQuantity).toBe(2);

  expect(initialState.cartOpen).toBe(false);
});

test('CLEAR_CART', () => {
  let newState = clearCart({
    type: CLEAR_CART
  });

  expect(newState.cartOpen).toBe(false);
  expect(newState.cart.length).toBe(0);
  expect(initialState.cart.length).toBe(2);
});

test('TOGGLE_CART', () => {
  let newState = toggleCart({
    type: TOGGLE_CART
  });

  expect(newState.cartOpen).toBe(true);
  expect(initialState.cartOpen).toBe(false);

  let newState2 = toggleCart(newState, {
    type: TOGGLE_CART
  });

  expect(newState2.cartOpen).toBe(false);
});
