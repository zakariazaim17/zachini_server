import Orders from "../models/order.js";

export const getOrdersByBuyerId = async (req, res) => {
  try {
    const orders = await Orders.find({
      buyer_id: req.params.buyer_id,
    });
    res.status(200).json(orders);
  } catch (e) {
    console.log("error", e);
    res.status(500).json("Could not get orders by buyer id");
  }
};

export const getOrdersByCategory = async (req, res) => {
  try {
    const orders = await Orders.aggregate([
      {
        $match: {
          $and: [
            { buyer_id: req.params.buyer_id },
            { order_category: req.params.order_category?.toUpperCase() },
          ],
        },
      },
    ]);

    res.status(200).json(orders);
  } catch (e) {
    console.log("error:", e);
    req.status(500).json("could not get orders by category");
  }
};

export const getOrdersByPurchase_date = async (req, res) => {
  try {
    const orders = await Orders.aggregate([
      {
        $match: {
          $and: [
            { buyer_id: req.params.buyer_id },
            { order_date: req.params.order_date },
          ],
        },
      },
    ]);
  } catch (e) {}
};

export const createOrder = async (req, res) => {
  try {
    const newOrder = new Orders({
      ...req.body,
    });

    newOrder.save();
    res.status(200).json(newOrder);
  } catch (e) {
    console.log("error", e);
    res.status(500).json("could not create an order");
  }
};
