import { NextResponse } from "next/server";

// Ensure this key is available in your .env.local and the server was restarted
const API_KEY = process.env.OWM_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing lat/lon" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) {
        // ⚠️ NEW DEBUG LINE: Log the specific status code from OpenWeatherMap
        console.error("OWM API Request Failed. Status:", res.status); 
        
        // Also log the text response body, as it often contains the reason (e.g., "Invalid API key")
        const errorText = await res.text();
        console.error("OWM Error Response Body:", errorText);

        // Throwing the error sends the 500 status back to the client
        throw new Error("Failed to fetch from OpenWeatherMap");
    }

    const data = await res.json();
    
    const precipitationValue = data.rain ? data.rain["1h"] || 0 : 0;

    const transformedData = {
      current: {
        condition: data.weather[0].main,
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        wind_speed: Math.round(data.wind.speed * 3.6), 
        visibility: data.visibility / 1000, 
        precipitation: precipitationValue,
      },
    };

    return NextResponse.json(transformedData);
  } catch (err) {
    // This catches the thrown error and returns the 500 to the client
    return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500 });
  }
}