// CreateRecipeScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Image } from 'react-native';
import axios from 'axios';
import styles from './styles';
import CustomButton from '../../components/CustomButton/CustomButton';

export default function CreateRecipeScreen({ navigation }) {
    const [recipe, setRecipe] = useState({
        title: '',
        photo_url: '',
        cookingTime: '',
        description: '',
        servings: '',
        difficulty: '',
        category: '',
        ingredients: []
    });

    const handleIngredientChange = (text, index) => {
        const newIngredients = [...recipe.ingredients];
        newIngredients[index] = { ...newIngredients[index], quantity: text };
        setRecipe({ ...recipe, ingredients: newIngredients });
    };

    const handleCreateRecipe = async () => {
        try {
            const response = await axios.post('http://192.168.1.35:5001/api/recipes', recipe);
            console.log('Recipe created:', response.data);
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error creating recipe:', error);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
            <Image source={require("../../../assets/icon.png")} style={styles.logo} />
                <TextInput
                    style={styles.input}
                    placeholder="Recipe Title"
                    onChangeText={(text) => setRecipe({ ...recipe, title: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Photo URL"
                    onChangeText={(text) => setRecipe({ ...recipe, photo_url: text })}
                />
                <Image source={{ uri: recipe.photo_url }} style={styles.image} />
            </View>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Cooking Time (minutes)"
                    onChangeText={(text) => setRecipe({ ...recipe, cookingTime: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    onChangeText={(text) => setRecipe({ ...recipe, description: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Servings"
                    onChangeText={(text) => setRecipe({ ...recipe, servings: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Difficulty"
                    onChangeText={(text) => setRecipe({ ...recipe, difficulty: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Category"
                    onChangeText={(text) => setRecipe({ ...recipe, category: text })}
                />
                <Text style={styles.input}>Ingredients:</Text>
                {recipe.ingredients.map((ingredient, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        placeholder={`Ingredient ${index + 1}`}
                        onChangeText={(text) => handleIngredientChange(text, index)}
                    />
                ))}
                <CustomButton title="Malzeme Ekle" onPress={() => setRecipe({ ...recipe, ingredients: [...recipe.ingredients, {}] })} />
                <CustomButton title="Tarif ekle" onPress={handleCreateRecipe} />
            </View>
        </ScrollView>
    );
}
