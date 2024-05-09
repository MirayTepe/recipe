import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import { recipes } from '../../data/MockDataAPI'; // Mock verileri ekle

export default function SaveRecipesScreen({ navigation }) {
  const [savedRecipes, setSavedRecipes] = useState([
    { id: 1, name: 'Spaghetti Carbonara' },
    { id: 2, name: 'Chicken Parmesan' },
    { id: 3, name: 'Lasagna' },
  ]);

  const onPressRecipe = (recipeId) => {
    // Burada tarife tıklandığında detay sayfasına yönlendirme yapılıyor
    const selectedRecipe = recipes.find(recipe => recipe.recipeId === recipeId);
    navigation.navigate('RecipeScreen', { item: selectedRecipe });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => onPressRecipe(item.id)}>
      <Text style={styles.recipeName}>{item.name}</Text>
      <Text>Detaylar</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={savedRecipes}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
