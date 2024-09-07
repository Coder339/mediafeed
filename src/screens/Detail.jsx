import {
    FlatList,
    Image,
    Platform,
    Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { APP_IMAGES, SCREEN_WIDTH } from '../utils/constants'
import MediaItem from '../components/items/mediaItem';
import { downloadFile } from '../utils/helpers';

export default function Detail({ navigation, route }) {
    const { medias, type } = route?.params

    const [currentIndex, setCurrentIndex] = useState(0)

    function handleOnScroll(event) {
        let index = parseInt(event.nativeEvent.contentOffset.x / SCREEN_WIDTH)
        setCurrentIndex(index)

    }

    const Header = () => {
        return (
            <View style={{
                ...styles.header,
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
            }}>
                <Pressable
                    onPress={() => navigation.goBack()}>
                    <Image
                        source={APP_IMAGES.backIcon}
                        style={{ width: 20, height: 20 }}
                        resizeMode='contain'
                    />
                </Pressable>
                <Pressable
                    onPress={() => {
                        downloadFile(
                            medias[currentIndex],
                            typeExt = '',
                            mediaType = type === 'image' ? 'photo' : 'video'
                        )
                    }}
                >
                    <Image
                        source={APP_IMAGES.download}
                        style={{ width: 26, height: 26 }}
                        resizeMode='contain'
                    />
                </Pressable>
            </View>
        )
    }

    useEffect(() => {
        StatusBar.setBarStyle('light-content')

        return () => {
            StatusBar.setBarStyle('dark-content')
        }
    }, [])



    return (
        <SafeAreaView style={styles.container}>
            {Header()}
            {medias.length > 0 &&
                <FlatList
                    data={medias}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => <MediaItem item={item} index={index} type={type} />}
                    horizontal
                    pagingEnabled
                    onScroll={handleOnScroll}
                    showsHorizontalScrollIndicator={false}
                />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 20
    },
})