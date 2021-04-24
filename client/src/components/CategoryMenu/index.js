import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from '@apollo/react-hooks';

import { updateCurrentCategory, updateCategories } from '../../utils/actionCreators';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  const handleClick = (id) => {
    dispatch(updateCurrentCategory(id));
  };

  useEffect(() => {
    if (categoryData) {
      dispatch(updateCategories(categoryData.categories));
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch(updateCategories(categoryData.categories));
      });
    }
  }, [categoryData, loading, updateCategories]);

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

// const mapStateToProps = state => {
//   return {
//     categories: state.categories
//   };
// };

// const mapDispatchToProps = dispatch => ({
//   setCurrentCategory: (id) => dispatch(updateCurrentCategory(id)),
//   setCategories: (data) => dispatch(updateCategories(data))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(CategoryMenu);
export default CategoryMenu;
