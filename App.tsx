/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
	StatusBar,
	StyleSheet,
	useColorScheme,
	View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import RootStackScreen from './src/navigations/routes';


function App(): React.JSX.Element {
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<View style={{ flex: 1, }}>
			<StatusBar
				barStyle={'light-content'}
				backgroundColor={'transparent'}
				translucent={true}
			/>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<NavigationContainer>
					<RootStackScreen />
				</NavigationContainer>
			</GestureHandlerRootView>
		</View>
	);
}

const styles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
	},
	highlight: {
		fontWeight: '700',
	},
});

export default App;
