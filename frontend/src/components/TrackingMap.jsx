import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { connectSocket } from "../websocket/socket";
import L from "leaflet";

function TrackingMap({ delivery }) {
  const pickupPosition = [delivery.pickup_latitude, delivery.pickup_longitude];
  const dropPosition = [delivery.drop_latitude, delivery.drop_longitude];
  const routePositions = [pickupPosition, dropPosition];
  const deliveryId = delivery.id;
  const [driverPosition, setDriverPosition] = useState(pickupPosition);

  console.log(pickupPosition);
  
  function FitBounds({ positions }) {
    const map = useMap();
    useEffect(() => {
      map.fitBounds(positions);
    }, [positions]);
    return null;
  }

  useEffect(() => {
    connectSocket(deliveryId, (data) => {
      setDriverPosition([data.latitude, data.longitude]);
    });
  }, []);

  const driverIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",

    iconSize: [35, 35],
  });

  const pickupIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",

    iconSize: [35, 35],
  });

  const dropIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149059.png",

    iconSize: [35, 35],
  });

  return (
    <MapContainer
      center={pickupPosition}
      zoom={5}
      style={{
        height: "500px",
        width: "100%",
      }}
    >
      <FitBounds positions={[pickupPosition, dropPosition, driverPosition]} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={pickupPosition} icon={pickupIcon}>
        <Popup>Pickup Location</Popup>
      </Marker>
      <Marker position={dropPosition} icon={dropIcon}>
        <Popup>Drop Location</Popup>
      </Marker>
      <Marker position={driverPosition} icon={driverIcon}>
        <Popup>Driver Live Location</Popup>
      </Marker>
      <Polyline positions={routePositions} />
    </MapContainer>
  );
}

export default TrackingMap;
