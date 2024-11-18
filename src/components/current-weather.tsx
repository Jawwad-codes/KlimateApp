import React from "react";
import { GeocodingResponse, WeatherData } from "../API/types";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";
interface CurrentWeatherProp {
  data: WeatherData;
  locationname?: GeocodingResponse;
}
const CurrentWeather = ({ data, locationname }: CurrentWeatherProp) => {
  console.log(data);
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;
  const formattemp = (temp: number) => `${Math.round(temp)}°`;
  if (!data) {
    return <div>No weather data available</div>;
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-end gap-2">
                <h2 className="text-2xl font-bold tracking-tight">
                  {locationname?.name}
                </h2>
                {locationname?.state && (
                  <span className="text-muted-foreground">
                    {locationname.state}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {locationname?.country}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-7xl font-bold tracking-tight">
                {formattemp(temp)}
              </p>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground font-medium ">
                  Feels like {formattemp(feels_like)}
                </p>
                <div className="flex  gap-2 text-sm font-medium">
                  <span className="flex items-center gap-1 text-blue-500">
                    <ArrowDown className="h-3 w-3" />
                    {formattemp(temp_min)}
                  </span>
                  <span className="flex items-center gap-1 text-red-500">
                    <ArrowUp className="h-3 w-3" />
                    {formattemp(temp_max)}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Droplet className="h-4 w-4 text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Humidity</p>
                  <p className="text-sm text-muted-foreground">{humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">wind speed</p>
                  <p className="text-sm text-muted-foreground">{speed}m/s</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className="h-full w-full object-contain"
              />
              <div className="absolute bottom-0 text-center">
                <p className="text-sm font-medium capitilize">
                  {currentWeather.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
