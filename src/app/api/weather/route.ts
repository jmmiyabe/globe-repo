// src/app/api/weather/route.ts
import { NextResponse } from 'next/server';

const LAT = 14.5378; 
const LON = 121.0014;

export async function GET() {
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const BASE_URL = process.env.OPENWEATHER_BASE_URL;

  if (!API_KEY || !BASE_URL) {
    return NextResponse.json(
      { error: 'API key or base URL is not configured.' },
      { status: 500 }
    );
  }

  const url = `${BASE_URL}/onecall?lat=${LAT}&lon=${LON}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 600, 
      },
    });

    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Weather API fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}