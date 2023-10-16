// AuthContext.tsx
import React, { createContext, useState } from 'react';

interface Address {
    id: number;
    street_address: string;
    lat: string;  // or number based on the actual data type
    lng: string;  // or number based on the actual data type
    suburb: string;
    post_code: string;
    country: string;
}
interface AuthContextProps {
    username: string | null;
    id: number | null;  // Changed the type to number as per your JSON structure
    first_name: string | null;
    last_name: string | null;
    address: Address | null;  // Updated the type to Address
    email: string | null;
    access_token: string | null;
    refresh_token: string | null;
    image: string | null;  // Added image field as per your JSON structure
    password: string | null;  // Added password field as per your JSON structure
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
        email: null,
        access_token: null,
        refresh_token: null,
        first_name: null,
        last_name: null,
        address: null,
        image: null,  // Added image field initialization
        password: null,  // Added password field initialization
    });

    return (
        <AuthContext.Provider value={{ ...authData, setAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };


