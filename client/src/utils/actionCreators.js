import * as actions from './actions';

const updateProducts = (data) => {
  console.log('updateProducts data: ', data);
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

export {
  updateProducts,
  updateCurrentCategory,
  updateCategories
};
