import { useQuery } from "@tanstack/react-query";
import { Coordinate } from "../src/API/types";
import { weatherAPI } from "../src/API/weather";

export const WEATHER_KEYS = {
  weather: (coords: Coordinate) => ["weather", coords] as const,
  forecast: (coords: Coordinate) => ["forecast", coords] as const,
  location: (coords: Coordinate) => ["location", coords] as const,
  search: (query: string) => ["location-search", query] as const,
} as const;

export function useWeatherQuery(coordinates: Coordinate | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
    enabled: !!coordinates,
  });
}

export function useForecastQuery(coordinates: Coordinate | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? weatherAPI.getForecast(coordinates) : null),
    enabled: !!coordinates,
  });
}

export function useReverseGeocodeQuery(coordinates: Coordinate | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
    enabled: !!coordinates,
  });
}
export function useLocationSearch(query: string) {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => weatherAPI.searchLocations(query),
    enabled: query.length >= 3,
  });
}