import React, { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../styles/colors'

export default function GradientView(props) {
    return (
        <LinearGradient
            style={{ flex: 1, ...props.style }}
            colors={colors.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            {props.children}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({})
