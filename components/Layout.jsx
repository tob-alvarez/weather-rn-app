// Layout.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WeatherContext } from '../components/context/WeatherContext';

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
                    {error && <Text style={styles.error}>{error}</Text>}
                    {city && temperature !== null && (
                        <View style={styles.weatherContainer}>
                            <Text style={styles.city}>{city}</Text>
                        </View>
                    )}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 40
    },
    weatherContainer: {
        marginTop: 10,
        alignItems: 'center',
        width: '100%'
        
    },
    city: {
        fontSize: 18,
        fontFamily: 'outfit-bold',
        color: 'white'
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
});

export default Layout;
