import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');


  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="İsim"
        onChangeText={setFirstName}
        value={firstName}
        secureTextEntry={true}
      />
        <TextInput
        style={styles.input}
        placeholder="Soyisim"
        onChangeText={setLastName}
        value={lastName}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        onChangeText={setUsername}
        value={username}
      />
        <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        secureTextEntry={true}
      />
       
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
   
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>
 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  logo: {
    width: '60%',
    height: '30%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#FF5757',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 10,
  },
  linkButtonText: {
    color: '#007BFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
