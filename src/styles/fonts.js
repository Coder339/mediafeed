import React from 'react'
import { Platform, } from 'react-native'


export const fonts = {
    regularFont: Platform.OS === 'ios' ? 'BarlowSemiCondensed-Regular' : 'BarlowSemiCondensed-Regular',  // regular dropped fontweight doesn't work for android
    lightFont: Platform.OS === 'ios' ? 'BarlowSemiCondensed-Light' : 'BarlowSemiCondensed-Light',
    standardFont: Platform.OS === 'ios' ? 'BarlowSemiCondensed-Medium' : 'BarlowSemiCondensed-Medium', //same as regular bcoz fontweight doesn't work for android
    boldFont: Platform.OS === 'ios' ? 'BarlowSemiCondensed-Bold' : 'BarlowSemiCondensed-Bold',
    semiBoldFont: Platform.OS === 'ios' ? 'BarlowSemiCondensed-SemiBold' : 'BarlowSemiCondensed-SemiBold',
    italicFont: Platform.OS === 'ios' ? 'BarlowSemiCondensed-Italic' : 'BarlowSemiCondensed-Italic',
    boldItalicFont: Platform.OS === 'ios' ? 'BarlowSemiCondensed-BoldItalic' : 'BarlowSemiCondensed-BoldItalic',

    regularGreyQFont: Platform.OS === 'ios' ? 'GreyQo-Regular' : 'GreyQo-Regular',
    regularDanceScriptFont: 'DancingScript-Regular',
    mediumDanceScriptFont: 'DancingScript-Medium',
    semiBoldDanceScriptFont: 'DancingScript-SemiBold',
    boldDanceScriptFont: 'DancingScript-Bold'
}