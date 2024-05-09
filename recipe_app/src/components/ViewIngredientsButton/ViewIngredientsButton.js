import React from 'react';
import { TouchableHighlight, Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default function ViewIngredientsButton(props) {
  return (
    <TouchableHighlight
      underlayColor='#FF5757' 
      onPress={props.onPress}
      style={[styles.container, props.buttonStyle]}
    >
      <View>
        <Text style={styles.text}>İçindekiler</Text>
      </View>
    </TouchableHighlight>
  );
}

ViewIngredientsButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
  buttonStyle: PropTypes.object 
};
