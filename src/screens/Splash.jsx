import { StatusBar, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeInRight, FadeInUp } from 'react-native-reanimated';
import GradientView from '../components/GradientView';
import { fonts } from '../styles/fonts';


export default function Splash(props) {

    useEffect(() => {
        setTimeout(async () => {

            props.navigation.navigate('Feed');
            StatusBar.setBarStyle('dark-content')

        }, 3000);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <GradientView style={styles.container}>
                <Animated.Text
                    entering={FadeInDown.delay(400).duration(2000)}
                    style={styles.title}>M E D I A  F E E D</Animated.Text>
            </GradientView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: fonts.regularFont,
        color: '#fff',
        fontSize: 28
    },
    headline: {
        marginTop: 8,
        fontSize: 20,
        color: '#fff',
    }
})