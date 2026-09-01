import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

const DEFAULT_ADMIN_EMAIL = "AgriRely@admin.com";
const DEFAULT_ADMIN_PASSWORD = "Agrirely@123";

function getAdminCredentials() {
  return {
    email: (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).toLowerCase().trim(),
    password: process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD,
  };
}

/** Create or update the single admin account from env / defaults */
export async function ensureAdminUser() {
  await connectDB();
  const { email, password } = getAdminCredentials();
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.findOneAndUpdate(
    { email },
    {
      name: "AgriRely Admin",
      email,
      passwordHash,
      role: "admin",
    },
    {
      upsert: true,
      returnDocument: "after",
      setDefaultsOnInsert: true,
    }
  );

  return user;
}

export async function loginAdmin(email, password) {
  await connectDB();
  await ensureAdminUser();

  const normalized = String(email || "")
    .toLowerCase()
    .trim();
  const user = await User.findOne({ email: normalized, role: "admin" });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const ok = await bcrypt.compare(String(password || ""), user.passwordHash);
  if (!ok) {
    throw new Error("Invalid email or password");
  }

  return {
    id: String(user._id),
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

export async function logoutAdmin() {
  return { success: true };
}
