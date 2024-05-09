import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // eksik import
import PropTypes from "prop-types";
import styles from "./styles";

export default function CommentButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <FontAwesome name="comment-o" size={24} color="#000" />
      <Text style={styles.text}>Comment</Text>
    </TouchableOpacity>
  );
};

CommentButton.propTypes = {
  onPress: PropTypes.func,
};


