import { NextRequest, NextResponse } from "next/server";

const REQUEST_LIMIT_PER_MINUTE = 60;
const DELAY_MS = (60 / REQUEST_LIMIT_PER_MINUTE) * 1000 + 50; // ~1050ms per request

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface WeatherData {
  area: string;
  lat: number;
  lon: number;
  condition: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  alert: "critical" | "warning" | "safe";
}

async function fetchSingleWeather(
  lat: number,
  lon: number,
  area: string,
  apiKey: string
): Promise<WeatherData> {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const res = await fetch(weatherUrl);

  if (!res.ok) throw new Error(`Failed to fetch weather for ${area}. Status: ${res.status}`);

  const data = await res.json();
  const current = data.main || {};
  const wind = data.wind || {};
  const weather = data.weather?.[0] || {};

  let alert: WeatherData["alert"] = "safe";
  const precipitation = data.rain?.["1h"] || 0;
  const currentWindSpeed = wind.speed || 0;

  if (precipitation > 20 || currentWindSpeed > 40) alert = "critical";
  else if (precipitation > 5 || currentWindSpeed > 20) alert = "warning";

  return {
    area,
    lat,
    lon,
    condition: weather.description || "Unknown",
    temp: current.temp || 0,
    humidity: current.humidity || 0,
    windSpeed: currentWindSpeed,
    visibility: data.visibility ? data.visibility / 1000 : 0,
    alert,
  };
}

export async function GET(req: NextRequest) {
  const apiKey = process.env.NEXT_PUBLIC_OWM_API_KEY;
  if (!apiKey)
    return NextResponse.json({ error: "API Key not configured" }, { status: 500 });

  // ✅ Hardcoded barangay list with lat/lon
  const barangays = [
    { name: "Barangay 1", lat: 14.551, lon: 120.998 },
    { name: "Barangay 2", lat: 14.552, lon: 120.999 },
    // ... add all 201 barangays
  ];

  const results: WeatherData[] = [];

  for (const b of barangays) {
    try {
      const weather = await fetchSingleWeather(b.lat, b.lon, b.name, apiKey);
      results.push(weather);
    } catch (err) {
      console.error(`Error fetching weather for ${b.name}:`, err);
      results.push({
        area: b.name,
        lat: b.lat,
        lon: b.lon,
        condition: "Fetch Error",
        temp: 0,
        humidity: 0,
        windSpeed: 0,
        visibility: 0,
        alert: "warning",
      });
    }
    await delay(DELAY_MS);
  }

  // Fetch GeoJSON and attach weather to each polygon
  try {
    const geoRes = await fetch(`${req.nextUrl.origin}/Pasay.geojson`);
    if (!geoRes.ok) throw new Error("Failed to load Pasay GeoJSON");
    const pasayGeoJSON = await geoRes.json();

    pasayGeoJSON.features.forEach((feature: any) => {
      const brgyName = feature.properties.NAME_3; // match your hardcoded names
      const weather = results.find((w) => w.area === brgyName);
      feature.properties.weather = weather || null;
    });

    return NextResponse.json({ areas: results, geojson: pasayGeoJSON });
  } catch (err) {
    console.error("Failed to fetch GeoJSON:", err);
    return NextResponse.json({ areas: results });
  }
}
