import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import MenuButton from "../../components/MenuButton/MenuButton";
import SvgUri from 'react-native-svg-uri'; // SVG dosyalarını görüntülemek için

export default function DrawerContainer({ navigation }) {
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          title="HOME"
          onPress={() => {
            navigation.navigate("Home");
            navigation.closeDrawer();
          }}
        >
          <SvgUri
            width="24"
            height="24"
            source={require("../../../assets/icons/home.svg")}
          />
        </MenuButton>
        <MenuButton
          title="CATEGORIES"
          onPress={() => {
            navigation.navigate("Categories");
            navigation.closeDrawer();
          }}
        >
          <SvgUri
            width="24"
            height="24"
            source={require("../../../assets/icons/category.svg")}
          />
        </MenuButton>
        <MenuButton
          title="SEARCH"
          onPress={() => {
            navigation.navigate("Search");
            navigation.closeDrawer();
          }}
        >
          <SvgUri
            width="24"
            height="24"
            source={require("../../../assets/icons/search.svg")}
          />
        </MenuButton>
      </View>
    </View>
  );
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    closeDrawer: PropTypes.func.isRequired,
  }).isRequired,
};
