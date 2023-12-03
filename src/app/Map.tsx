import * as React from "react";
import {
  MapContainer as LeafletMap,
  Marker as LeafletMarker,
  TileLayer,
  useMap
} from "react-leaflet";

const ChangeMapView: React.FC<{ coords: { lat: number; lng: number } }> = ({
  coords
}) => {
  const map = useMap();
  console.log("ChangeMapView", coords, map.getZoom());
  map.setView([coords.lat, coords.lng], map.getZoom());

  return null;
};

interface IMapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  tileUrl: string;
}

const Map: React.FC<IMapProps> = (props) => {
  return (
    <LeafletMap
      center={props.center}
      zoom={props.zoom}
      style={{ width: "100%", height: "100%" }}
    >
      <ChangeMapView coords={props.center} />
      <TileLayer attribution="" url={props.tileUrl} />
      <LeafletMarker position={props.center} draggable={false}></LeafletMarker>
    </LeafletMap>
  );
};

export default Map;
