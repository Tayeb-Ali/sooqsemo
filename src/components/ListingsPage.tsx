import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Header from "./Header";
import SearchSection from "./SearchSection";
import ProductCard from "./ProductCard";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  image: string;
  category: string;
  timePosted: string;
}

const ListingsPage = () => {
  const { category } = useParams();
  const { t } = useLanguage();
  const [page, setPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sortBy, setSortBy] = useState("newest");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock data - in real app this would come from an API
  const allListings: Listing[] = [
    {
      id: "1",
      title: "iPhone 12 Pro Max - Excellent Condition",
      price: 699.99,
      location: "Amman",
      image:
        "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=300&fit=crop",
      category: "Electronics",
      timePosted: "2 hours ago",
    },
    {
      id: "2",
      title: "Luxury Apartment with Sea View",
      price: 250000,
      location: "Dubai",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      category: "Real Estate",
      timePosted: "1 day ago",
    },
    {
      id: "3",
      title: "Toyota Camry 2020",
      price: 25000,
      location: "Cairo",
      image:
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
      category: "Vehicles",
      timePosted: "3 days ago",
    },
    // Add more items for each category
    ...Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 4}`,
      title: `${category} Item ${i + 4}`,
      price: Math.floor(Math.random() * 10000) + 100,
      location: ["Amman", "Dubai", "Cairo", "Riyadh"][
        Math.floor(Math.random() * 4)
      ],
      image: `https://picsum.photos/400/300?random=${i}`,
      category: category,
      timePosted: `${Math.floor(Math.random() * 7) + 1} days ago`,
    })),
  ];

  const locations = ["Amman", "Dubai", "Cairo", "Riyadh"];

  const filteredListings = (): Listing[] => {
    return allListings.filter(
      (listing: Listing) =>
        listing.category.toLowerCase() === category?.toLowerCase() &&
        listing.price >= priceRange[0] &&
        listing.price <= priceRange[1] &&
        (selectedLocations.length === 0 ||
          selectedLocations.includes(listing.location))
    );
  };

  const sortedListings = (): Listing[] => {
    return filteredListings().sort((a: Listing, b: Listing) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      return a.id < b.id ? 1 : -1;
    });
  };

  const itemsPerPage = 8;
  const paginatedListings = sortedListings().slice(0, page * itemsPerPage);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 500
      ) {
        if (
          !loading &&
          paginatedListings.length < sortedListings().length
        ) {
          setLoading(true);
          setTimeout(() => {
            setPage((prev) => prev + 1);
            setLoading(false);
          }, 500);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, paginatedListings.length, sortBy, priceRange, selectedLocations, category]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <SearchSection />
          <div className="flex gap-6">
            <div className="w-64 space-y-6">
              <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
                <h2 className="font-semibold text-lg">Filters</h2>
                <div className="space-y-2">
                  <Label>Price Range</Label>
                  <Slider
                    min={0}
                    max={1000000}
                    step={1000}
                    value={priceRange}
                    onValueChange={(newValue) => setPriceRange(newValue)}
                    className="my-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0].toLocaleString()}</span>
                    <span>${priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  {locations.map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox
                        id={location}
                        checked={selectedLocations.includes(location)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedLocations((prev) => [...prev, location]);
                          } else {
                            setSelectedLocations((prev) =>
                              prev.filter((loc) => loc !== location)
                            );
                          }
                        }}
                      />
                      <label htmlFor={location} className="text-sm">
                        {location}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label>Sort By</Label>
                  <select
                    className="w-full p-2 border rounded"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-6">{category} Listings</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedListings.map((listing) => (
                  <Link to={`/listing/${listing.id}`} key={listing.id}>
                    <ProductCard
                      title={listing.title}
                      price={listing.price}
                      location={listing.location}
                      image={listing.image}
                      category={listing.category}
                      timePosted={listing.timePosted}
                    />
                  </Link>
                ))}
              </div>
              {loading && (
                <div className="text-center py-4">Loading more items...</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingsPage;
