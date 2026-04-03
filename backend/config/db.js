import mongoose from "mongoose";

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI;
  const dbName = process.env.MONGO_DB_NAME || "learningquest";

  if (!mongoUri) {
    throw new Error("MONGO_URI is not configured");
  }

  const connection = await mongoose.connect(mongoUri, {
    dbName,
    serverSelectionTimeoutMS: 10000,
  });

  console.log(`MongoDB connected: ${connection.connection.host}/${connection.connection.name}`);
}
