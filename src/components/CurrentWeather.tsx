import React from "react";
import type { GeocodingResponse, WeatherData } from "../api/types";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { motion } from "framer-motion";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const {
    weather: [CurrentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  const formatTemp = (temp: number) => `${Math.round(temp)}°C`;

  const WEATHER_ICON_BASE_URL = "https://openweathermap.org/img/wn";
  //   console.log("Weather icon:", CurrentWeather.icon);

  return (
    <motion.section
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="flex-1 md:w-full lg:flex-2 lg:h-full sm:w-full  "
    >
      <Card>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-6 md:grid-cols-2"
          >
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.2 },
                },
              }}
              className="space-y-4"
            >
              <motion.div
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                className="space-y-1"
              >
                <h2 className="text-1xl font-bold tracking-tighter flex  items-center gap-1">
                  {locationName?.name}
                  {locationName?.state && (
                    <span className="text-muted-foreground">
                      , {locationName.state}
                    </span>
                  )}
                </h2>

                <p className="text-sm  text-muted-foreground">
                  {locationName?.country}
                </p>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 },
                }}
                className="flex items-center gap-2"
              >
                <p className="text-7xl font-bold tracking-tighter">
                  {formatTemp(temp)}
                </p>

                <div className="space-x-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Feels like {formatTemp(feels_like)}
                  </p>

                  <div className="flex gap-2 text-sm font-medium">
                    <span className="flex items-center gap-1 text-blue-500">
                      <ArrowDown className="h-3 w-3" />
                      {formatTemp(temp_min)}
                    </span>
                    <span className="flex items-center gap-1 text-red-500">
                      <ArrowUp className="h-3 w-3" />
                      {formatTemp(temp_max)}
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Humidity</p>
                    <p className="text-sm text-muted-foreground">{humidity}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Wind Speed</p>
                    <p className="text-sm text-muted-foreground">{speed} m/s</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center justify-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.05 }}
                className="relative flex aspect-square w-full max-w-[200px] items-center justify-center"
              >
                <img
                  src={`${WEATHER_ICON_BASE_URL}/${CurrentWeather.icon}@4x.png`}
                  alt={`${CurrentWeather.description} weather icon`}
                  className="h-full w-full object-contain"
                />
                <div className="absolute bottom-0 text-center">
                  <p className="text-sm font-medium capitalize">
                    {CurrentWeather.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default CurrentWeather;
