import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import CustomButton from '../../components/CustomButton/CustomButton';
import styles from './styles'; // Stil dosyasını import et

export default function ProfileScreen({ navigation }) {
  const { accessToken, userId } = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://192.168.1.35:5001/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const userData = response.data;
      setUserName(userData.userName);
      setEmail(userData.email);
      setProfilePicture(userData.profilePicture); // Profil resmini güncelle
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://192.168.1.35:5001/api/users/${userId}`, {
        userName,
        email,
        password
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <View style={styles.container}> 
      <Image
        source={{ uri: profilePicture }} // Profil resmi URI'sini kullan
        style={styles.profilePicture} // Stili burada tanımla
      />
      <Text>Username:</Text>
      <TextInput
        style={styles.input} 
        value={userName}
        onChangeText={setUserName}
      />
      <Text>Email:</Text>
      <TextInput
        style={styles.input} 
        value={email}
        onChangeText={setEmail}
      />
      <Text>Password:</Text>
      <TextInput
        style={styles.input} 
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <CustomButton
        title="Save Changes"
        onPress={handleSaveChanges}
      />
    </View>
  );
}
