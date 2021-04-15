import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../utils/actions';
import { QUERY_PRODUCTS } from "../utils/queries";
import spinner from '../assets/spinner.gif'

function Detail() {
  const { id } = useParams();
  const [state, dispatch] = useStoreContext();

  const [currentProduct, setCurrentProduct] = useState({})

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products } = state;

  useEffect(() => {
    // if we already have products saved in global state, use those to find the one we want.
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));
    
    // otherwise, once the query data loads, set all the products in the global state (context)
    // that will trigger this to run again (because it's in the dependency array), which will set
    // the current product data to use in the component state.
    } else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });
    }
  }, [products, data, dispatch, id]); // will only run again if one of these changes

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">
            ← Back to Products
          </Link>

          <h2>{currentProduct.name}</h2>

          <p>
            {currentProduct.description}
          </p>

          <p>
            <strong>Price:</strong>
            ${currentProduct.price}
            {" "}
            <button>
              Add to Cart
            </button>
            <button>
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
    </>
  );
};

export default Detail;
