import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import placeholder from '../placeholder.png';

const Map = ({ locations }) => {
    useEffect(() => {
        if (locations.length === 0) return;

        const initialPosition = [locations[0].lat, locations[0].lng] || [50.049683, 19.944544];
        const map = L.map('map2').setView(initialPosition, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        const customIcon = L.icon({
            iconUrl: placeholder,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        locations.forEach((location) => {
            const { lat, lng, description } = location;
            L.marker([lat, lng], { icon: customIcon })
                .addTo(map)
                .bindPopup(description);
        });

        return () => {
            map.remove();
        };
    }, [locations]);

    return (
        <div id="map2" style={{ height: '500px', width: '100%', borderRadius: '10px', marginTop: '20px' }}></div>
    );
};

export default Map;
