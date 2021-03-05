import React from "react";
import "./Checkout.css";
import "../Subtotal/Subtotal.css";
import Subtotal from "../Subtotal/Subtotal";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { useStateValue } from "../../StateProvider";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Laptops/INTEL/SFH/LFH--Learn--Banner--1500x200.jpg"
          alt="Amazon Ad"
        />
        <div>
          {/* <h3>Hello {user ? user.email.split("@", 1) : null}</h3> */}
          <h2 className="checkout__title"> Shopping Cart</h2>

          {/* here we have done the mapping of the items in the basket */}
          {basket.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              img={item.img}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
