import axios from 'axios';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export class GoogleMapsService {
    static async getDistanceMatrix(origins: string[], destinations: string[]) {
        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
                params: {
                    origins: origins.join('|'),
                    destinations: destinations.join('|'),
                    key: GOOGLE_MAPS_API_KEY,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching distance matrix:', error);
            throw error;
        }
    }

    static async getDirections(origin: string, destination: string, waypoints: string[] = []) {
        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
                params: {
                    origin,
                    destination,
                    waypoints: waypoints.join('|'),
                    key: GOOGLE_MAPS_API_KEY,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching directions:', error);
            throw error;
        }
    }

    static async getPlaceDetails(placeId: string) {
        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
                params: {
                    place_id: placeId,
                    key: GOOGLE_MAPS_API_KEY,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching place details:', error);
            throw error;
        }
    }
}
