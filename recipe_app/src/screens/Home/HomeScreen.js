import React, { useLayoutEffect, useState, useEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, ScrollView, Dimensions } from "react-native";
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage";

const { width: viewportWidth } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, [navigation]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://192.168.1.35:5001/api/recipes', { method: 'GET' });
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        } else {
          console.error('Failed to fetch recipes');
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

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
        {/* Kişinin profil fotoğrafı ve adı-soyadı */}
         <View style={styles.profileSection}>
                    <Image
                        style={styles.profileImage}
                        source={{ uri: item.createdBy.profilePicture }}
                    />
                    <Text style={styles.profileName}>{item.createdBy.fullName}</Text>
                
         </View>
        </View>
    
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList 
        vertical 
        showsVerticalScrollIndicator={false} 
        numColumns={1} // Tek sütun olarak güncellendi
        data={recipes} 
        renderItem={renderRecipes} 
        keyExtractor={(item) => `${item._id}`} 
      />
    </View>
  );
}
