import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const RecipeForm = ({ onRecipeCreated }) => {
    const [title, setTitle] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [servings, setServings] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://192.168.1.35:5001/api/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    photoUrl,
                    cookingTime,
                    ingredients,
                    description,
                    difficulty,
                    servings,
                    videoUrl,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create recipe');
            }

            const createdRecipe = await response.json();
            onRecipeCreated(createdRecipe);
        } catch (error) {
            console.error('Error creating recipe:', error);
            // Hata durumunda kullanıcıya bilgi verebiliriz
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <TextInput
                placeholder="Photo URL"
                value={photoUrl}
                onChangeText={setPhotoUrl}
                style={styles.input}
            />
            <TextInput
                placeholder="Cooking Time"
                value={cookingTime}
                onChangeText={setCookingTime}
                style={styles.input}
            />
            <TextInput
                placeholder="Ingredients"
                value={ingredients}
                onChangeText={setIngredients}
                style={styles.input}
            />
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />
            <TextInput
                placeholder="Difficulty"
                value={difficulty}
                onChangeText={setDifficulty}
                style={styles.input}
            />
            <TextInput
                placeholder="Servings"
                value={servings}
                onChangeText={setServings}
                style={styles.input}
            />
            <TextInput
                placeholder="Video URL"
                value={videoUrl}
                onChangeText={setVideoUrl}
                style={styles.input}
            />
            <Button title="Create Recipe" onPress={handleSubmit} />
        </View>
    );
};
