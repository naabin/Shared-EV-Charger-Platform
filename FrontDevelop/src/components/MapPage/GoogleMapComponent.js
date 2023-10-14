import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import chargerIcon from '../../matirial/Image/charger.png';
import '../../styles/MapPage/GoogleMapComponent.css';


function GoogleMapComponent({ center, defaultProps, data = [], onPlaceSelect, onMapClick }) {
    const [value, setValue] = useState('');
    const [status, setStatus] = useState('IDLE');
    const [ready, setReady] = useState(true);
    const [selectedCharger, setSelectedCharger] = useState(null);  // State for selected charger info
    function ChargerMarker({ charger, onChargerClick }) {
        const { lat, lng } = charger.address;
        console.log("Latitude:", lat, "Longitude:", lng);  // Add this line

        return (
            <div
                lat={lat}
                lng={lng}
                onClick={() => onChargerClick(charger)}
                style={{ cursor: 'pointer' }}
            >
                <img src={chargerIcon} alt="Charger" width="30" height="30" />
            </div>
        );
    }



    const sampleChargers = [
        {
            charger_type: {
                image: null,
                name: 'Fast Charger',
                brand: 'ACME',
                power: '50 kW',
                port_type: 'Type 2',
                amp: '125A',
                warranty: 2,
            },
            address: {
                street_address: '123 Main Street',
                lat: -33.8688,
                lng: 151.2093,
                // lat: -0,
                // lng: 0,
                suburb: 'Sydney',
                post_code: '2000',
                country: 'Australia',
            },
            name: 'Charger 1',
            number_of_stars: 4,
            number_of_rating: '100',
            renter: 3,
        },
        {
            charger_type: {
                image: null,
                name: 'Standard Charger',
                brand: 'XYZ',
                power: '22 kW',
                port_type: 'Type 1',
                amp: '32A',
                warranty: 1,
            },
            address: {
                street_address: '456 Elm Street',
                lat: -33.9167,
                lng: 151.2333,
                suburb: 'Sydney',
                post_code: '2000',
                country: 'Australia',
            },
            name: 'Charger 2',
            number_of_stars: 5,
            number_of_rating: '50',
            renter: 2,
        },
        {
            charger_type: {
                image: null,
                name: 'Ultra Charger',
                brand: 'FastCharge',
                power: '100 kW',
                port_type: 'Type 3',
                amp: '250A',
                warranty: 3,
            },
            address: {
                street_address: '789 Oak Avenue',
                lat: -33.8679,
                lng: 151.2090,
                suburb: 'Sydney',
                post_code: '2000',
                country: 'Australia',
            },
            name: 'Charger 3',
            number_of_stars: 3,
            number_of_rating: '75',
            renter: 1,
        },
    ];


    const handleSelect = (description) => {
        if (onPlaceSelect) onPlaceSelect(description);
    }

    const handleMapClick = ({ lat, lng }) => {
        if (onMapClick) onMapClick(lat, lng);
    }

    const showChargerInfo = (charger) => {
        setSelectedCharger(charger);
    };



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
                onClick={handleMapClick}
            >

            {sampleChargers.map(charger => (
                <ChargerMarker
                    key={charger.name}
                    charger={charger}
                    onChargerClick={showChargerInfo}
                />
            ))}


            </GoogleMapReact>

            {selectedCharger && (
                <div className="charger-info-overlay">
                    <h3>{selectedCharger.name}</h3>
                    <p>{selectedCharger.address.street_address}</p>
                    {/* Include other charger details */}
                    <button onClick={() => setSelectedCharger(null)}>Close</button>
                </div>
            )}
        </div>
    );
}

export default GoogleMapComponent;

