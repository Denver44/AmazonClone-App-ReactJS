if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

const express = require("express");
const cors = require("cors");
const StripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(StripeSecretKey);
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
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

// Listeners
app.listen(PORT, () => console.log(`listening the port at  ${PORT}`));
