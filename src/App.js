import Header from "./components/Header.jsx";
import Home from "./components/Home";
import Orders from "./components/Orders";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./components/firebase";
import { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import Payment from "./components/Payment";
import { loadStripe } from "@stripe/stripe-js"; // This is for the stripe
import { Elements } from "@stripe/react-stripe-js"; // This is for the stripe

const promise = loadStripe(toString(process.env.STRIPE_PUBLIC_KEY));

// it keeps track who is login or not.
// means we are already login or logged out from last session so as the page render check that we are login or not.

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
