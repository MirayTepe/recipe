import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import MenuButton from "../../components/MenuButton/MenuButton";

export default function DrawerContainer(props) {
  const { navigation } = props;
  return (
    <View style={styles.content}>
      <View style={styles.container}>
       <MenuButton
          title="PROFİL"
          source={require("../../../assets/icons/profile.png")}
          onPress={() => {
            // navigation.navigate("MyRecipes");
            // navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="ANASAYFA"
          source={require("../../../assets/icons/home.png")}
          onPress={() => {
            navigation.navigate("Home");
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
      
      </View>
    </View>
  );
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
