import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
    id: string;
    email: string;
    role: 'CUSTOMER' | 'ADMIN';
    firstName?: string;
    lastName?: string;
    company?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    updateUser: (user: User) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check local storage on mount
        const storedToken = localStorage.getItem('fleetco_token');
        const storedUser = localStorage.getItem('fleetco_user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (newToken: string, newUser: User) => {
        localStorage.setItem('fleetco_token', newToken);
        localStorage.setItem('fleetco_user', JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
    };

    const logout = () => {
        localStorage.removeItem('fleetco_token');
        localStorage.removeItem('fleetco_user');
        setToken(null);
        setUser(null);
        navigate('/login');
    };

    const updateUser = (updatedUser: User) => {
        localStorage.setItem('fleetco_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, updateUser, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
