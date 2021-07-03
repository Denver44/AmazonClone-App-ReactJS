import Header from "./components/Header/Header.jsx";
import Home from "./components/Home/Home.jsx";
import Orders from "./components/Orders/Orders.jsx";
import Checkout from "./components/Checkout/Checkout.jsx";
import Login from "./components/Login/Login.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import Payment from "./components/Payment/Payment.jsx";
import { loadStripe } from "@stripe/stripe-js"; // This is for the stripe
import { Elements } from "@stripe/react-stripe-js"; // This is for the stripe

const StripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
// Sign in to see examples pre-filled with your key.
const promise = loadStripe(StripePublicKey);

function App() {
  const [, dispatch] = useStateValue();
  useEffect(() => {
    // this is powerful listener it will alawsy listen when we login or signup. or logout.
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // the user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // user is logged out.
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route exact path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route exact path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/payment">
            {/* High Order function */}
            {/* wrapping the payment componet with the Elements  */}
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
