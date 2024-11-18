import React from "react";
import { Button } from "../components/ui/button";
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";
import { useGeolocation } from "../../hooks/use-geolocation";
import WeatherSkeleton from "../components/loading-skeletion";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "../../hooks/use-weather";
import CurrentWeather from "../components/current-weather";
import HourlyTemperature from "../components/hourlyTemperature";
import WeatherDetails from "../components/weatherDetails";
import WeatherForcast from "../components/weatherForcat";
import FavouriteCities from "../components/favourite-Cities";

const Dashboard = () => {
  const {
    isloading: locationLoading,
    getLocation,
    error: locationError,
    coordinates,
  } = useGeolocation();
  console.log(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);
  const forcastQuery = useForecastQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);
  console.log(locationQuery.data);
  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      locationQuery.refetch(), weatherQuery.refetch(), forcastQuery.refetch();
    }
  };
  if (locationLoading) {
    return <WeatherSkeleton />;
  }
  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4"></MapPin>
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location to see your local weather.</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4"></MapPin>
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  const locationname = locationQuery.data?.[0];
  console.log(locationError);
  if (weatherQuery.error || forcastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch Weather Data</p>
          <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
            <RefreshCcw className="mr-2 h-4 w-4"></RefreshCcw>
            retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!weatherQuery.data || !forcastQuery.data) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-4">
      <FavouriteCities />
      <div className=" flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forcastQuery.isFetching}
        >
          <RefreshCcw
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather
            data={weatherQuery.data}
            locationname={locationname}
          />
          <HourlyTemperature data={forcastQuery.data} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForcast data={forcastQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
