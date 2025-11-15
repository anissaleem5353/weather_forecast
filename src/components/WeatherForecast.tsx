import React from "react";
import type { ForecastData } from "../api/types";

interface WeatherForecastProps {
  data: ForecastData;
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  return <div>WeatherForecast</div>;
};

export default WeatherForecast;
