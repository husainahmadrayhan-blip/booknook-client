import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const secret = process.env.JWT_SECRET;
  if (!secret) return NextResponse.json({ message: "JWT_SECRET is not configured." }, { status: 500 });
  const token = jwt.sign({ email: session.user.email, name: session.user.name, sub: session.user.id }, secret, { expiresIn: "15m", issuer: "booknook-web", audience: "booknook-api" });
  return NextResponse.json({ token });
}
