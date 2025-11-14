import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  // Delete JWT cookie
  res.cookies.set("auth", "", {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 0,
  });

  return res;
}
