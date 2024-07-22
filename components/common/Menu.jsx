import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Dimensions, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WeatherContext } from '../context/WeatherContext';
import getTime from '../../helpers/getTime';
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const Menu = () => {
    const { getWeatherByCity, searchHistory, removeCityFromHistory } = useContext(WeatherContext); 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const slideAnim = useRef(new Animated.Value(-width)).current; 
    const [cityInput, setCityInput] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

    const toggleMenu = () => {
        Animated.timing(slideAnim, {
            toValue: isMenuOpen ? -width : 0, 
            duration: 300,
            useNativeDriver: true,
        }).start();

        setIsMenuOpen(!isMenuOpen);
    };

    const handleCitySearch = () => {
        getWeatherByCity(cityInput);
        setCityInput('');
    };

    const handleHistoryPress = (city) => {
        getWeatherByCity(city);
    };

    const handleRemoveHistoryItem = (index) => {
        removeCityFromHistory(index);
    };


    useEffect(() => {
        const hour = new Date().getHours();
        const color = getTime(hour);
        setBackgroundColor(color);
    }, []);

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

            <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }] }, {backgroundColor : backgroundColor}]}>
                <TextInput
                    style={styles.input}
                    placeholder='Search your city...'
                    placeholderTextColor={'white'}
                    value={cityInput}
                    onChangeText={setCityInput}
                />
                <Pressable
                    onPress={handleCitySearch}
                    style={({ pressed }) => [
                        {
                            opacity: pressed ? 0.5 : 1,
                        },
                    ]}
                >
                    <FlatList
                        data={searchHistory}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <Pressable onPress={() => handleHistoryPress(item)} style={styles.historyButton}>
                            <Text style={styles.historyItem}>{item}</Text>
                            <AntDesign name="close" size={18} color="white" onPress={() => handleRemoveHistoryItem(index)} />
                        </Pressable>
                        )}
                        // style={styles.historyList}
                    />
                    <Text style={styles.searchButtonText}>Search</Text>
                </Pressable>
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
        zIndex: 2,
        paddingHorizontal: 20,
        flex: 1,
        borderRadius: 6,
        height: height * 0.8,
        borderWidth: 1,
        borderColor: '#fff'
    },
    input: {
        color: '#FFFFFF',
        marginTop: 20,
        fontSize: 18,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#FFF',
        padding: 10,
        borderRadius: 7
    },
    searchButtonText:{
        borderWidth: 1,
        marginTop: 20,
        textAlign: 'center',
        padding: 10,
        borderRadius: 7,
        backgroundColor: '#FFF',
        borderColor: '#FFF',
        fontFamily: 'outfit-bold'
    },
    historyButton:{
        padding: 10,
        margin: 5,
        backgroundColor: '#CCCCCC99',
        borderRadius: 7,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    historyItem:{
        color: 'white'
    }
});

export default Menu;
