import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & { booknookMongo?: MongoClient };
const client = globalForMongo.booknookMongo ?? new MongoClient(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/booknook");
if (!globalForMongo.booknookMongo) globalForMongo.booknookMongo = client;
const database = client.db("booknook");

export const auth = betterAuth({
  database: mongodbAdapter(database),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: { enabled: true, minPasswordLength: 6 },
  socialProviders: process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? {
    google: { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }
  } : {},
  trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:3000"],
});
