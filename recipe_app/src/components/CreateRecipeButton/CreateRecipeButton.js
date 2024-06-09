import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from "prop-types";
import styles from "./styles";



function CreateRecipeButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <FontAwesome name="plus" size={24} color="#000" />
      <Text style={styles.text}>Paylaş</Text>
    </TouchableOpacity>
  );
}

CreateRecipeButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default CreateRecipeButton;
