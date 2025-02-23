import React from "react";
import { Card, CardContent } from "./ui/card";
import {
  Car,
  Home,
  Laptop,
  ShoppingBag,
  Smartphone,
  Sofa,
  Briefcase,
  Gift,
} from "lucide-react";

interface Category {
  icon: React.ReactNode;
  name: string;
  itemCount: number;
  color: string;
}

interface CategoryGridProps {
  categories?: Category[];
  onCategoryClick?: (category: Category) => void;
}

import { useLanguage } from "@/lib/i18n/LanguageContext";

const CategoryGrid = ({
  categories = [
    {
      icon: <Car size={32} />,
      name: "Vehicles",
      itemCount: 1234,
      color: "bg-blue-100",
    },
    {
      icon: <Home size={32} />,
      name: "Real Estate",
      itemCount: 567,
      color: "bg-green-100",
    },
    {
      icon: <Laptop size={32} />,
      name: "Electronics",
      itemCount: 890,
      color: "bg-purple-100",
    },
    {
      icon: <Smartphone size={32} />,
      name: "Mobile Phones",
      itemCount: 432,
      color: "bg-yellow-100",
    },
    {
      icon: <Sofa size={32} />,
      name: "Furniture",
      itemCount: 765,
      color: "bg-pink-100",
    },
    {
      icon: <ShoppingBag size={32} />,
      name: "Fashion",
      itemCount: 987,
      color: "bg-orange-100",
    },
    {
      icon: <Briefcase size={32} />,
      name: "Jobs",
      itemCount: 321,
      color: "bg-red-100",
    },
    {
      icon: <Gift size={32} />,
      name: "Others",
      itemCount: 543,
      color: "bg-indigo-100",
    },
  ],
  onCategoryClick = () => {},
}: CategoryGridProps) => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-[1200px] mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6">{t("categories.title")}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <Card
            key={index}
            className={`cursor-pointer hover:shadow-lg transition-shadow ${category.color}`}
            onClick={() =>
              (window.location.href = `/category/${category.name.toLowerCase()}`)
            }
          >
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 text-gray-700">{category.icon}</div>
              <h3 className="font-semibold mb-2">{category.name}</h3>
              <p className="text-sm text-muted-foreground">
                {category.itemCount.toLocaleString()} items
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
