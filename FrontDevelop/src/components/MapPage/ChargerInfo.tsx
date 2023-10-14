// ChargerInfo.tsx

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../services/AuthContext';

const ChargerInfo: React.FC = () => {
    const [chargers, setChargers] = useState<Array<any>>([]);
    const { access_token } = useContext(AuthContext);

    useEffect(() => {
        loadChargers();
    }, [access_token]);

    const loadChargers = async () => {
        try {
            const data = await fetchChargerData();
            setChargers(data);
        } catch (err) {
            console.error('Failed to load charger data:', err);
        }
    };

    const fetchChargerData = async () => {
        const response = await fetch('http://localhost:8000/chargers/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch charger data from server');
        }

        return response.json();
    };

    return (
        <div>
            <h2>Charger Information</h2>
            {chargers.map(charger => renderCharger(charger))}
        </div>
    );
};

const renderCharger = (charger: any) => (
    <div key={charger.id}>
        <h3>{charger.name}</h3>
        <img src={charger.charger_type.image?.url} alt={charger.charger_type.name} />
        <p>Brand: {charger.charger_type.brand}</p>
        <p>Power: {charger.charger_type.power}</p>
        <p>Port Type: {charger.charger_type.port_type}</p>
        <p>Address: {charger.address.street_address}, {charger.address.suburb}, {charger.address.post_code}, {charger.address.country}</p>
        <p>Coordinates: Latitude - {charger.address.lat}, Longitude - {charger.address.lng}</p>
        <p>Number of Ratings: {charger.number_of_rating}</p>
        <p>Average Stars: {charger.number_of_stars}</p>
        <p>Renter: {charger.renter ? `Renter ID: ${charger.renter}` : 'Not rented yet'}</p>
        <hr />
    </div>
);

export default ChargerInfo;
