import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoSavedRecipesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Kaydedilen tarif yok.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default NoSavedRecipesScreen;
