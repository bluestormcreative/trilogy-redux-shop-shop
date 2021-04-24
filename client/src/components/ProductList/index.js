import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from '@apollo/react-hooks';

import { updateProducts } from '../../utils/actionCreators';
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";

import ProductItem from "../ProductItem";
import spinner from "../../assets/spinner.gif"

function ProductList() {
  const products = useSelector(state => state.products);
  const currentCategory = useSelector(state => state.currentCategory);
  const dispatch = useDispatch();
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  
  useEffect(() => {
    if(data && data.length !== 0) {
      dispatch(updateProducts(data.products));
  
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
      // add else if to check if `loading` is undefined in `useQuery()` Hook
    } else if (!loading) {
      // since we're offline, get all of the data from the `products` indexeddb store
      idbPromise('products', 'get').then((products) => {
        // use retrieved data to set global state for offline browsing
        dispatch(updateProducts(products));
      });
    }
  }, [data, loading, updateProducts]);
  
  /**
   * Filter products by category.
   * 
   * @returns array
   */
  function filterProducts() {
    if (!currentCategory) {
      return products;
    }
  
    return products.filter(product => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
            {filterProducts().map(product => (
                <ProductItem
                  key= {product._id}
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                />
            ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      { loading ? 
      <img src={spinner} alt="loading" />: null}
    </div>
  );
}

export default ProductList;

