import React from "react";
import "../css/Product.css";
import { useStateValue } from "../StateProvider";

// here the usestate value is the hooks we made for us to add or remove item to the store.
// it has Two things one is state we can destructure it we will ge basket and user
// The second thing we get a dispatch

function Product({ id, title, img, rating, price }) {
  const [state, dispatch] = useStateValue();
  // console.log(state);
  // console.log(dispatch);

  const addToBasket = () => {
    return dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        img: img,
        price: price,
        rating: rating,
      },
    });
  };
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>&#8377;</small>
          <strong>{parseFloat(price).toFixed(2)}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => {
              return <p>⭐</p>;
            })}
        </div>
      </div>

      <img src={img} alt={title} />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
