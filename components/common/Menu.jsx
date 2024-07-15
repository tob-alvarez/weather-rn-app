import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const Menu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const slideAnim = useRef(new Animated.Value(-width)).current; // Posición inicial fuera de la pantalla

    const toggleMenu = () => {
        Animated.timing(slideAnim, {
            toValue: isMenuOpen ? -width : 0, // Alterna entre fuera de la pantalla y visible
            duration: 300,
            useNativeDriver: true,
        }).start();

        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <View>
            <Pressable
                onPress={toggleMenu}
                style={({ pressed }) => [
                    {
                        opacity: pressed ? 0.5 : 1,
                    },
                    styles.button,
                ]}
            >
                <Ionicons name="menu" size={24} color="white" />
            </Pressable>

            <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}>
                <Text style={styles.menuText}>Menu Item 1</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
    },
    menu: {
        position: 'absolute',
        top: 50,
        left: 0,
        width: width * 0.9,
        backgroundColor: 'rgba(59, 180, 255, 0.99)',
        zIndex: 2,
        justifyContent: 'center',
        paddingHorizontal: 20,
        flex: 1,
        borderRadius: 6,
        height: height * 0.8,
        borderWidth: 1,
        borderColor: '#fff'
    },
    menuText: {
        color: '#FFFFFF',
        fontSize: 18,
        marginBottom: 20,
    },
});

export default Menu;
