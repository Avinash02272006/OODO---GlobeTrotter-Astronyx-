'use client';

import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 48.8566,
    lng: 2.3522,
};

interface TripMapProps {
    stops: any[];
}

const TripMap = ({ stops }: TripMapProps) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        const bounds = new window.google.maps.LatLngBounds();
        stops.forEach((stop) => {
            bounds.extend({ lat: stop.latitude, lng: stop.longitude });
        });
        if (stops.length > 0) {
            map.fitBounds(bounds);
        }
        setMap(map);
    }, [stops]);

    const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(null);
    }, []);

    const path = stops.map((stop) => ({
        lat: stop.latitude,
        lng: stop.longitude,
    }));

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={4}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                styles: mapStyles, // Custom dark mode styles
                disableDefaultUI: true,
            }}
        >
            {stops.map((stop, idx) => (
                <Marker
                    key={idx}
                    position={{ lat: stop.latitude, lng: stop.longitude }}
                    label={{
                        text: (idx + 1).toString(),
                        color: 'white',
                        fontWeight: 'bold',
                    }}
                />
            ))}
            <Polyline
                path={path}
                options={{
                    strokeColor: '#3b82f6',
                    strokeOpacity: 0.8,
                    strokeWeight: 3,
                }}
            />
        </GoogleMap>
    ) : (
        <div className="w-full h-full bg-gray-900 animate-pulse flex items-center justify-center">
            <span className="text-gray-500">Loading Map...</span>
        </div>
    );
};

const mapStyles = [
    {
        "elementType": "geometry",
        "stylers": [{ "color": "#212121" }]
    },
    {
        "elementType": "labels.icon",
        "stylers": [{ "visibility": "off" }]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#212121" }]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#000000" }]
    }
];

export default TripMap;
