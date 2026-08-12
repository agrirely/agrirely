import mongoose from "mongoose";

const PageContentSchema = new mongoose.Schema(
  {
    pageKey: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    // Flexible JSON — each page/section can have its own shape
    sections: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.models.PageContent ||
  mongoose.model("PageContent", PageContentSchema);
