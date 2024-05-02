import React from "react";
import { TouchableHighlight, Image, } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import SvgUri from 'react-native-svg-uri';

const BackButton = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} style={styles.btnContainer}>
      <SvgUri
        width="24"
        height="24"
        source={require("../../../assets/icons/backArrow.svg")} // SVG dosyasının yolu
      />
    </TouchableHighlight>
  );
}

BackButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
}; 

