const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HqDDgCPODJhZjnMIOn3op2BznD1vvTMfNf3FZCmqUIqD0kqWuIwQkFqSm9D8wSH2FuDmYNRPirLkYcSlqrxTTSo00hpN37wxI"
);

// API

// App config
const app = express();


// MiddleWares
app.use(cors({ origin: true }));
app.use(express.json());


// API Routes
app.get("/", (req, res) => res.status(200).send("Amazon-clone app Backend"));

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("Payment Request Received for amount >>> ", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "INR",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});



// listen Command
exports.api = functions.https.onRequest(app);

// http://localhost:5001/clone-80082/us-central1/api
