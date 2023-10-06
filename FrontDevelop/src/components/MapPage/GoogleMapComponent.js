import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import '../../styles/MapPage/GoogleMapComponent.css';

function GoogleMapComponent({ center, defaultProps, data = [], onPlaceSelect }) {
    const [value, setValue] = useState('');
    const [status, setStatus] = useState('IDLE');
    const [ready, setReady] = useState(true);

    const handleSelect = (description) => {
        if (onPlaceSelect) onPlaceSelect(description);
    }

    return (
        <div className="map-container">
            <div className="search-container">
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    placeholder="Search places"
                />
                <ul>
                    {status === 'OK' && data.map(({ id, description }) => (
                        <li key={id} onClick={() => handleSelect(description)}>
                            {description}
                        </li>
                    ))}
                </ul>
            </div>

            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDnRpQ2BiFb6skH2qkvgCW0Bthwb83PVf0' }}
                defaultCenter={center}
                center={center}
                defaultZoom={defaultProps.zoom}
            >
                {/* Existing map markers or other elements */}
            </GoogleMapReact>
        </div>
    );
}

export default GoogleMapComponent;

