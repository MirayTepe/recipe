import React, { useLayoutEffect } from "react";
import { View, Image, Text, FlatList, TouchableHighlight } from "react-native";
import { getIngredientUrl, getRecipesByIngredient, getCategoryName } from "../../data/MockDataAPI";
import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';
import styles from './styles'

export default function IngredientScreen({ navigation, route }) {
  const ingredientId = route.params?.ingredient;
  const ingredientUrl = getIngredientUrl(ingredientId);
  const ingredientName = route.params?.name;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: ingredientName,
    });
  }, []);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor="transparent" onPress={() => onPressRecipe(item)}>
      <View style={styles.recipeContainer}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.photoIngredient} source={{ uri: ingredientUrl }} />
      </View>
      <Text style={styles.ingredientInfo}>{ingredientName}-Kullanıldığı Tarifler:</Text>
      <FlatList
        data={getRecipesByIngredient(ingredientId)}
        renderItem={renderRecipes}
        keyExtractor={(item, index) => `${item.recipeId}-${index}`}
        numColumns={2}
      />
    </View>
  );
}