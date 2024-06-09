import React, { useLayoutEffect, useState, useEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";

export default function RecipesListScreen(props) {
  const { navigation, route } = props;
  const { category } = route.params;

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerRight: () => <View />,
    });
  }, [navigation, route.params?.title]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`http://192.168.1.35:5001/api/recipes/recipebycategory?category=${category._id}`, { method: 'GET' });
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        } else {
          console.error('Error fetching recipes:', response.statusText);
          setError('Error fetching recipes: ' + response.statusText);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Error fetching recipes: ' + error.message);
      } finally {
        setLoading(false);  // Set loading to false after fetching
      }
    };

    fetchRecipes();
  }, [category]);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight 
    style={styles.touchable} 
    underlayColor="transparent"
    onPress={() => onPressRecipe(item)}
  >
    <View style={[styles.categoriesItemContainer, { backgroundColor: '#fcfcfc' }]}>
      <Image style={styles.photo} source={{ uri: item.photo_url }} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.category}>{item.category.name}</Text>
    </View>
  </TouchableHighlight>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
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
    <View>
      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={recipes} renderItem={renderRecipes} keyExtractor={(item) => `${item._id}`} />
    </View>
  );
}
