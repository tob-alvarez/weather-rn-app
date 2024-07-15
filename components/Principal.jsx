// Layout.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { WeatherContext } from '../components/context/WeatherContext';

const Principal = () => {
    const { temperature, loading, error, description, humidity, icon, windSpeed, feelsLike, tempMax, tempMin } = useContext(WeatherContext);

    return (
        <View style={styles.container}>
            <Text style={styles.temperature}>{temperature}°</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>

                <Text style={styles.description}>{description}</Text>
                {icon && (
                    <Image
                        style={styles.icon}
                        source={{ uri: `http://openweathermap.org/img/wn/${icon}.png` }}
                    />
                )}
            </View>
            <Text style={styles.details}>{tempMax}° / {tempMin}°  Feels like: {feelsLike}°</Text>
            {/* <Text style={styles.details}>Humedad: {humidity}%</Text> */}
            {/* <Text style={styles.details}>Viento: {windSpeed} m/s</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
    },
    temperature: {
        fontSize: 70,
        color: 'white',
        fontFamily: 'outfit-bold'
    },
    description: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'outfit',
    },
    details: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'outfit'
    },
    containerIcon: {
        alignItems: 'flex-start'
    },
    icon: {
        width: 40,
        height: 40
    }
});

export default Principal;
