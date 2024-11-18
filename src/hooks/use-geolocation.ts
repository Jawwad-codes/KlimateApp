import { useEffect, useState } from "react";
import { Coordinate } from "../API/types";
interface GeolocationState {
  coordinates: Coordinate | null;
  error: string | null;
  isloading: boolean;
}

export function useGeolocation() {
  const [locationData, setlocationData] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isloading: true,
  });
  const getLocation = () => {
    setlocationData((prev) => ({ ...prev, isloading: true, error: null }));
    if (!navigator.geolocation) {
      setlocationData({
        coordinates: null,
        isloading: false,
        error: "Geolocation is not supported by your browser",
      });
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setlocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isloading: false,
        });
      },
      (e) => {
        let errorMessage: string;
        switch (e.code) {
          case e.PERMISSION_DENIED:
            errorMessage =
              "Location Permission denied please enable location acess";
            break;
          case e.POSITION_UNAVAILABLE:
            errorMessage = "Location info is unvailable";
            break;
          case e.TIMEOUT:
            errorMessage = "Location request Time Out";
            break;
          default:
            errorMessage = "An unknown error occured";
        }
        setlocationData({
          coordinates: null,
          error: errorMessage,
          isloading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };
  useEffect(() => getLocation(), []);
  return {
    ...locationData,
    getLocation,
  };
}
