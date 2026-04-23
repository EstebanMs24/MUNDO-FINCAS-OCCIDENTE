import { NextRequest } from "next/server";
import { COOKIE_NAME } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Logout failed" }, { status: 500 });
  }
}
