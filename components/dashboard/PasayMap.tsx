'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function PasayMap() {
  const [geojson, setGeojson] = useState<any>(null);

  useEffect(() => {
    fetch(
      "https://portal.georisk.gov.ph/arcgis/rest/services/PSA/Barangay/MapServer/4/query?where=city_name='Pasay'&outFields=*&returnGeometry=true&f=geojson"
    )
      .then(res => res.json())
      .then(data => setGeojson(data));
  }, []);

  return (
    <MapContainer center={[14.535, 121.0]} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geojson && <GeoJSON data={geojson} style={{ color: '#00c5ff', weight: 1 }} />}
    </MapContainer>
  );
}
