// src/hooks/useWeather.ts
'use client'; 

import useSWR from 'swr';

interface WeatherData {
  current: {
    temp: number;
    weather: {
      id: number;
      main: string; 
      description: string;
    }[];
  };
}

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data.');
    error.status = res.status;
    throw error;
  }
  return res.json();
});

export function useWeather() {
  const { data, error, isLoading } = useSWR<WeatherData>(
    '/api/weather', 
    fetcher,
    {
      refreshInterval: 600000, 
    }
  );

  return {
    weather: data,
    isLoading,
    isError: error,
  };
}