import { NextResponse } from "next/server"
import { signToken } from "@/lib/auth"

const ADMIN_USER = process.env.ADMIN_USER
const ADMIN_PASS = process.env.ADMIN_PASS

export async function POST(req: Request) {
  const { username, password } = await req.json()

  // Validate credentials from env
  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    )
  }

  // Generate JWT for admin
  const token = await signToken({ role: "admin" })

  const res = NextResponse.json({ success: true, role: "admin" })

  res.cookies.set("auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  })

  return res
}
