import { Component, createRef, useRef } from "react";
import {
  MapContainer,
  Marker as LeafletMarker,
  TileLayer
} from "react-leaflet";
import { Map } from "leaflet";

interface IMapViewProps {
  zoomLevel: number;
  tileUrl: string;
}

interface IMapViewState {
  latitude: number;
  longitude: number;
}

export default class MapView extends Component<IMapViewProps, IMapViewState> {
  constructor(props: IMapViewProps) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0
    };
    (window as any).setLatitude = (val: number) => {
      this.setState({ latitude: val }, () => {
        this.rerenderMap();
      });
    };
    (window as any).setLongitude = (val: number) => {
      this.setState({ longitude: val }, () => {
        this.rerenderMap();
      });
    };
  }

  refMap: Map | undefined;

  rerenderMap() {
    if (this.refMap && this.state.latitude != 0 && this.state.longitude != 0) {
      this.refMap.setView(
        [this.state.latitude, this.state.longitude],
        this.props.zoomLevel
      );
    }
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.refMap) {
        this.refMap.invalidateSize();
      }
    }, 2000);
  }

  public render(): JSX.Element {
    return (
      <MapContainer
        center={[this.state.latitude, this.state.longitude]}
        zoom={this.props.zoomLevel}
        whenCreated={(mapInstance) => {
          this.refMap = mapInstance;
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer attribution="" url={this.props.tileUrl} />
        <LeafletMarker
          position={[this.state.latitude, this.state.longitude]}
          draggable={false}
        ></LeafletMarker>
      </MapContainer>
    );
  }
}
