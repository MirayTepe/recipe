import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from "prop-types";
import styles from "./styles";

const SaveButton = ({ onPress, saved }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <FontAwesome name={saved ? 'bookmark' : 'bookmark-o'} size={24} color="#000" />
      <Text style={styles.text}>{saved ? 'Saved' : 'Save'}</Text>
    </TouchableOpacity>
  );
};

SaveButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  saved: PropTypes.bool.isRequired,
};

export default SaveButton;
