import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

const IngredientsScreen = ({ route, navigation }) => {
  const { ingredients, title } = route.params;

  const handleIngredientPress = (item) => {
    navigation.navigate('IngredientDetails', { item: item.ingredientId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={() => handleIngredientPress(item)}
    >
      <Image style={styles.itemImage} source={{ uri: item.ingredientId.photo_url }} />
      <Text style={styles.itemName}>{item.ingredientId.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={ingredients}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default IngredientsScreen;
