import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import {
  updateProducts,
  addToCart,
  updateCartQuantity,
  removeFromCart,
} from '../utils/actionCreators';

import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";

// import Cart from '../components/Cart';
import spinner from '../assets/spinner.gif'

const Detail = ({
  products,
  loadProducts,
  updateProductCartQuantity,
  addProductToCart,
  removeProductFromCart,
  cart,
}) => {
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({})
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));
    } 
    // retrieved from server
    else if (data) {
      loadProducts(data.products);
  
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        loadProducts(data.products);
      });
    }
  }, [products, data, loading, loadProducts, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);

    if (itemInCart) {
        updateProductCartQuantity({
          _id: id,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        });
      // if we're updating quantity, use existing item data and increment purchaseQuantity value by one
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
        addProductToCart({ ...currentProduct, purchaseQuantity: 1 });
      // if product isn't in the cart yet, add it to the current shopping cart in IndexedDB
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    removeProductFromCart(currentProduct._id);

    // upon removal from cart, delete the item from IndexedDB using the `currentProduct._id` to locate what to remove
    idbPromise('cart', 'delete', { ...currentProduct });
  };

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
            <button onClick={addToCart}>
              Add to Cart
            </button>
            <button
              disabled={!cart.find(p => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
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
      {/* <Cart /> */}
    </>
  );
};

const mapStateToProps = state => {
  return {
    products: state.products,
    cart: state.cart,
  };
};

const mapDispatchToProps = dispatch => ({
  loadProducts: (data) => dispatch(updateProducts(data)),
  addProductToCart: (data) => dispatch(addToCart(data)),
  updateProductCartQuantity: (data) => dispatch(updateCartQuantity(data)),
  removeProductFromCart: (data) => dispatch(removeFromCart(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);
