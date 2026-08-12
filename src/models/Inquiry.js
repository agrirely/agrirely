import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["message", "careers", "quote", "supplier"],
      required: true,
    },
    payload: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: {},
    },
    status: {
      type: String,
      enum: ["new", "read", "archived"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Inquiry ||
  mongoose.model("Inquiry", InquirySchema);
