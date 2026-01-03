'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Next.js
const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface TripMapProps {
    stops: any[];
}

// Component to handle map bounds and resizing
function MapBounds({ stops }: { stops: any[] }) {
    const map = useMap();

    useEffect(() => {
        if (stops.length > 0) {
            const bounds = L.latLngBounds(stops.map(stop => [stop.latitude, stop.longitude]));
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [stops, map]);

    return null;
}

const TripMap = ({ stops }: TripMapProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="w-full h-full bg-gray-900 animate-pulse flex items-center justify-center">
                <span className="text-gray-500">Initializing Map...</span>
            </div>
        );
    }

    const path = stops.map((stop) => [stop.latitude, stop.longitude] as [number, number]);
    const center = stops.length > 0
        ? [stops[0].latitude, stops[0].longitude] as [number, number]
        : [48.8566, 2.3522] as [number, number];

    return (
        <div className="w-full h-full relative">
            <MapContainer
                center={center}
                zoom={4}
                style={{ width: '100%', height: '100%', background: '#121212' }}
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />

                <MapBounds stops={stops} />

                {stops.map((stop, idx) => (
                    <Marker
                        key={idx}
                        position={[stop.latitude, stop.longitude]}
                        icon={icon}
                    >
                        {/* You can add a Popup here if needed */}
                    </Marker>
                ))}

                {stops.length > 1 && (
                    <Polyline
                        positions={path}
                        pathOptions={{
                            color: '#3b82f6',
                            weight: 3,
                            opacity: 0.8,
                            dashArray: '10, 10',
                            lineCap: 'round'
                        }}
                    />
                )}
            </MapContainer>

            {/* Custom Zoom Controls */}
            <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
                <button
                    onClick={() => window.dispatchEvent(new CustomEvent('leaflet-zoom-in'))}
                    className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all"
                >
                    +
                </button>
                <button
                    onClick={() => window.dispatchEvent(new CustomEvent('leaflet-zoom-out'))}
                    className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all"
                >
                    -
                </button>
            </div>
        </div>
    );
};

export default TripMap;

