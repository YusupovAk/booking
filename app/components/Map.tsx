'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MapProps {
  lat?: number;
  lng?: number;
  positions?: { lat: number; lng: number; popup?: string }[];
  center?: [number, number];
  zoom?: number;
}

const Map: React.FC<MapProps> = ({ lat, lng, positions, center, zoom = 5 }) => {
  if (typeof window === 'undefined') {
    return null; // Don't render on the server
  }

  const markers = positions || (lat && lng ? [{ lat, lng, popup: 'Location' }] : []);
  const mapCenter: [number, number] = center || (markers.length > 0 ? [markers[0].lat, markers[0].lng] : [41.2995, 69.2401]);

  return (
    <MapContainer center={mapCenter} zoom={zoom} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((pos, index) => (
        <Marker key={index} position={[pos.lat, pos.lng]}>
          <Popup>
            {pos.popup || 'Location'}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
