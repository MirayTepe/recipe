import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
import { AuthContext } from '../../context/AuthContext';
import userApi from '../../api/userApi'; // Adjust path as needed

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await userApi.loginUser(email, password);
            await login(response);
            setLoading(false);
            navigation.navigate('Main');
        } catch (error) {
            console.error("Login error:", error);
            setLoading(false);
            Alert.alert('Login Error', error.response?.data?.message || error.message || 'An unexpected error occurred');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require("../../../assets/icon.png")} style={styles.logo} />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#FF5757" />
            ) : (
                <>
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

export default LoginScreen;
