import React from "react";
import type { WeatherData } from "../api/types";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { useFavorite } from "../hooks/UseFavorite";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface FavoriteButtonProps {
  data: WeatherData;
}

const FavoriteButton = ({ data }: FavoriteButtonProps) => {
  const { addToFavorite, isFavorite, removeFavorite } = useFavorite();
  const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

  const handleToggleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from Favorites`);
    } else {
      addToFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to Favorites`);
    }
  };

  return (
    <motion.div
      whileTap={{ scale: 0.75 }}
      animate={{
        scale: isCurrentlyFavorite ? [1, 1.25, 1] : 1,
      }}
      transition={{ duration: 0.25 }}
    >
      <Button
        variant={isCurrentlyFavorite ? "default" : "outline"}
        size="icon"
        onClick={handleToggleFavorite}
        className={
          isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""
        }
      >
        <motion.div
          animate={{
            rotate: isCurrentlyFavorite ? 360 : 0,
            scale: isCurrentlyFavorite ? 1.2 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <Star
            className={`h-4 w-4 ${
              isCurrentlyFavorite ? "fill-current text-yellow-900" : ""
            }`}
          />
        </motion.div>
      </Button>
    </motion.div>
  );
};

export default FavoriteButton;
