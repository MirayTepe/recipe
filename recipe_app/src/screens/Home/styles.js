import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Arka plan rengi
  },
  touchable: {
    flex: 1,
    margin: 5,
    borderRadius: 5,
    overflow: "hidden",
  },
  categoriesItemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  photo: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 75,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  category: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
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
  }
});

export default styles;
