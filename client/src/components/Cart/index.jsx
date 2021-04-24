import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLazyQuery } from '@apollo/react-hooks';
import { loadStripe } from '@stripe/stripe-js';
import Auth from '../../utils/auth';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { toggleCart, addMultipleToCart } from '../../utils/actionCreators';
import { idbPromise } from "../../utils/helpers";
import CartItem from '../CartItem';

import './style.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = (props) => {
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT); // Hook is not called on render, but on user action.

  const {
    addMultipleProductsToCart,
    toggleCartOpen,
    cart,
    cartOpen,
  } = props;

  useEffect(() => {
    async function getCart() {
      const storedCart = await idbPromise('cart', 'get');
      addMultipleProductsToCart([...storedCart]);
    };
  
    if (!cart.length) {
      getCart();
    }
  }, [cart.length, addMultipleProductsToCart]);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  const calculateTotal = () => {
    let sum = 0;
    cart.forEach(item => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];
  
    cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds }
    });
  }

  if (!cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCartOpen}>
        <span
          role="img"
          aria-label="trash">🛒</span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCartOpen}>[close]</div>
      <h2>Shopping Cart</h2>
      {cart.length ? (
        <div>
            {cart.map((item) => (
              <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>
            {
              Auth.loggedIn() ?
                <button onClick={submitCheckout}>
                  Checkout
                </button>
                :
                <span>(log in to check out)</span>
            }
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cart: state.cart,
    cartOpen: state.cartOpen,
  };
};

const mapDispatchToProps = dispatch => ({
  toggleCartOpen: () => dispatch(toggleCart()),
  addMultipleProductsToCart: (data) => dispatch(addMultipleToCart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
