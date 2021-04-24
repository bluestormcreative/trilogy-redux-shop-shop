import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useQuery } from '@apollo/react-hooks';

// import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from '../../utils/helpers';

function CategoryMenu({categories}) {
  // Custom hook calls the context, returns the state and dispatch to update state.
  // const [state, dispatch] = useStoreContext();
  // const { categories } = state;
  
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  const handleClick = (id) => {
    store.dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      payload: id
    });
  };

  useEffect(() => {
    if (categoryData) {
      store.dispatch({
        type: UPDATE_CATEGORIES,
        payload: categoryData.categories
      });
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories
        });
      });
    }
  }, [categoryData, loading, dispatch]);

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

export default connect(mapStateToProps)(CategoryMenu);
