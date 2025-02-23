import Reat from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Clock } from "lucide-react";

interface ProductCardProps {
  id?: string;
  title?: string;
  price?: number;
  location?: string;
  image?: string;
  category?: string;
  timePosted?: string;
  onClick?: () => void;
}

const ProductCard = ({
  id,
  title = "iPhone 12 Pro Max - Excellent Condition",
  price = 699.99,
  location = "Amman, Jordan",
  image = "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&amp;h=300&amp;fit=crop",
  category = "Electronics",
  timePosted = "2 hours ago",
  onClick = () => { },
}: ProductCardProps) => {
  return (
    <Card className="w-[280px] h-[360px] bg-white hover:shadow-lg transition-shadow">
      <Link to={`/listing/${id}`} className="cursor-pointer">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-[200px] object-cover rounded-t-lg"
          />
          <Badge className="absolute top-2 right-2 bg-primary/90">
            {category}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-2 mb-2">{title}</h3>
          <p className="text-xl font-bold text-primary mb-2">
            ${price.toLocaleString()}
          </p>
          <div className="flex items-center text-muted-foreground text-sm gap-2">
            <MapPin size={16} />
            <span>{location}</span>
          </div>
        </CardContent>
        <CardFooter className="px-4 py-2 border-t flex items-center text-muted-foreground text-sm">
          <Clock size={16} className="mr-2" />
          {timePosted}
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
