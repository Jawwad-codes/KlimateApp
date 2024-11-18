import { ForecastData } from "../API/types";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface WeatherForcastProp {
  data: ForecastData;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

const WeatherForcast = ({ data }: WeatherForcastProp) => {
  const dailyForcast = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");
    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }
    return acc;
  }, {} as Record<string, DailyForecast>);

  const nextDays = Object.values(dailyForcast).slice(1, 6);
  const formattemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {nextDays.map((day) => (
            <div
              key={day.date}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg border p-4"
            >
              {/* Date and Weather Description */}
              <div className="flex flex-col text-center sm:text-left">
                <p className="font-medium text-lg">
                  {format(new Date(day.date * 1000), "EEE, MMM d")}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  {day.weather.description}
                </p>
              </div>

              {/* Temperature (Min/Max) */}
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-blue-500">
                  <ArrowDown className="h-4 w-4 md:h-5 md:w-5" />
                  {formattemp(day.temp_min)}
                </span>
                <span className="flex items-center gap-1 text-red-500">
                  <ArrowUp className="h-4 w-4 md:h-5 md:w-5" />
                  {formattemp(day.temp_max)}
                </span>
              </div>

              {/* Humidity and Wind */}
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{day.humidity}%</span>
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{day.wind} m/s</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForcast;
