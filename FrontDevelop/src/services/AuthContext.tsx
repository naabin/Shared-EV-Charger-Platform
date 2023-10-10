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
