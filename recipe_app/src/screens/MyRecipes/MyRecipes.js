// MyRecipes.js

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import styles from './styles';
import { recipes } from '../../data/MockDataAPI'; // Mock verileri ekle

export default function MyRecipes({ navigation }) {
  const [userRecipes, setUserRecipes] = useState([
    { id: 1, name: 'Pasta Carbonara', userId: 1 },
    { id: 2, name: 'Chicken Parmesan', userId: 1 },
    { id: 3, name: 'Lasagna', userId: 2 },
  ]);

  const onPressRecipe = (recipeId) => {
    // Sahte verilerdeki tarifi bul
    const selectedRecipe = recipes.find(recipe => recipe.recipeId === recipeId);
    // Tarifin detaylarını göstermek için navigasyon yapısı kullan
    navigation.navigate('RecipeScreen', { item: selectedRecipe });
  };

  const addNewRecipe = () => {
    // Yeni bir tarif eklemek için sahte veri oluştur
    const newRecipe = {
      id: userRecipes.length + 1, // Yeni tarifin ID'si sonraki boş ID'ye eşit olacak
      name: `New Recipe ${userRecipes.length + 1}`, // Yeni tarifin adı önceden belirlenmiş bir formata sahip olacak
      userId: 1, // Yeni tarifi ekleyen kullanıcının ID'si burada olacak
    };
    // Yeni tarifi kullanıcının tarifleri listesine ekle
    setUserRecipes([...userRecipes, newRecipe]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => onPressRecipe(item.id)}>
      <Text style={styles.recipeName}>{item.name}</Text>
      <Text>Details</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={userRecipes}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
      <Button title="Add New Recipe" onPress={addNewRecipe} />
    </View>
  );
}
