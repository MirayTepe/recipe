import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const IngredientDetailsScreen = ({ route }) => {
  const { item } = route.params;
  const [ingredient, setIngredient] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIngredientDetails = async () => {
      if (!item || !item.id) {
        setLoading(false);
        return;
      }

      try {
        const ingredientResponse = await axios.get(`http://192.168.1.35:5001/api/ingredient/${item.id}`);
        setIngredient(ingredientResponse.data);

        const recipesResponse = await axios.get(`http://192.168.1.35:5001/api/recipes/ingredient/${item.id}`);
        setRecipes(recipesResponse.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchIngredientDetails();
  }, [item]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
  }

  if (!ingredient) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Ingredient Details</Text>
        <Text style={styles.errorText}>Ingredient details not available</Text>
      </View>
    );
  }

  const renderRecipes = () => {
    if (recipes.length > 0) {
      return (
        <View style={styles.recipesContainer}>
          <Text style={styles.subTitle}>Recipes using this Ingredient:</Text>
          {recipes.map((recipe) => (
            <View key={recipe._id} style={styles.recipeItem}>
              <Text style={styles.recipeText}>{recipe.title}</Text>
            </View>
          ))}
        </View>
      );
    }
    return null;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ingredient Details</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{ingredient.name}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{ingredient.description}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>Calories:</Text>
          <Text style={styles.value}>{ingredient.calories}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>Photo:</Text>
          <Image style={styles.image} source={{ uri: ingredient.photo_url }} />
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>Protein:</Text>
          <Text style={styles.value}>{ingredient.nutrients.protein}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>Fat:</Text>
          <Text style={styles.value}>{ingredient.nutrients.fat}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>Carbohydrates:</Text>
          <Text style={styles.value}>{ingredient.nutrients.carbohydrates}</Text>
        </View>
      </View>
      {renderRecipes()}
    </ScrollView>
  );
};

export default IngredientDetailsScreen;
