import mongoose from "mongoose";

const SaleSchema = mongoose.Schema(
  {
    saleName: {
      type: String,
      required: true,
    },

    discountPrecentage: {
      type: Number,
      required: true,
    },

    isSaleRunning: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Sale = mongoose.model("Sale", SaleSchema);

export default Sale;
