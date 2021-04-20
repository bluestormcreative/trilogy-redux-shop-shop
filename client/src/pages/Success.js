import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

import Jumbotron from "../components/Jumbotron";

const Success = () => {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get'); // Get cart items from indexedDb.
      const products = cart.map((product) => product._id); // Create array of product ids.

      if (products.length) {
        const { data } = await addOrder({ variables: { products } }); // Use add_order mutation to save order.
        const productData = data.addOrder.products;
      
        productData.forEach((item) => {
          idbPromise('cart', 'delete', item); // Delete the ordered products from indexedDb.
        });
      }

      setTimeout(() => {
        window.location.assign(`http://localhost:3000/`);
      }, 3000);  
    }
  
    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>
          Thank you for your purchase!
        </h2>
        <h2>
          You will now be redirected to the homepage
        </h2>
      </Jumbotron>
    </div>
  );
};

export default Success;
