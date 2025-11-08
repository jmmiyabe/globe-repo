import { NextResponse } from "next/server"

const API_KEY = process.env.NEXT_PUBLIC_METEOSOURCE_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing lat/lon" }, { status: 400 })
  }

  try {
    const res = await fetch(`https://api.meteosource.com/v1/free/point?lat=${lat}&lon=${lon}&sections=weather&timezone=Asia/Manila&key=${API_KEY}`)
    if (!res.ok) throw new Error("Failed to fetch from MeteoSource")
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500 })
  }
}
