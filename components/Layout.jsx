// Layout.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { WeatherContext } from '../components/context/WeatherContext';
import Menu from './common/Menu';
import { Entypo } from '@expo/vector-icons';

const Layout = () => {
    const { city, temperature, loading, error, permissionDenied, handlePermissionRequest } = useContext(WeatherContext);

    return (
        <View style={styles.container}>
            {permissionDenied ? (
                <View style={styles.permissionContainer}>
                    <Text style={styles.permissionText}>
                        La aplicación necesita acceso a tu ubicación para mostrar el clima local.
                    </Text>
                    <TouchableOpacity style={styles.permissionButton} onPress={handlePermissionRequest}>
                        <Text style={styles.permissionButtonText}>Permitir acceso a la ubicación</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    {loading && <Text>Cargando...</Text>}
                        <View style={styles.weatherContainer}>
                            <Menu />
                            <Text style={styles.city}>{city}</Text>
                            <Entypo name="location-pin" size={24} color="white" />
                        </View>
                    {error && <Text style={styles.error}>{error}</Text>}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    weatherContainer: {
        marginTop: 10,
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    city: {
        fontSize: 24,
        fontFamily: 'outfit-bold',
        color: 'white',
        marginStart: 15
    },
    error: {
        color: 'red',
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    permissionText: {
        textAlign: 'center',
        marginBottom: 20,
    },
    permissionButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
    },
    permissionButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    buttonH:{
        borderRadius: 5,
        alignItems: 'center',
    }
});

export default Layout;
