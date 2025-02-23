import React from "react";
import ProductCard from "./ProductCard";

interface FeaturedListingsProps {
  listings?: Array<{
    id: string;
    title: string;
    price: number;
    location: string;
    image: string;
    category: string;
    timePosted: string;
  }>;
}

import { useLanguage } from "@/lib/i18n/LanguageContext";

const FeaturedListings = ({ listings }: FeaturedListingsProps) => {
  const { t } = useLanguage();
  const defaultListings = [
    {
      id: "1",
      title: "iPhone 12 Pro Max - Excellent Condition",
      price: 699.99,
      location: "Amman, Jordan",
      image:
        "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=300&fit=crop",
      category: "Electronics",
      timePosted: "2 hours ago",
    },
    {
      id: "2",
      title: "Luxury Apartment with Sea View",
      price: 250000,
      location: "Dubai, UAE",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      category: "Real Estate",
      timePosted: "1 day ago",
    },
    {
      id: "3",
      title: "Toyota Camry 2020 - Low Mileage",
      price: 25000,
      location: "Cairo, Egypt",
      image:
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
      category: "Vehicles",
      timePosted: "3 days ago",
    },
    {
      id: "4",
      title: "MacBook Pro M1 - Like New",
      price: 1299.99,
      location: "Riyadh, KSA",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      category: "Electronics",
      timePosted: "5 hours ago",
    },
  ];

  const displayListings = listings || defaultListings;

  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {t("featured.title")}
          </h2>
          <p className="text-gray-600 mt-2">{t("featured.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayListings.map((listing) => (
            <ProductCard
              key={listing.id}
              title={listing.title}
              price={listing.price}
              location={listing.location}
              image={listing.image}
              category={listing.category}
              timePosted={listing.timePosted}
              onClick={() => console.log(`Clicked listing ${listing.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedListings;
