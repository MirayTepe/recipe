import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', // soft pink background
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#000', // bright pink border
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF', // white input background
    width: width - 40, // make the input field width match the screen width minus 40px padding
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 10,
    borderRadius: 10, // add a slight rounded corner
    borderColor: '#000', // pastel pink border
    borderWidth: 2,
  },
  button: {
    backgroundColor: '#FF5757', // bright pink button background
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF', // white button text
    fontSize: 16,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});