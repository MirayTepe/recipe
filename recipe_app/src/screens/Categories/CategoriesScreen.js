import React, { useState, useEffect } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";

export default function CategoriesScreen(props) {
  const { navigation } = props;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state
  const [error, setError] = useState(null);      // Add error state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://192.168.1.35:5001/api/category", { method: 'GET' });
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error('Error fetching categories:', response.statusText);
          setError('Error fetching categories: ' + response.statusText);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Error fetching categories: ' + error.message);
      } finally {
        setLoading(false);  // Set loading to false after fetching
      }
    };

    fetchCategories();
  }, []);

  const onPressCategory = (category) => {
    const title = category.name;
    navigation.navigate("RecipesList", { category, title });
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor="transparent" onPress={() => onPressCategory(item)}>
      <View style={[styles.categoriesItemContainer, { backgroundColor: '#fcfcfc' }]}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} />
        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>{item.description}</Text>
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
    <View style={styles.container}>
      <FlatList data={categories} renderItem={renderCategory} keyExtractor={(item) => `${item._id}`} />
    </View>
  );
}
