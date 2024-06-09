import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, ScrollView, ActivityIndicator, Image } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import CustomButton from '../../components/CustomButton/CustomButton';
import styles from './styles';

const CommentScreen = ({ navigation, route }) => {
    const { accessToken, userId } = useContext(AuthContext);
    const { recipeId } = route.params;
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://192.168.1.35:5001/api/comments/${recipeId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }
                const data = await response.json();
                setComments(data || []);
            } catch (error) {
                console.error('Error fetching comments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [accessToken, recipeId]);

    const handleCommentSubmit = async () => {
        if (!content.trim()) {
            alert("Yorum boş olamaz.");
            return;
        }

        try {
            const response = await fetch(`http://192.168.1.35:5001/api/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({ content, recipe: recipeId, createdBy: userId })
            });

            if (!response.ok) {
                throw new Error('Failed to post comment');
            }

            const newComment = await response.json();
            setComments([...comments, newComment]);
            setContent('');
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <ScrollView>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <View key={index} style={styles.commentContainer}>
                                <View style={styles.commentHeader}>
                                    <Image
                                        style={styles.profileImage}
                                        source={{ uri: comment.createdBy.profilePicture }}
                                    />
                                    <Text style={styles.commentAuthor}>{comment.createdBy.fullName}</Text>
                                </View>
                                <Text style={styles.commentText}>{comment.content}</Text>
                                <Text style={styles.commentTime}>{new Date(comment.createdAt).toLocaleString()}</Text>
                            </View>
                        ))
                    ) : (
                        <Text>No comments available.</Text>
                    )}
                </ScrollView>
            )}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={content}
                    onChangeText={setContent}
                    placeholder="Type your comment..."
                />
                <CustomButton title="Yorum Yap" onPress={handleCommentSubmit} />
            </View>
        </View>
    );
};

export default CommentScreen;
