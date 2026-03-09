"use client";

import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";

// Fix for default marker icon in Next.js/Webpack
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Tile layer URLs for different styles
const tileStyles = {
  default: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  dark: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
  },
  light: {
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
  },
  watercolor: {
    url: "https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg",
    attribution: '&copy; <a href="https://stamen.com">Stamen Design</a>',
  },
};

type MapLeafletProps = {
  latitude: number;
  longitude: number;
  zoom?: number;
  height?: string | number;
  marker?: {
    title?: string;
    popup?: string;
  };
  tileStyle?: "default" | "dark" | "light" | "watercolor";
  scrollWheelZoom?: boolean;
  className?: string;
  rounded?: boolean;
  grayscale?: boolean;
};

export default function MapLeaflet({
  latitude,
  longitude,
  zoom = 14,
  height = 400,
  marker,
  tileStyle = "default",
  scrollWheelZoom = false,
  className,
  rounded = true,
  grayscale = false,
}: MapLeafletProps) {
  const tile = tileStyles[tileStyle];
  const heightStyle = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={cn(
        "overflow-hidden",
        rounded && "rounded-2xl",
        grayscale && "grayscale hover:grayscale-0 transition-all duration-500",
        className
      )}
      style={{ height: heightStyle }}
    >
      <MapContainer
        center={[latitude, longitude]}
        zoom={zoom}
        scrollWheelZoom={scrollWheelZoom}
        style={{ height: "100%", width: "100%" }}
        attributionControl={true}
      >
        <TileLayer url={tile.url} attribution={tile.attribution} />
        {marker && (
          <Marker position={[latitude, longitude]} icon={customIcon}>
            {(marker.title || marker.popup) && (
              <Popup>
                {marker.title && (
                  <strong className="block text-neutral-900">{marker.title}</strong>
                )}
                {marker.popup && (
                  <span className="text-neutral-600">{marker.popup}</span>
                )}
              </Popup>
            )}
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
