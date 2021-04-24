import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  addToCart,
  updateCartQuantity,
} from '../../utils/actionCreators';
import { pluralize, idbPromise } from "../../utils/helpers"

const ProductItem = (props) => {
  const {
    cart,
    updateProductCartQuantity,
    addProductToCart,
    image,
    name,
    _id,
    price,
    quantity
  } = props;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);

    if (itemInCart) {
        updateProductCartQuantity({
          _id: _id,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        });
      // if we're updating quantity, use existing item data and increment purchaseQuantity value by one
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
        addProductToCart({ _id, image, name, price, purchaseQuantity: 1 });
      // if product isn't in the cart yet, add it to the current shopping cart in IndexedDB
      idbPromise('cart', 'put', { _id, image, name, price, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = dispatch => ({
  addProductToCart: (data) => dispatch(addToCart(data)),
  updateProductCartQuantity: (data) => dispatch(updateCartQuantity(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductItem);
