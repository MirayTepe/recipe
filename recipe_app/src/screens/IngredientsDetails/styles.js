import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  detailsContainer: {
    marginBottom: 20
  },
  itemContainer: {
    marginBottom: 10
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  value: {
    fontSize: 16
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  loadingIndicator: {
    marginTop: 20
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center'
  },
  recipesContainer: {
    marginTop: 20
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  recipeItem: {
    marginBottom: 5
  },
  recipeText: {
    fontSize: 16
  }
});

export default styles;
