// /app/api/me/route.ts
import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie")
  const token = cookie
    ?.split("; ")
    .find((c) => c.startsWith("auth="))
    ?.split("=")[1]

  if (!token) return NextResponse.json({ role: "guest" })

  const decoded = await verifyToken(token)
  if (!decoded) return NextResponse.json({ role: "guest" })

  return NextResponse.json(decoded)
}
