import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Phone, Clock, User } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Header from "./Header";
import Map from "./Map";

const ListingDetails = () => {
  const [showFullNumber, setShowFullNumber] = useState(false);
  const { id } = useParams();
  const [isMapOpen, setIsMapOpen] = useState(false);

  // Mock data - replace with API call
  const listing = {
    id,
    title:
      "ارض سكنية على شارعين وثلاثة مئة متر مربع 700 قرب مسجد صرافة عند الملك عبدالله",
    price: 190000,
    location: "عمان - جبل علي",
    description:
      "ارض وثلاثة مئة متر مربع في منطقة راقية شمال عمان\nالمساحة: 700م\nالموقع: تقع في اراضي شفا بدران وثلاثة مئة متر\nالمنطقة: شفابدران شارعين الغربية من مسجد صرافة\nتصنيف سكن (أ)\nجميع الخدمات متوفرة\nارض مميزة جدا",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&h=800",
      "https://images.unsplash.com/photo-1495460987403-42ee97ae4441?w=1200&h=800",
    ],
    category: "Real Estate",
    timePosted: "2 hours ago",
    publisher: {
      name: "صالح علي",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller1",
      phone: "0791234567",
      memberSince: "14-06-2014",
    },
    location_coords: [31.9539, 35.9106], // Amman coordinates
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Carousel */}
            <Card className="p-4">
              <Carousel className="w-full">
                <CarouselContent>
                  {listing.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <img
                        src={image}
                        alt={`${listing.title} - Image ${index + 1}`}
                        className="w-full h-[400px] object-cover rounded-lg"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </Card>

            {/* Listing Details */}
            <Card className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge>{listing.category}</Badge>
                  <span className="text-muted-foreground text-sm flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {listing.timePosted}
                  </span>
                </div>
                <h1 className="text-2xl font-bold">{listing.title}</h1>
                <p className="text-3xl font-bold text-primary">
                  ${listing.price.toLocaleString()}
                </p>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {listing.location}
                </div>
              </div>

              <div className="pt-4 border-t">
                <h2 className="font-semibold mb-2">Description</h2>
                <p className="whitespace-pre-line text-muted-foreground">
                  {listing.description}
                </p>
              </div>

              {/* Map Preview */}
              <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full mt-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    View on Map
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <div className="h-[600px]">
                    {listing.location_coords && listing.location_coords.length === 2 ? (
                      <Map center={[listing.location_coords[0], listing.location_coords[1]]} zoom={13} />
                    ) : null}
                  </div>
                </DialogContent>
              </Dialog>
            </Card>
          </div>

          {/* Right Column - Publisher Info */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={listing.publisher.avatar} />
                  <AvatarFallback>{listing.publisher.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{listing.publisher.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    Member since {listing.publisher.memberSince}
                  </p>
                </div>
              </div>

              <Button className="w-full mb-2" onClick={() => setShowFullNumber(true)}>
                <Phone className="w-4 h-4 mr-2" />
                {showFullNumber ? listing.publisher.phone : listing.publisher.phone.slice(0, -4) + 'XXX'}
              </Button>

              <Button variant="outline" className="w-full" onClick={() => window.open('/chat', '_blank')}>
                Chat with Seller
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingDetails;
