import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Search, MapPin } from "lucide-react";

interface SearchSectionProps {
  onSearch?: (searchParams: {
    query: string;
    category: string;
    location: string;
  }) => void;
  categories?: Array<{ id: string; name: string }>;
  locations?: Array<{ id: string; name: string }>;
}

import { useLanguage } from "@/lib/i18n/LanguageContext";

const SearchSection = ({
  onSearch = () => {},
  categories = [
    { id: "1", name: "Vehicles" },
    { id: "2", name: "Real Estate" },
    { id: "3", name: "Electronics" },
    { id: "4", name: "Furniture" },
  ],
  locations = [
    { id: "1", name: "Amman" },
    { id: "2", name: "Irbid" },
    { id: "3", name: "Zarqa" },
    { id: "4", name: "Aqaba" },
  ],
}: SearchSectionProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedLocation, setSelectedLocation] = React.useState("");

  const handleSearch = () => {
    onSearch({
      query: searchQuery,
      category: selectedCategory,
      location: selectedLocation,
    });
  };

  const { t } = useLanguage();

  return (
    <div className="w-full max-w-[1200px] mx-auto p-6 bg-white shadow-sm rounded-lg">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder={t("search.placeholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-[200px] justify-start text-left font-normal"
            >
              <MapPin className="rtl:ml-2 ltr:mr-2 h-4 w-4" />
              {selectedLocation
                ? locations.find((l) => l.id === selectedLocation)?.name
                : "Select location"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <div className="grid gap-1">
              {locations.map((location) => (
                <Button
                  key={location.id}
                  variant="ghost"
                  className="w-full justify-start font-normal"
                  onClick={() => setSelectedLocation(location.id)}
                >
                  {location.name}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Button className="w-full md:w-auto" onClick={handleSearch}>
          <Search className="rtl:ml-2 ltr:mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchSection;
