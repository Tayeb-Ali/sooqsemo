import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

interface MapProps {
  center: [number, number];
  zoom?: number;
}

const Map = ({ center, zoom = 13 }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      mapRef.current &&
      !mapInstanceRef.current
    ) {
      // Dynamic import to avoid SSR issues
      import("leaflet").then((L) => {
        mapInstanceRef.current = L.map(mapRef.current!).setView(center, zoom);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(mapInstanceRef.current);

        // Fix marker icon issues
        const icon = L.icon({
          iconUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          iconRetinaUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        });

        L.marker(center, { icon }).addTo(mapInstanceRef.current);
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, zoom);
    }
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      style={{ height: "400px", width: "100%", background: "#f0f0f0" }}
    />
  );
};

export default Map;
