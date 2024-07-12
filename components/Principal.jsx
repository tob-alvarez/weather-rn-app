// Layout.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { WeatherContext } from '../components/context/WeatherContext';

const Principal = () => {
    const { temperature, loading, error, description, humidity, pressure, icon, windSpeed } = useContext(WeatherContext);

    return (
        <View style={styles.container}>
            <Text style={styles.temperature}>{temperature} C°</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.details}>Humedad: {humidity}%</Text>
            <Text style={styles.details}>Viento: {windSpeed} m/s</Text>
            <Text style={styles.details}>Presión: {pressure} hPa</Text>
            {icon && (
                <Image
                    style={styles.icon}
                    source={{ uri: `http://openweathermap.org/img/wn/${icon}.png` }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 40
    },
    temperature: {
        fontSize: 50,
        color: 'white',
        fontFamily: 'outfit-bold'
    },
    description: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'outfit-bold'
    },
    icon:{
        width: 50,
        height: 50
    }
});

export default Principal;
