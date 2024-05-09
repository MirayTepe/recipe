import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from "prop-types";
import styles from "./styles";

function LikeButton({ onPress, liked }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <FontAwesome name={liked ? 'heart' : 'heart-o'} size={24} color={liked ? '#FF0000' : '#000'} />
      <Text style={styles.text}>{liked ? 'Liked' : 'Like'}</Text>
    </TouchableOpacity>
  );
}

LikeButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  liked: PropTypes.bool.isRequired,
};

export default LikeButton;
