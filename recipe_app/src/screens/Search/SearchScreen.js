import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableHighlight, Pressable } from "react-native";
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage";
import { TextInput } from "react-native-gesture-handler";

export default function SearchScreen(props) {
  const { navigation } = props;
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerTitle: () => (
        <View style={styles.searchContainer}>
          <Pressable onPress={() => handleSearch(value)}>
            <Image style={styles.searchIcon} source={require("../../../assets/icons/search.png")} />
          </Pressable>
          <TextInput
            style={styles.searchInput}
            onChangeText={(text) => setValue(text)}
            value={value}
            placeholder="Tarif ara..."
            placeholderTextColor="#999"
            onSubmitEditing={() => handleSearch(value)}
          />
          <Pressable onPress={() => handleSearch("")}>
            <Image style={styles.searchIcon} source={require("../../../assets/icons/close.png")} />
          </Pressable>
        </View>
      ),
      headerRight: () => <View />,
    });
  }, [value]);

  useEffect(() => {}, [value]);

  const handleSearch = async (text) => {
    setValue(text);
    setError(null);
    if (text === "") {
      setData([]);
      return;
    }
    try {
      const response = await fetch(`http://192.168.1.35:5001/api/recipes/search?query=${text}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("Veri alınırken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight  
    style={styles.touchable} 
    underlayColor="transparent"
    onPress={() => onPressRecipe(item)}>
      <View style={[styles.categoriesItemContainer, { backgroundColor: '#fcfcfc' }]}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.category.name}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        data={data}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item._id}`}
      />
    </View>
  );
}
