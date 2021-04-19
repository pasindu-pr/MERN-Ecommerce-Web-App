import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("EM1234567890", 7);

const orderSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(4),
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    products: [
      {
        name: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        image: {
          type: String,
          requried: true,
        },

        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],

    shippingAddress: {
      fName: { type: String },
      lName: { type: String },
      address1: { type: String, required: true },
      address2: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
    },

    productsTotalPrice: {
      type: Number,
      required: true,
    },

    shippingPrice: {
      type: Number,
      required: true,
    },

    shippingMethod: {
      type: String,
      required: true,
    },

    vat: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      required: true,
    },

    totalOrderPrice: {
      type: Number,
      required: true,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: {
      type: Date,
    },

    paymentDetails: {
      paymentId: { type: String },
      orderId: { type: String },
      orderPrice: { type: Number },
      recievedAmount: { type: Number },
      cardHolderName: { type: String },
      cardBrand: { type: String },
      recieptEmail: { type: String },
      status: { type: String },
    },

    isDelivered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
