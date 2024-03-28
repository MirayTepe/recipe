import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as React from 'react';


const WelcomeScreen = ({ navigation }) => {
    const [loading, setLoading] = React.useState(false);

    const handleStartPress = () => {
        setLoading(true);
      
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('Login'); 
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
           
            <TouchableOpacity style={styles.button} onPress={handleStartPress}>
                {loading ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <Text style={styles.buttonText}>Başla</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginStart: 10
    },
    logo: {
        width: "100%",
        height: "70%",
    },

    button: {
        marginTop: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#FF5757',
        borderRadius: 12,
        width: "85%",
        height: "8%",
        // borderWidth: 4, 
        borderColor: '#000', 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
