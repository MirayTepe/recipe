import { useEffect } from 'react';
import axiosAuth from '../api/apiClient';
import useAuth from './useAuth';

const useAxiosPrivate = () => {
    const { accessToken } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosAuth.interceptors.request.use(
            config => {
                if (accessToken) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );

        return () => {
            axiosAuth.interceptors.request.eject(requestIntercept);
        };
    }, [accessToken]);

    return axiosAuth;
};

export default useAxiosPrivate;
