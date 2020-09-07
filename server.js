const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")

/**
 * Why do we need a back-end?
 * **************************
 * We want to process Stripe payments, in order to do so
 * we need to send a hidden key. Since we are never able
 * to send a hidden key from within the fron-end we need
 * a back-end that the user has no direct access to.
 */

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

// give me what we get back from require('stripe) the stripe library
// and immediately invoke it with the Stripe secret key
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// Express is a library that allows us to build an API server with less difficulty
const app = express()
// when deploying to Heroku, it sets up the process PORT automatically
const port = process.env.PORT || 5000
// this is a function that allows us, not to write the json conversion every time we need the json format
app.use(bodyParser.json())
// urlencode transforms invalid url chars into the correct format
app.use(bodyParser.urlencoded({ extended: true }))

// this enables cross origin requests
// localhost :3000 server :5000
// these are 2 different origins and are by default blocked
app.use(cors())

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")))

  app.get("*", function (req, res) {
    // send back our files to the client i.e. css, html, js
    // and include them all in our index.html file
    res.sendFile(path.join(__dirname, "client/build", "index.html"))
  })
}

// now start listening on port 5000 and if something goes wrong log an error to the console
app.listen(port, (error) => {
  if (error) throw error
  console.log("Server running on port " + port)
})

// this is the only route we need for stripe, to charge the customer
app.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "chf",
  }

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr })
    } else {
      res.status(200).send({ success: stripeRes })
    }
  })
})
