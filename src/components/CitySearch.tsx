import { useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Button } from "./ui/button";
import { Clock, Loader2, Search, Star, XCircle } from "lucide-react";
import { useLocationQuery } from "../hooks/UseWeather";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "../hooks/UseSearchHistory";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorite } from "../hooks/UseFavorite";

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data: locations, isLoading } = useLocationQuery(query);
  const { history, clearHistory, addToHistory } = useSearchHistory();

  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");

    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });

    setOpen(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  const { favorites } = useFavorite();

  return (
    <section>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <p className="hidden sm:flex">Search cities...</p>
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <CommandDialog open={open} onOpenChange={setOpen}>
              <CommandInput
                placeholder="Search cities ..."
                value={query}
                onValueChange={setQuery}
              />

              <CommandList>
                {query.length > 2 && !isLoading && locations?.length === 0 && (
                  <CommandEmpty>No result found.</CommandEmpty>
                )}

                {favorites.length > 0 && (
                  <CommandGroup heading="Favorites">
                    <AnimatePresence>
                      {favorites.map((location) => (
                        <motion.div
                          key={location.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.15 }}
                        >
                          <CommandItem
                            value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                            onSelect={handleSelect}
                            className="cursor-pointer"
                          >
                            <Star className="mr-2 w-4 h-4 text-yellow-500" />
                            <span>{location.name}</span>
                            {location.state && (
                              <span className="text-sm text-muted-foreground">
                                , {location.state}
                              </span>
                            )}
                            <span className="text-sm text-muted-foreground">
                              , {location.country}
                            </span>
                          </CommandItem>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </CommandGroup>
                )}

                {/* Recent Search Section */}
                {history.length > 0 && (
                  <>
                    <CommandSeparator />
                    <CommandGroup>
                      <div className="flex items-center justify-between px-2 my-2 ">
                        <p className="text-xs text-muted-foreground">
                          Recent Searches
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => clearHistory.mutate()}
                          className="cursor-pointer"
                        >
                          <XCircle className="h-4 w-4" />
                          Clear
                        </Button>
                      </div>

                      <AnimatePresence>
                        {history.map((location) => (
                          <motion.div
                            key={`${location.lat}-${location.lon}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.15 }}
                          >
                            <CommandItem
                              value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                              onSelect={handleSelect}
                              className="cursor-pointer"
                            >
                              <Clock className="mr-2 w-4 h-4 text-muted-foreground" />
                              <span>{location.name}</span>
                              {location.state && (
                                <span className="text-sm text-muted-foreground">
                                  , {location.state}
                                </span>
                              )}
                              <span className="text-sm text-muted-foreground">
                                , {location.country}
                              </span>
                              <span className="ml-auto text-xs text-muted-foreground">
                                {format(
                                  new Date(location.searchedAt),
                                  "MM d, h:mm a"
                                )}
                              </span>
                            </CommandItem>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </CommandGroup>
                  </>
                )}

                <CommandSeparator />

                {/* Suggestions Section */}
                {locations && locations.length > 0 && (
                  <CommandGroup heading="Suggestions">
                    {isLoading && (
                      <div className="flex items-center justify-center p-4">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.8,
                            ease: "linear",
                          }}
                        >
                          <Loader2 className="h-4 w-4" />
                        </motion.div>
                      </div>
                    )}

                    <AnimatePresence>
                      {locations.map((location) => (
                        <motion.div
                          key={`${location.lat}-${location.lon}`}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.15 }}
                        >
                          <CommandItem
                            value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                            onSelect={handleSelect}
                          >
                            <Search className="mr-2 w-4 h-4" />
                            <span>{location.name}</span>
                            {location.state && (
                              <span className="text-sm text-muted-foreground">
                                , {location.state}
                              </span>
                            )}
                            <span className="text-sm text-muted-foreground">
                              , {location.country}
                            </span>
                          </CommandItem>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </CommandGroup>
                )}
              </CommandList>
            </CommandDialog>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CitySearch;
