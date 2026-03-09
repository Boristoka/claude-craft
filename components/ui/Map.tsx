"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Map Component - Interactive OpenStreetMap with Leaflet
 *
 * Free, no API key required. Uses OpenStreetMap tiles.
 *
 * @example
 * ```tsx
 * <Map
 *   latitude={52.3676}
 *   longitude={4.9041}
 *   zoom={14}
 *   marker={{ title: "Our Office" }}
 * />
 * ```
 *
 * @example With custom tile style
 * ```tsx
 * <Map
 *   latitude={52.3676}
 *   longitude={4.9041}
 *   tileStyle="dark"
 * />
 * ```
 */

type MapProps = {
  /** Latitude coordinate */
  latitude: number;
  /** Longitude coordinate */
  longitude: number;
  /** Zoom level (1-18, default: 14) */
  zoom?: number;
  /** Map height (default: 400px) */
  height?: string | number;
  /** Show marker at coordinates */
  marker?: {
    title?: string;
    popup?: string;
  };
  /** Tile style */
  tileStyle?: "default" | "dark" | "light" | "watercolor";
  /** Disable scroll zoom */
  scrollWheelZoom?: boolean;
  /** Additional class names */
  className?: string;
  /** Rounded corners */
  rounded?: boolean;
  /** Show grayscale filter (elegant look) */
  grayscale?: boolean;
};

// Tile layer URLs for different styles (all free, no API key)
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

// Dynamic import component to avoid SSR issues with Leaflet
function MapInner({
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
}: MapProps) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Loading placeholder
    return (
      <div
        className={cn(
          "bg-neutral-100 dark:bg-neutral-800 animate-pulse flex items-center justify-center",
          rounded && "rounded-2xl",
          className
        )}
        style={{ height: typeof height === "number" ? `${height}px` : height }}
      >
        <svg
          className="w-8 h-8 text-neutral-300 dark:text-neutral-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
    );
  }

  // Dynamically import Leaflet components
  const LeafletMap = React.lazy(() => import("./MapLeaflet"));

  return (
    <React.Suspense
      fallback={
        <div
          className={cn(
            "bg-neutral-100 dark:bg-neutral-800 animate-pulse",
            rounded && "rounded-2xl",
            className
          )}
          style={{ height: typeof height === "number" ? `${height}px` : height }}
        />
      }
    >
      <LeafletMap
        latitude={latitude}
        longitude={longitude}
        zoom={zoom}
        height={height}
        marker={marker}
        tileStyle={tileStyle}
        scrollWheelZoom={scrollWheelZoom}
        className={className}
        rounded={rounded}
        grayscale={grayscale}
      />
    </React.Suspense>
  );
}

export function Map(props: MapProps) {
  return <MapInner {...props} />;
}

// Export tile styles for reference
export { tileStyles };
