import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosAuth from '../api/apiClient'; // Adjust path as needed

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedAccessToken = await AsyncStorage.getItem('accessToken');
                const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
                const storedUserId = await AsyncStorage.getItem('userId');
                if (storedAccessToken && storedRefreshToken && storedUserId) {
                    setAccessToken(storedAccessToken);
                    setRefreshToken(storedRefreshToken);
                    setUserId(storedUserId);
                }
            } catch (error) {
                console.error('Error loading user data', error);
            }
        };

        loadUserData();
    }, []);

    const login = async (response) => {
        const { accessToken, refreshToken, userId } = response;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUserId(userId);

        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        await AsyncStorage.setItem('userId', userId);
    };

    const logout = async () => {
        setAccessToken(null);
        setRefreshToken(null);
        setUserId(null);

        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        await AsyncStorage.removeItem('userId');
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
