import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import styles from './styles';
import { AuthContext } from '../../context/AuthContext';
import CustomButton from '../../components/CustomButton/CustomButton';

export default function MyRecipeScreen({ navigation }) {
    const { userId, accessToken } = useContext(AuthContext);
    const [userRecipes, setUserRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchUserRecipes = async () => {
            try {
                const response = await axios.get(`http://192.168.1.35:5001/api/recipes/by-user/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setUserRecipes(response.data || []);
            } catch (error) {
                console.error('Error fetching user recipes:', error);
                const errorMessage = error.response ? `${error.response.status} - ${error.response.data.message}` : 'Network error: Unable to reach the server. Please try again later.';
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        if (userId && accessToken) {
            fetchUserRecipes();
        }
    }, [userId, accessToken]);

    const onPressRecipe = (recipeId) => {
        navigation.navigate('Recipe', { recipeId });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.listItem} onPress={() => onPressRecipe(item._id)}>
            <Image source={{ uri: item.photo_url }} style={styles.recipeImage} />
            <Text style={styles.recipeName}>{item.title}</Text>
            <Text> Details</Text>
            
        </TouchableOpacity>
    );

    if (!userId || !accessToken) {
        return (
            <View style={styles.container}>
                <Text>Please login to view your recipes</Text>
                {/* Add navigation to login screen */}
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {userRecipes.length === 0 ? (
                <View style={styles.noRecipeContainer}>
                    <Text>No recipes shared yet!</Text>
                    <CustomButton
                        title="Add New Recipe"
                        onPress={() => navigation.navigate('CreateRecipe')}
                    />
                </View>
            ) : (
                <FlatList
                    data={userRecipes}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={renderItem}
                />
            )}
            <CustomButton
                title="Add New Recipe"
                onPress={() => navigation.navigate('CreateRecipe')}
            />
        </View>
    );
}
