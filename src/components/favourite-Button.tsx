import { WeatherData } from "../API/types";
import { useFavorites } from "../hooks/use-favourite";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";
interface FavouriteData {
  data: WeatherData;
}
const FavouriteButton = ({ data }: FavouriteData) => {
  const { addFavorite, isFavorite, removeFavorite } = useFavorites();
  const iscurrentyFavourite = isFavorite(data.coord.lat, data.coord.lon);
  const handleToggle = () => {
    if (iscurrentyFavourite) {
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from Favorites`);
    } else {
      addFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to Favorites`);
    }
  };

  return (
    <Button
      variant={iscurrentyFavourite ? "default" : "outline"}
      size={"icon"}
      onClick={handleToggle}
      className={iscurrentyFavourite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
    >
      <Star
        className={`h-4 w-4 ${iscurrentyFavourite ? "fillcurrent" : " "}`}
      />
    </Button>
  );
};

export default FavouriteButton;
