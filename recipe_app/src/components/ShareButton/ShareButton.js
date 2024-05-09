import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from "prop-types";
import styles from "./styles";

const ShareButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <FontAwesome name="share-square-o" size={24} color="#000" />
      <Text style={styles.text}>Share</Text>
    </TouchableOpacity>
  );
};

ShareButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default ShareButton;
