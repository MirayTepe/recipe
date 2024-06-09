import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image } from 'react-native';
import HomeScreen from '../screens/Home/HomeScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import RecipeScreen from '../screens/Recipe/RecipeScreen';
import RecipesListScreen from '../screens/RecipesList/RecipesListScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import IngredientScreen from '../screens/Ingredient/IngredientScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import IngredientsDetailsScreen from '../screens/IngredientsDetails/IngredientsDetailsScreen';
import SettingScreen from '../screens/Setting/SettingScreen';
import SaveRecipesScreen from '../screens/SaveRecipes/SaveRecipesScreen';
import MyRecipesScreen from '../screens/MyRecipes/MyRecipeScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import RegisterScreen from '../screens/Register/RegisterScreen';
import { AuthProvider } from '../context/AuthContext'; 
import CreateRecipeScreen from "../screens/CreateRecipeScreen/CreateRecipeScreen";
import CommentScreen from "../screens/CommentScreen/CommentScreen";
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: {
                    fontWeight: 'bold',
                    textAlign: 'center',
                    alignSelf: 'center',
                    flex: 1,
                },
                headerTitle: () => (
                    <Image
                        source={require("../../assets/icon.png")}
                        style={{ width: 40, height: 40 }} // Stili burada tanımla
                    />
                ),
            }}
        >   
           
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Categories' component={CategoriesScreen} />
            <Stack.Screen name='Recipe' component={RecipeScreen} />
            <Stack.Screen name='RecipesList' component={RecipesListScreen} />
            <Stack.Screen name='Ingredient' component={IngredientScreen} />
            <Stack.Screen name='Search' component={SearchScreen} />
            <Stack.Screen name="SaveRecipes" component={SaveRecipesScreen} />
            <Stack.Screen name='IngredientsDetails' component={IngredientsDetailsScreen} />
            <Stack.Screen name='Setting' component={SettingScreen} />
            <Stack.Screen name='MyRecipes' component={MyRecipesScreen} />
            <Stack.Screen name='CreateRecipe' component={CreateRecipeScreen} />
            <Stack.Screen name='Comments' component={CommentScreen} />
            <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
           
        </Stack.Navigator>
    );
}

function DrawerStack() {
    return (
        <Drawer.Navigator
            drawerPosition='left'
            initialRouteName='Main'
            drawerStyle={{
                width: 250
            }}
            screenOptions={{ headerShown: false }}
            drawerContent={({ navigation }) => <DrawerContainer navigation={navigation} />}
        >
            <Drawer.Screen name='Main' component={MainNavigator} />
        </Drawer.Navigator>
    );
}

export default function AppContainer() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator headerMode="none">
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen name="Main" component={DrawerStack} /> 
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
}
