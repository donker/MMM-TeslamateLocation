import React from "react";
import ReactDOM from "react-dom";
import MapView from "../app/MapView";

interface MainPageProps {
  height: string;
  width: string;
  zoomLevel: number;
  mqttServerAddress: string;
  mqttServerPort: number;
  mqttServerUser: string;
  mqttServerPassword: string;
  mqttTopic: string;
}

Module.register<MainPageProps>("MMM-TeslamateLocation", {
  defaults: {
    height: "300px",
    width: "100%",
    zoomLevel: 20,
    mqttServerAddress: "",
    mqttServerPort: 1883,
    mqttServerUser: "",
    mqttServerPassword: "",
    mqttTopic: "teslamate/cars/1/+"
  },

  isLoaded: false,
  appRef: null,

  start: function () {
    console.log(
      this.name +
        ": Setting up connection to MQTT Broker " +
        this.config.mqttServerAddress +
        " at port " +
        this.config.mqttServerPort
    );
    this.sendSocketNotification("MQTT_CONFIG", this.config);
  },

  getDom: function () {
    const container = document.createElement("div");
    container.classList.add("mmm-teslamatelocation-app");
    return container;
  },

  createMap: function () {
    const mainDivs = document.getElementsByClassName(
      "mmm-teslamatelocation-app"
    );
    if (mainDivs.length > 0) {
      const sub = document.createElement("div");
      sub.style.width = this.config.width;
      sub.style.height = this.config.height;
      mainDivs[0].appendChild(sub);
      ReactDOM.render(<MapView zoomLevel={this.config.zoomLevel} />, sub);
    }
  },

  socketNotificationReceived: function (
    notification,
    payload: { topic: string; value: string }
  ) {
    console.log(
      this.name +
        " socketNotificationReceived " +
        notification +
        " Topic: " +
        payload.topic +
        " JSON: " +
        payload.value
    );
    if (notification === "MQTT_PAYLOAD") {
      if (payload != null) {
        const value = parseFloat(payload.value);
        if (payload.topic.endsWith("latitude")) {
          if ((window as any).setLatitude) {
            (window as any).setLatitude(value);
          }
        }
        if (payload.topic.endsWith("longitude")) {
          if ((window as any).setLongitude) {
            (window as any).setLongitude(value);
          }
        }
      }
    }
  },

  notificationReceived: function (notification, payload, sender) {
    if (notification === "DOM_OBJECTS_CREATED") {
      this.createMap();
    }
  },

  getStyles: function () {
    return [this.file("leaflet.css")];
  }
});
