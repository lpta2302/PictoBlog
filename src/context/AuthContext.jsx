import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../lib/appwrite/api';
import { useNavigate } from 'react-router-dom';

const INIT_USER = {
    $id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    imageId: '',
    bio: '',
};

const INIT_STATE = {
    user: INIT_USER,
    isAuthenticated: false,
    isLoading: false,
    setUser() {},
    setIsAuthenticated() {},
    checkAuthUser: async () => false,
};

const AuthContext = createContext(INIT_STATE);

export default function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(INIT_USER);
    const [isLoading, setIsLoading] = useState(true);

    async function checkAuthUser() {
        try {
            const { $id, name, username, email, bio, imageUrl, imageId } =
                await getCurrentUser();

            if (!$id) return false;
            else
                setUser({
                    $id,
                    name,
                    username,
                    email,
                    bio,
                    imageUrl,
                    imageId,
                });
            setIsAuthenticated(true);

            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (
            localStorage.getItem('cookieFallback') === '[]' ||
            localStorage.getItem('cookieFallback') === null
        )
            navigate('/sign-in');
        else checkAuthUser();
    }, []);

    const value = {
        user,
        isAuthenticated,
        isLoading,
        setUser,
        setIsAuthenticated,
        checkAuthUser,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export const useUserContext = () => useContext(AuthContext);
