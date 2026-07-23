"use client";

import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELEVERY_CHARGES, TAX } from "../lib/constant";

const Page = () => {
  const [cartStorage, setCartStorage] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartStorage(cart);
  }, []);

  const removeToCart = (id) => {
    const updatedCart = cartStorage.filter((item) => item._id !== id);

    setCartStorage(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const foodCharges = cartStorage.reduce(
  (total, item) => total + Number(item.price),
  0
);

const deliveryCharges = DELEVERY_CHARGES;
const tax = foodCharges*TAX/100;
const totalAmount = foodCharges + deliveryCharges + tax;
  return (
    <div>
      <CustomerHeader />

      <div className="container">
               {cartStorage.length > 0 ? (
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Food Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {cartStorage.map((item, index) => (
                <tr key={item._id || index}>
                  <td>
                    <img
                      src={item.img_path}
                      alt={item.name}
                      width="80"
                      height="80"
                    />
                  </td>

                  <td>{item.name}</td>

                  <td>{item.description}</td>

                  <td>₹{item.price}</td>

                  <td>
                    <button
                      onClick={() => removeToCart(item._id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h3>Your Cart is Empty</h3>
        )}
      </div>
<div className="total-wrapper">
  <h3>Bill Summary</h3>

  <div className="row">
    <span>Food Charges</span>
   <span>₹{foodCharges}</span>
  </div>

  <div className="row">
    <span>Tax</span>
   <span>₹{tax}</span>

  </div>

  <div className="row">
    <span>Delivery Charges</span>
  <span>₹{deliveryCharges}</span>
  </div>

  <hr />

  <div className="row total">
    <span>Total Amount</span>
  <span>₹{totalAmount}</span>
  </div>

  <button className="checkout-btn">
    Proceed to Checkout
  </button>
</div>
      <Footer />
    </div>
  );
};

export default Page;