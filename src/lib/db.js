import dns from "dns";
import mongoose from "mongoose";

// Windows/local DNS often cannot resolve mongodb+srv SRV records.
// Do not change DNS on Vercel/Linux — it can break the build and runtime.
if (process.platform === "win32") {
  try {
    dns.setDefaultResultOrder("ipv4first");
    dns.setServers(["8.8.8.8", "1.1.1.1", ...dns.getServers()]);
  } catch {
    /* ignore */
  }
}

/** @type {{ conn: typeof mongoose | null, promise: Promise<typeof mongoose> | null }} */
const globalWithMongoose = global;

if (!globalWithMongoose._mongoose) {
  globalWithMongoose._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI in environment variables");
  }

  if (globalWithMongoose._mongoose.conn) {
    return globalWithMongoose._mongoose.conn;
  }

  if (!globalWithMongoose._mongoose.promise) {
    globalWithMongoose._mongoose.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
    });
  }

  try {
    globalWithMongoose._mongoose.conn =
      await globalWithMongoose._mongoose.promise;
  } catch (error) {
    globalWithMongoose._mongoose.promise = null;
    throw error;
  }

  return globalWithMongoose._mongoose.conn;
}
