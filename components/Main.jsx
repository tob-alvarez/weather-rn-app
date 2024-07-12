import { View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Layout from './Layout';
import { WeatherProvider } from './context/WeatherContext';
import Principal from './Principal';

export default function Main() {

    const insets = useSafeAreaInsets();

    return (
        <WeatherProvider>
            <View style={{paddingTop: insets.top, flex: 1}}>
                <Layout/>
                <Principal/>
            </View>
        </WeatherProvider>
    )
}
