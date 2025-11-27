import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getCoords } from "../utils/getCoords";

interface MiniMapProps {
  route: string[];
}

export default function MiniMap({ route }: MiniMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current || !route || route.length === 0) return;

    const routeCoords = route
      .map((city) => getCoords(city))
      .filter(Boolean);

    if (routeCoords.length < 2) {
      console.warn("MiniMap: Not enough coordinates for route");
      return;
    }

    // Create map
    const map = L.map(mapRef.current, {
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: false,
      attributionControl: false
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    // Fit bounds across all stops
    const bounds = L.latLngBounds(routeCoords);
    map.fitBounds(bounds, { padding: [30, 30] });

    // Marker Icon
    const icon = L.icon({
      iconUrl: "https://img.icons8.com/color/48/marker.png",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    // Add markers
    routeCoords.forEach((point) => {
      L.marker(point, { icon }).addTo(map);
    });

    // Removed the polyline here (no route line)

    return () => map.remove();
  }, [route]);

  return (
    <div
      ref={mapRef}
      style={{
        height: "260px",
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    />
  );
}
