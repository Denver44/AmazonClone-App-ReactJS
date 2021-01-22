import React, { useState, useEffect } from "react";
import CheckoutProdut from "./CheckoutProduct";
import { useStateValue } from "../StateProvider";
import "../css/Payment.css";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer";
import axios from "./axios";
import { useHistory } from "react-router-dom";
import { db } from "./firebase";
import HomeIcon from "@material-ui/icons/Home";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

function Payment() {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();
  // Above two hooks for stripe.

  const [succeeded, setSucceeded] = useState(false); // this is for any error occur
  const [processing, setProcessing] = useState(""); // this is for any error occur
  const [error, setError] = useState(null); // this is for any error occur
  const [disabled, setDisabled] = useState(true); // this is to disbale the button
  const [clientSecret, setClientSecret] = useState(true); // to get secret key as per the total.

  useEffect(() => {
    // generate the Special Client Secret that allow to charge the person.
    // So everytime basket chnages we should create a new secret key.
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("the secret key is >>>> ", clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true); // once click buy now then block now it will show processing in button.

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <div className="payment__toptile">
          <HomeIcon
            fontSize="large"
            className="home__icon"
            onClick={(e) => {
              history.replace("/");
            }}
          />
          <h1> Checkout ({basket.length} items)</h1>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>Near Railway station </p>
            <p>
              New Delhi <strong>INDIA</strong>{" "}
            </p>
          </div>
        </div>

        {/* Review Items */}

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Item and Delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => {
              return (
                <CheckoutProdut
                  id={item.id}
                  title={item.title}
                  img={item.img}
                  price={item.price}
                  rating={item.rating}
                />
              );
            })}
          </div>
        </div>

        {/* Payment Method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* stripe funcionality */}

            <form onSubmit={handleSubmit}>
              {/* This handlesubmit for sub,it the payment */}
              <CardElement onChange={handleChange} />
              {/* This is for disabled and one is error. */}
              <div className="paymen__priceConatiner">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total : {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* if there is any Erro than oNly Show. */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
