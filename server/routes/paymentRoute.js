const router = require("express").Router();
const Payment = require("../models/paymentModal.js");
const Order = require("../models/orderModal.js");
const TempCart = require("../models/temoModel.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const Razorpay = require("razorpay");
const crypto = require("crypto");

router.post("/place-new-cart", authMiddleware, async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    const result =  await newPayment.save();

    res.send({
      success: true,
      message: "Order placed Successfully",
      data:result
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-cart-item", authMiddleware, async (req, res) => {
  try {
    const buyer = req.query.buyer;
    const product = req.query.product;

    const cartItem = await Payment.findOne({ product, buyer });
    if (!cartItem) {
      return res.status(203).send({ message: "empty", status: 203 });
    }
    return res.status(200).send({
      success: true,
      data: cartItem,
      status: 200,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-all-carts-by-id", authMiddleware, async (req, res) => {
  try {
    const buyer = req.query.buyer;
    const status = req.query.status;
    const cartitems = await Payment.find({ buyer: buyer, status: status })
      .populate("seller")
      .populate("product")
      .populate("buyer");
    if (!cartitems) {
      return res.status(203).send({ message: "empty", status: 203 });
    }
    return res.send({
      success: true,
      data: cartitems,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/delete-cart-item-by-id/:id", authMiddleware, async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Item Delete Successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.patch("/update-cart-item-by-id/:id",authMiddleware, async (req, res) => {
    try {
      const updatedItem = await Payment.findByIdAndUpdate(req.params.id, req.body);
      res.send({
        success: true,
        message: "Item Updated Successfully",
        data:updatedItem
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }
);

router.get("/get-cart-product-by-id/:id", authMiddleware, async (req, res) => {
  try {
    const Id = req.params.id;
    const cart_item = await Payment.findById(Id)
      .populate("seller")
      .populate("buyer")
      .populate("product");
    res.send({
      success: true,
      data: cart_item,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/paynow/order", authMiddleware, async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    if (!req.body) {
      res.status(400).send("Bad Request");
    }
    const { price } = req.body;
    const options = {
      amount: price * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };
    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(400).send("Bad Request");
    }
    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { razorpay_orderID, razorpay_paymentID, razorpay_signature } =
      req.body;
    const sign = razorpay_orderID + "|" + razorpay_paymentID;
    const resultSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === resultSign) {
      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment unsuccessfull",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

router.get("/getkey", authMiddleware, (req, res) => {
  return res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});

router.patch("/create-order", authMiddleware, async (req, res) => {
  try {
    const createOrder = new Order(req.body);
    createOrder.save();
    res.send({
      success: true,
      message: "Order Placed Successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Something Wrong...Contact Admin",
    });
  }
});

router.get(
  "/get-all-orders-by-user-id/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const buyerId = req.params.id;
      const orders = await Order.find({ buyer: buyerId })
        .populate("seller")
        .populate("product")
        .populate("buyer")
        .sort({ createdAt: -1 });
      res.send({
        success: true,
        message: "Orders fetched Successfully",
        data: orders,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }
);

router.post("/add-temp-cart", authMiddleware, async (req, res) => {
  try {
    const { items } = req.body;
    const response = new TempCart({ items });
    const result = await response.save();
    res.send({
      success: true,
      message: "Temp Order Successfully",
      data: result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-temp-cart-by-id/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const tempCartArray = await TempCart.findById(id)
      .populate({ path: "items.product", model: "products" })
      .populate({ path: "items.seller", model: "users" })
      .populate({ path: "items.buyer", model: "users" });
    res.send({
      success: true,
      message: "Fetch Successfully!",
      data: tempCartArray,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/delete-temp-by-id/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const deletetdItem = await TempCart.findByIdAndDelete(id);
    res.send({
      success: true,
      message: "Cart Deleted Successfully!",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
