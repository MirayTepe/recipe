import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  touchable: {
    flex: 1,
    margin: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  categoriesItemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginBottom: 10,
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    width: 280,
    padding: 5,
    justifyContent: "space-between",
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: 'grey',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#EDEDED",
    color: "black",
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  listContent: {
    paddingBottom: 2,

  },
});

export default styles;
