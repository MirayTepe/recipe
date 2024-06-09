import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  carouselContainer: {
    minHeight: 250,
    maxHeight: 500,
  },
  carousel: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 250,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 250,
  },
  paginationContainer: {
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 8,
    marginTop: 200,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0,
  },
  infoRecipeContainer: {
    flex: 1,
    margin: 25,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  watchVideoButton: {
    backgroundColor: '#f00', // Example color
    padding: 10,
  },
  watchVideoButtonText: {
    color: '#fff',
  },
  infoRecipe: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 10,
    color: '#2cd18a',
  },
  infoDescription: {
    textAlign: 'left',
    fontSize: 16,
    marginTop: 30,
    marginHorizontal: 15,
  },
  infoRecipeName: {
    fontSize: 28,
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileName: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  videoContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
