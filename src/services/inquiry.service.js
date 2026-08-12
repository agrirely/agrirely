import { connectDB } from "@/lib/db";
import Inquiry from "@/models/Inquiry";

export async function createInquiry({ type, payload }) {
  await connectDB();
  return Inquiry.create({ type, payload });
}

export async function listInquiries() {
  await connectDB();
  return Inquiry.find({}).sort({ createdAt: -1 }).lean();
}
