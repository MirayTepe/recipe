import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    borderBottomWidth: 0.4,
    marginBottom: 10,
    borderBottomColor: "grey",
  },
  photoIngredient: {
    width: '100%',
    height: 250,
    alignSelf: 'center'
  },
  ingredientInfo: {
    color: 'black',
    margin: 10,
    fontSize: 19,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  recipeContainer: {
    ...RecipeCard.container,
    marginVertical: 10,
    flex: 1,
    backgroundColor: '#fcfcfc',
    borderRadius: 20, 
    overflow: 'hidden',
  },
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category
});

export default styles;
