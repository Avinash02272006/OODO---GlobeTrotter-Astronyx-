'use client';

import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Fix for default marker icons in Leaflet with Next.js
const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface LeafletMapProps {
    center: { lat: number; lng: number };
    markerPosition: { lat: number; lng: number } | null;
}

function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 13);
    }, [center, map]);
    return null;
}

const LeafletMap = ({ center, markerPosition }: LeafletMapProps) => {
    return (
        <MapContainer
            center={[center.lat, center.lng]}
            zoom={13}
            style={{ width: '100%', height: '100%', background: '#121212' }}
            zoomControl={false}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            <ChangeView center={[center.lat, center.lng]} />
            {markerPosition && (
                <Marker position={[markerPosition.lat, markerPosition.lng]} icon={icon} />
            )}
        </MapContainer>
    );
};

export default LeafletMap;
