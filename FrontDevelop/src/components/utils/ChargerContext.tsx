// ChargerContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { AuthContext } from '../../services/AuthContext';
interface ChargerContextProps {
    chargers: any[];
    loadChargers: () => void;
}

const ChargerContext = createContext<ChargerContextProps | undefined>(undefined);

interface ChargerProviderProps {
    children: ReactNode;
}

export const ChargerProvider: React.FC<ChargerProviderProps> = ({ children }) => {
    const [chargers, setChargers] = useState<any[]>([]);
    const { access_token } = useContext(AuthContext);

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
        <ChargerContext.Provider value={{ chargers, loadChargers }}>
            {children}
        </ChargerContext.Provider>
    );
};

export const useChargerData = () => {
    const context = useContext(ChargerContext);
    if (!context) {
        throw new Error('useChargerData must be used within a ChargerProvider');
    }
    return context;
};
