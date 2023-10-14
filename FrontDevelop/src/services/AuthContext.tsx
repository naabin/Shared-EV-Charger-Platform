// AuthContext.tsx
import React, { createContext, useState } from 'react';

interface AuthContextProps {
    username: string | null;
    id: string | null;
    access_token: string | null;
    refresh_token: string | null;
    setAuthData: (data: any) => void;
}

const AuthContext = createContext<Partial<AuthContextProps>>({});

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authData, setAuthData] = useState({
        username: null,
        id: null,
        access_token: null,
        refresh_token: null,
    });

    return (
        <AuthContext.Provider value={{ ...authData, setAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };


interface ChargerData {
    charger_type: {
        image: File | null;
        name: string;
        brand: string;
        power: string;
        port_type: string;
        amp: string;
        warranty: number;
    };
    address: {
        street_address: string;
        lat: string;
        lng: string;
        suburb: string;
        post_code: string;
        country: string;
    };
    name: string;
    number_of_stars: number;
    number_of_rating: string;
    renter: number;
}