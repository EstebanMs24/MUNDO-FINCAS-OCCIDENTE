import { NextRequest } from "next/server";
import { signToken, COOKIE_NAME } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      return Response.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    if (email !== adminEmail || password !== adminPassword) {
      return Response.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = await signToken({ email, role: "admin" });
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return Response.json({ success: true, email });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
