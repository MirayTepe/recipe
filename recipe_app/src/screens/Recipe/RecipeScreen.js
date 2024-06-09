import React, { useState, useEffect, useRef, useContext } from "react";
import { ScrollView, Text, View, Image, Dimensions, ActivityIndicator, TouchableOpacity, Modal, Platform, Share } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { WebView } from 'react-native-webview';
import BackButton from "../../components/BackButton/BackButton";
import { AuthContext } from '../../context/AuthContext';
import ViewIngredientsButton from "../../components/ViewIngredientsButton/ViewIngredientsButton";
import LikeButton from "../../components/LikeButton/LikeButton";
import CommentButton from "../../components/CommentButton/CommentButton";
import SaveButton from "../../components/SaveButton/SaveButton";
import ShareButton from "../../components/ShareButton/ShareButton";
import styles from "./styles";

const { width: viewportWidth } = Dimensions.get("window");

export default function RecipeScreen({ navigation, route }) {
    const { item } = route.params;
    const { accessToken, userId } = useContext(AuthContext);
    const [activeSlide, setActiveSlide] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recipe, setRecipe] = useState(null);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const slider1Ref = useRef(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://192.168.1.35:5001/api/recipes/${item._id}`);
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch recipe details');
                }
                setRecipe(data);

                if (data.likes && userId && data.likes.includes(userId)) {
                    setLiked(true);
                }
                if (data.saved && userId && data.saved.includes(userId)) {
                    setSaved(true);
                }
            } catch (error) {
                console.error('Error fetching recipe details:', error);
                setError(error.message || 'Failed to fetch recipe details');
            } finally {
                setLoading(false);
            }
        };

        if (item && item._id) {
            fetchRecipeDetails();
        } else {
            setError('Invalid recipe ID provided.');
        }
    }, [item._id, userId]);

    const renderImage = ({ item }) => (
        <TouchableOpacity>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: item }} />
            </View>
        </TouchableOpacity>
    );

    const handleLike = async () => {
        if (!userId) {
            alert('You need to be logged in to like this recipe.');
            return;
        }

        try {
            const response = await fetch(`http://192.168.1.35:5001/api/users/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({ userId, recipeId: item._id })
            });
            if (!response.ok) {
                throw new Error('Failed to like recipe');
            }
            setLiked(true);
        } catch (error) {
            console.error('Error liking recipe:', error);
        }
    };

    const handleSave = async () => {
        if (!userId) {
            alert('You need to be logged in to save this recipe.');
            return;
        }

        try {
            const response = await fetch(`http://192.168.1.35:5001/api/users/save-to-favorites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({ userId, recipeId: item._id })
            });
            if (!response.ok) {
                throw new Error('Failed to save recipe');
            }
            setSaved(true);
        } catch (error) {
            console.error('Error saving recipe:', error);
        }
    };

    const handlePressVideo = () => {
        setModalVisible(true);
    };

    const shareRecipe = async () => {
        try {
            const recipeLink = `myapp://recipe/${recipe._id}`;
            const message = `Check out this recipe: ${recipeLink}`;

            let shareOptions = {
                message: message,
            };

            if (Platform.OS === 'android') {
                const imageUrl = recipe.photosArray && recipe.photosArray.length > 0 ? recipe.photosArray[0] : null;
                if (imageUrl) {
                    shareOptions = {
                        ...shareOptions,
                        url: imageUrl,
                    };
                }
            }

            await Share.share(shareOptions);
        } catch (error) {
            console.error('Error sharing recipe:', error);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    if (!recipe) {
        return <Text>Recipe not found.</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <WebView
                    source={{ uri: `https://www.youtube.com/embed/${recipe.video_url.split('=')[1]}` }}
                    style={{ marginTop: 20 }}
                />
                <TouchableOpacity
                    style={{ padding: 20, backgroundColor: 'red' }}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={{ color: 'white', textAlign: 'center' }}>Close</Text>
                </TouchableOpacity>
            </Modal>
            <View style={styles.carouselContainer}>
                <View style={styles.carousel}>
                    {recipe.photosArray && recipe.photosArray.length > 0 && (
                        <Carousel
                            ref={slider1Ref}
                            data={recipe.photosArray}
                            renderItem={renderImage}
                            sliderWidth={viewportWidth}
                            itemWidth={viewportWidth}
                            inactiveSlideScale={1}
                            inactiveSlideOpacity={1}
                            firstItem={0}
                            loop={false}
                            autoplay={false}
                            autoplayDelay={500}
                            autoplayInterval={3000}
                            onSnapToItem={(index) => setActiveSlide(index)}
                            contentContainerCustomStyle={styles.carouselContent}
                        />
                    )}
                </View>

                <Pagination
                    dotsLength={recipe.photosArray ? recipe.photosArray.length : 0}
                    activeDotIndex={activeSlide}
                    containerStyle={styles.paginationContainer}
                    dotColor="rgba(255, 255, 255, 0.92)"
                    dotStyle={styles.paginationDot}
                    inactiveDotColor="white"
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={slider1Ref.current}
                    tappableDots={!!slider1Ref.current}
                />
            </View>

            <View style={styles.infoRecipeContainer}>
                <Text style={styles.infoRecipeName}>{recipe.title}</Text>
                <View style={styles.infoContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("RecipesList", {
                                category: recipe.category,
                                title: `${recipe.category.name} Recipes`,
                            });
                        }}
                    >
                        <Text style={styles.category}>
                            {recipe.category && recipe.category.name ? recipe.category.name.toUpperCase() : 'Category Not Available'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoRecipe}>{recipe.cookingTime} minutes</Text>
                </View>
                <View style={styles.infoContainer}>
                    <ViewIngredientsButton
                        onPress={() => {
                            navigation.navigate("Ingredient", {
                                ingredients: recipe.ingredients,
                                title: `${recipe.title} - Ingredients Needed`,
                            });
                        }}
                    />
                </View>
                <View style={styles.profileSection}>
                    <Image
                        style={styles.profileImage}
                        source={{ uri: recipe.createdBy.profilePicture }}
                    />
                    <Text style={styles.profileName}>{recipe.createdBy.fullName}</Text>
                    <TouchableOpacity style={styles.watchVideoButton} onPress={handlePressVideo}>
                        <Text style={styles.watchVideoButtonText}>Watch Video</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.buttonContainer}>
                        <LikeButton onPress={handleLike} liked={liked} />
                        <CommentButton onPress={() => { navigation.navigate("Comments", { recipeId: recipe._id }) }} />
                        <SaveButton onPress={handleSave} saved={saved} />
                        <ShareButton onPress={shareRecipe} recipeId={recipe._id} recipeTitle={recipe.title} recipeImage={recipe.photosArray[0]} />
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoDescription}>{recipe.description}</Text>
                </View>
            </View>
        </ScrollView>
    );
}
