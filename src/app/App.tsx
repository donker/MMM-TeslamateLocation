import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker as LeafletMarker,
  TileLayer
} from "react-leaflet";
import { Map } from "leaflet";

interface AppProps {
  zoomLevel: number;
}

const App: React.FC<AppProps> = (props) => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const refMap = useRef<Map | null>(null);

  useEffect(() => {
    (window as any).setLatitude = (val: number) => {
      setLatitude(val);
    };
    (window as any).setLongitude = (val: number) => {
      setLongitude(val);
    };
  });

  useEffect(() => {
    if (refMap.current && latitude != 0 && longitude != 0) {
      refMap.current.setView([latitude, longitude], props.zoomLevel);
    }
  }, [latitude, longitude]);

  setTimeout(function () {
    if (refMap.current) {
      refMap.current.invalidateSize();
    }
  }, 2000);

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={props.zoomLevel}
      whenCreated={(mapInstance) => {
        refMap.current = mapInstance;
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LeafletMarker
        position={[latitude, longitude]}
        draggable={false}
      ></LeafletMarker>
    </MapContainer>
  );
};

export default App;
