import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  recipeName: {
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#333',
    flex: 1, 
  },
  photo: {
    width: 80, 
    height: 80, 
    marginRight: 10, 
    borderRadius: 10,
  }
});

export default styles;
