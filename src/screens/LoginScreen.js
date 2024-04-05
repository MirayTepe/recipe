import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const handleLogin = () => {
    // Giriş işlemleri burada yapılacak
    console.log('Kullanıcı adı:', username);
    console.log('Şifre:', password);
    // Örneğin, burada bir API'ye istek yapılabilir veya yerel depolama kullanılabilir.
  };

  const handleRememberMe = () => {
    console.log('Beni hatırla tıklandı');
  };

  const handleForgotPassword = () => {
    console.log('Şifremi unuttum tıklandı');
  };

 
  const handleSignUp = () => {
    setLoading(true);
  
    setTimeout(() => {
        setLoading(false);
        navigation.navigate('Register'); 
    })
  };
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkButton} onPress={handleRememberMe}>
        <Text style={styles.linkButtonText}>Beni Hatırla</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkButton} onPress={handleForgotPassword}>
        <Text style={styles.linkButtonText}>Şifremi Unuttum</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkButton} onPress={handleSignUp}>
        <Text style={styles.linkButtonText}>Kayıt Ol</Text>
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
    width: '80%',
    height: '50%',
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

export default LoginScreen;
