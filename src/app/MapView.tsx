import { Component, createRef, useRef } from "react";
import Map from "./Map";

interface IMapViewProps {
  zoomLevel: number;
  tileUrl: string;
}

interface IMapViewState {
  center: {
    lat: number;
    lng: number;
  };
}

export default class MapView extends Component<IMapViewProps, IMapViewState> {
  constructor(props: IMapViewProps) {
    super(props);
    this.state = {
      center: {
        lat: 0,
        lng: 0
      }
    };
    (window as any).setLatitude = (val: number) => {
      console.log("setLatitude", val);
      this.setState({ center: { lat: val, lng: this.state.center.lng } });
    };
    (window as any).setLongitude = (val: number) => {
      console.log("setLongitude", val);
      this.setState({ center: { lat: this.state.center.lat, lng: val } });
    };
  }

  componentDidMount() {
    // setTimeout(() => {
    //   if (this.refMap) {
    //     this.refMap.invalidateSize();
    //   }
    // }, 2000);
  }

  public render(): JSX.Element {
    console.log("MapView.render", this.state);
    return (
      <Map
        center={this.state.center}
        zoom={this.props.zoomLevel}
        tileUrl={this.props.tileUrl}
      />
    );
  }
}
