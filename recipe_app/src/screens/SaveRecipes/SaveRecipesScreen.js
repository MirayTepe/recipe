import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import styles from './styles';
import { AuthContext } from '../../context/AuthContext';
import NoSavedRecipesScreen from './NoSavedRecipesScreen';

const SaveRecipesScreen = ({ navigation }) => {
    const { accessToken, userId } = useContext(AuthContext);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadSavedRecipes = async () => {
            try {
                if (!accessToken || !userId) {
                    console.error('Token or UserId is missing');
                    setLoading(false);
                    return;
                }

                const response = await fetch(`http://192.168.1.35:5001/api/users/saved-recipes/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch saved recipes');
                }

                const data = await response.json();
                setSavedRecipes(data);
            } catch (error) {
                console.error('Error fetching saved recipes:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadSavedRecipes();
    }, [accessToken, userId]);

    const onPressRecipe = (item) => {
        navigation.navigate('Recipe', { item }); // RecipeScreen'e yönlendir
    };

    const renderRecipeItem = ({ item }) => (
        <TouchableOpacity style={styles.listItem} onPress={() => onPressRecipe(item)}>
            <Image style={styles.photo} source={{ uri: item.photo_url }} />
            <Text style={styles.recipeName}>{item.title}</Text>
            <Text>Details</Text>
        </TouchableOpacity>
    );

    const renderContent = () => {
        if (loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.container}>
                    <Text>Error occurred: {error.message}</Text>
                </View>
            );
        }

        if (savedRecipes.length === 0) {
            return <NoSavedRecipesScreen />;
        }

        return (
            <FlatList
                data={savedRecipes}
                keyExtractor={item => item._id}
                renderItem={renderRecipeItem}
            />
        );
    };

    return <View style={styles.container}>{renderContent()}</View>;
};

export default SaveRecipesScreen;
