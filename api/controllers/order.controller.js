import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Stripe from "stripe";

export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);

  try {
    const product = await Product.findById(req.params.productID);

    await Product.findOneAndUpdate(
      { _id: req.params.productID },
      {
        $set: {
          sales: product.sales + 1,
        },
      }
    );
    res.status(200).send("Avatar change");
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.price * 100,
      currency: "sgd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const newOrder = new Order({
      productID: product._id,
      image: product.cover,
      title: product.title,
      buyerID: req.userID,
      sellerID: product.userID,
      price: product.price,
      payment_intent: paymentIntent.id,
    });

    await newOrder.save();
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error);
  }
};

// export const createOrder = async (req, res, next) => {
//     try {
//         const product = await Product.findById(req.params.productID)

//         const newOrder = new Order({
//             productID: product._id,
//             image: product.cover,
//             title: product.title,
//             buyerID: req.userID,
//             sellerID: product.userID,
//             price: product.price,
//             payment_intent: "temporary"
//         })

//         await newOrder.save();
//         res.status(200).send("create order ok")
//     } catch (error) {
//         next(error)
//     }

// }
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerID: req.userID } : { buyerID: req.userID }),
      isCompleted: true,
    });
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
};

export const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      { payment_intent: req.body.payment_intent },
      {
        $set: {
          isCompleted: true,
        },
      }
    );
    res.status(200).send("Order has been confirmed");
  } catch (error) {
    next(error);
  }
};
