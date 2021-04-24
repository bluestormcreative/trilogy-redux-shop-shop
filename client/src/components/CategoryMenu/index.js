import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useQuery } from '@apollo/react-hooks';

import { updateCurrentCategory, updateCategories } from '../../utils/actionCreators';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu({categories, setCurrentCategory, setCategories}) {  
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  const handleClick = (id) => {
    setCurrentCategory(id);
  };

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData.categories);
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        setCategories(categories);
      });
    }
  }, [categoryData, loading, setCategories]);

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

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => ({
  setCurrentCategory: (id) => dispatch(updateCurrentCategory(id)),
  setCategories: (data) => dispatch(updateCategories(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryMenu);
