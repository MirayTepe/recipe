import React from "react";
import { View, Image } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import MenuButton from "../../components/MenuButton/MenuButton";
import CreateRecipeButton from "../../components/CreateRecipeButton/CreateRecipeButton"; 

export default function DrawerContainer({ navigation }) {
  const handleCreateRecipe = () => {
    navigation.navigate("CreateRecipe");
    navigation.closeDrawer();
  };

  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/icon.png")}
          style={{ width: 40, height: 40 }}
        />
        <CreateRecipeButton onPress={handleCreateRecipe} />
    
        <MenuButton
          title="ANASAYFA"
          source={require("../../../assets/icons/home.png")}
          onPress={() => {
            navigation.navigate("Home");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="PROFİL"
          source={require("../../../assets/icons/profile.png")}
          onPress={() => {
             navigation.navigate("ProfileScreen");
             navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="KATEGORİLER"
          source={require("../../../assets/icons/category.png")}
          onPress={() => {
            navigation.navigate("Categories");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="ARA"
          source={require("../../../assets/icons/search.png")}
          onPress={() => {
            navigation.navigate("Search");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="AYARLAR"
          source={require("../../../assets/icons/setting.png")}
          onPress={() => {
            navigation.navigate("Setting");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="KAYITLI TARİFLER"
          source={require("../../../assets/icons/save.png")}
          onPress={() => {
            navigation.navigate("SaveRecipes");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="PAYLAŞILAN TARİFLER"
          source={require("../../../assets/icons/food.png")}
          onPress={() => {
            navigation.navigate("MyRecipes");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="ÇIKIŞ YAP"
          source={require("../../../assets/icons/LogOut.png")}
          onPress={() => {
            navigation.navigate("Login");
            navigation.closeDrawer();
          }}
        />
      </View>
    </View>
  );
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    closeDrawer: PropTypes.func.isRequired,
  }),
};
