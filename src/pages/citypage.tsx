import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useForecastQuery, useWeatherQuery } from "../../hooks/use-weather";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";

import WeatherSkeleton from "../components/loading-skeletion";
import CurrentWeather from "../components/current-weather";
import HourlyTemperature from "../components/hourlyTemperature";
import WeatherDetails from "../components/weatherDetails";
import WeatherForcast from "../components/weatherForcat";
import FavouriteButton from "../components/favourite-Button";

export function CityPage() {
  const [searchParams] = useSearchParams();
  const params = useParams();

  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Failed to load weather data. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityname) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.cityname}, {weatherQuery.data.sys.country}
        </h1>
        <div>
          <FavouriteButton
            data={{ ...weatherQuery.data, name: params.cityname }}
          />
        </div>
      </div>

      <div className="grid gap-6">
        <CurrentWeather data={weatherQuery.data} />
        <HourlyTemperature data={forecastQuery.data} />
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForcast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
}
export default CityPage;
