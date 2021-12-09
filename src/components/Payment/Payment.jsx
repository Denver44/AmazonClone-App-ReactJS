import React, { useState, useEffect } from "react";
import CheckoutProdut from "../CheckoutProduct/CheckoutProduct";
import { useStateValue } from "../../StateProvider";
import "../Payment/Payment.css";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../Reducer";
import axios from "../axios/axios.js";
import { useHistory } from "react-router-dom";
import { db } from "../../firebase";
import HomeIcon from "@material-ui/icons/Home";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Roboto, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

function Payment() {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();

  const [succeeded, setSucceeded] = useState(false); // this is for any error occur
  const [processing, setProcessing] = useState(""); // this is for any error occur
  const [error, setError] = useState(null); // this is for any error occur
  const [disabled, setDisabled] = useState(true); // this is to disbale the button
  const [clientSecret, setClientSecret] = useState(true); // to get secret key as per the total.
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    // generate the Special Client Secret that allow to charge the person.
    // So everytime basket chnages we should create a new secret key.

    const getClientSecret = async () => {
      const data = {
        total: getBasketTotal(basket) * 100,
      };
      try {
        const response = await axios.post(`/payment/create`, data);
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    if (getBasketTotal(basket) >= 1) getClientSecret();
  }, [basket]);

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
        console.log(paymentIntent);
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
      })
      .catch(() => {
        setError(`Payment failed`);
        setProcessing(false);
      });
  };

  const handleChange = async (e) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <div className="payment__heading">
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
            <h3>Customer email-ID</h3>
          </div>
          <div className="customer__info">
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="customer__info">
            <p>Fake Street 123, </p>
            <p>Near ABC Tower, </p>
            <p>
              New Delhi, <strong>INDIA</strong>
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

            <form onSubmit={handleSubmit} id="payment-form">
              <CardElement
                id="card-element"
                options={cardStyle}
                onChange={handleChange}
              />
              <div className="payment__priceConatiner">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total : {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span id="button-text">
                    {processing ? (
                      <div className="spinner" id="spinner"></div>
                    ) : (
                      "Buy Now"
                    )}
                  </span>
                </button>
              </div>
              {error && (
                <div className="card-error" role="alert">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
