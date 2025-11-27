import "ol/ol.css";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";

interface Props {
  coords?: [number, number][]; // optional shipment coords
}

const DEFAULT_CENTER: [number, number] = [0, 20];
const DEFAULT_ZOOM = 2.6;

// Static demo markers
const worldMarkers = [
  [40.7128, -74.0060],   // New York, USA
  [51.5074, -0.1278],    // London, UK
  [48.8566, 2.3522],     // Paris, France
  [35.6895, 139.6917],   // Tokyo, Japan

  // ✅ Newly Added
  [34.0522, -118.2437],  // Los Angeles, USA
  [1.3521, 103.8198],    // Singapore
  [25.276987, 55.296249],// Dubai, UAE
  [-23.5505, -46.6333],  // São Paulo, Brazil
  [19.0760, 72.8777],    // Mumbai, India
  [55.7558, 37.6173],    // Moscow, Russia
];

const WorldMap = forwardRef(function WorldMap({ coords = [] }: Props, ref) {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const viewRef = useRef<View | null>(null);

  // ✅ Expose recenter() to parent (Dashboard)
  useImperativeHandle(ref, () => ({
    recenter: () => {
      if (viewRef.current) {
        viewRef.current.animate({
          center: fromLonLat(DEFAULT_CENTER),
          zoom: DEFAULT_ZOOM,
          duration: 800,
        });
      }
    },
  }));

  useEffect(() => {
    if (!mapDivRef.current) return;

    // Convert markers to OL features
    const staticFeatures = worldMarkers.map(([lat, lon]) =>
      new Feature({ geometry: new Point(fromLonLat([lon, lat])) })
    );

    const shipmentFeatures = coords.map(([lat, lon]) =>
      new Feature({ geometry: new Point(fromLonLat([lon, lat])) })
    );

    const markerLayer = new VectorLayer({
      source: new VectorSource({
        features: [...staticFeatures, ...shipmentFeatures],
      }),
      style: new Style({
        image: new Icon({
          src: "https://img.icons8.com/?size=100&id=13800&format=png&color=000000",
          scale: 0.32,
          anchor: [0.5, 1],
        }),
      }),
    });

    const view = new View({
      center: fromLonLat(DEFAULT_CENTER),
      zoom: DEFAULT_ZOOM,
      minZoom: 2,
      maxZoom: 6,
      smoothExtentConstraint: true,
    });

    viewRef.current = view;

    const map = new Map({
      target: mapDivRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        markerLayer,
      ],
      view,
      controls: [],
    });

    mapRef.current = map;

    // ✅ Auto return to center after interaction
    let timeout: ReturnType<typeof setTimeout>;

    const resetAfterMove = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        view.animate({
          center: fromLonLat(DEFAULT_CENTER),
          zoom: DEFAULT_ZOOM,
          duration: 700,
        });
      }, 1500); // auto snap after 1.5s
    };

    // Supported events
    map.on("pointerdrag", resetAfterMove);
    map.on("moveend", resetAfterMove);
    map.on("dblclick", resetAfterMove);

    return () => {
      map.setTarget(null);
      clearTimeout(timeout);
    };
  }, [coords]);

  return (
    <div
      ref={mapDivRef}
      style={{
        width: "100%",
        height: "500px", // ✅ Increase height anytime
        borderRadius: "14px",
        overflow: "hidden",
      }}
    />
  );
});

export default WorldMap;
