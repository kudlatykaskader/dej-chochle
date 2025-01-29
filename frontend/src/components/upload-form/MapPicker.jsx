// src/components/MapPicker.js

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getLocationInfo } from '../../apis/osm';
import placeholder from '../../placeholder.png';
import { Box } from '@mui/material';

// Custom icon for the marker
const customIcon = L.icon({
  iconUrl: placeholder,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapPicker = ({ onLocationSelect, initialPosition, zoom = 5 }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Initialize the map only once
    if (!mapRef.current) {
      mapRef.current = L.map('map-picker').setView(initialPosition, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapRef.current);

      // Handle map clicks
      const onMapClick = async (e) => {
        const { lat, lng } = e.latlng;

        // Remove existing marker
        if (markerRef.current) {
          mapRef.current.removeLayer(markerRef.current);
        }

        // Add new marker
        markerRef.current = L.marker([lat, lng], { icon: customIcon }).addTo(mapRef.current);

        try {
          const { country, city } = await getLocationInfo(lat, lng);
          const locationString = `${country}, ${city}`;

          // Pass the selected location back to the parent component
          onLocationSelect({
            lat,
            lng,
            location: locationString,
          });
        } catch (error) {
          console.error('Error fetching location info:', error);

          // Fallback in case of API error
          onLocationSelect({
            lat,
            lng,
            location: `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
          });
        }
      };

      mapRef.current.on('click', onMapClick);
    }

    return () => {};
  }, [initialPosition, zoom, onLocationSelect]);

  return (
    <Box id="map-picker" sx={{ width: '100%', height: 350, borderRadius: 2, mt: 2 }} />
  );
};

MapPicker.propTypes = {
  onLocationSelect: PropTypes.func.isRequired,
  initialPosition: PropTypes.array,
  zoom: PropTypes.number,
};

export default MapPicker;
