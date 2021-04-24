import React from 'react';
import { connect } from 'react-redux';
import { removeFromCart, updateCartQuantity } from '../../utils/actionCreators';
import { idbPromise } from "../../utils/helpers";

const CartItem = ({
  item,
  removeProductFromCart,
  updateProductCartQuantity,
}) => {
  const onChange = (e) => {
    const value = e.target.value;
  
    if (value === '0') {
      removeProductFromCart({ _id: item._id });
      idbPromise('cart', 'delete', { ...item });
    } else {
      updateProductCartQuantity({
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
    
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  const removeFromCart = () => {
    removeProductFromCart({ _id: item._id });
    idbPromise('cart', 'delete', { ...item });
  };

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={removeFromCart}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    cartOpen: state.cartOpen,
  };
};

const mapDispatchToProps = dispatch => ({
  updateProductCartQuantity: (data) => dispatch(updateCartQuantity(data)),
  removeProductFromCart: (data) => dispatch(removeFromCart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
