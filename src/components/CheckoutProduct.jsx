import React from "react";
import "../css/CheckoutProduct.css";
import { useStateValue } from "../StateProvider";

function CheckoutProdut({ id, title, img, rating, price, hideButton }) {
  const [, dispatch] = useStateValue();
  const removeItemFromBasket = () => {
    dispatch({
      type: "REMOVE_ITEM_FROM_BASKET",
      id: id,
    });
  };
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={img} alt={title} />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>&#8377;</small>
          <strong>{parseFloat(price).toFixed(2)}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => {
              return <p>⭐</p>;
            })}
        </div>
        {!hideButton && (
          <button onClick={removeItemFromBasket}>Remove From Basket</button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProdut;
