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
import RNFetchBlob from 'rn-fetch-blob';

export default function Detail({ navigation, route }) {
    const { medias, type } = route?.params

    const [currentIndex, setCurrentIndex] = useState(0)
    const [cachedFilePath, setCachedFilePath] = useState('')
    const [shouldPlayFromRemoteUrl, setShouldPlayFromRemoteUrl] = useState(false)
    const [timer, setTimer] = useState(false)
    const [mediaData, setMediaData] = useState([])

    function handleOnScroll(event) {
        let index = parseInt(event.nativeEvent.contentOffset.x / SCREEN_WIDTH)
        setCurrentIndex(index)

    }

    const cacheURLs = async () => {
        try {
            const data = await Promise.all(medias.map((item, index) => { return CacheMedia(index) }));
            console.log('Cached Media Paths:', data);
        } catch (error) {
            console.error('Error caching media URLs:', error);
        }
    };

    useEffect(() => {
        // CacheMedia(currentIndex)
        cacheURLs()
    }, [])


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
        // CacheMedia(0)
        StatusBar.setBarStyle('light-content')

        return () => {
            StatusBar.setBarStyle('dark-content')
        }
    }, [])


    const CacheMedia = async currentIndex => {

        const { config, fs, ios } = RNFetchBlob;
        const { dirs } = fs

        const filename = medias[currentIndex].substring(medias[currentIndex].lastIndexOf('/') + 1)
        const path = `${dirs.CacheDir}/${filename}`
        let res;
        let exists = await fs.exists(path)


        try {
            let options = {
                fileCache: true,
                wifiOnly: false,
                path,
                cache: medias[currentIndex] ? 'immutable' : 'reload'
            }
            if (!exists) {
                // console.log('NOT EXIST', path);
                res = await config(options)
                    .fetch('GET', medias[currentIndex], {
                        'Content-Type': 'octet-stream',
                        'Transfer-Encoding': 'Chunked'
                    })
                    .progress({ count: 10 }, async (received, total) => {
                        console.log('RECEIVED: ', received);
                        let tenpercent = total * 0.1;
                        received > tenpercent &&
                            (await setTimeout(() => {
                                setTimer(false)
                            }, 1000))
                    })
                    .catch(async (err) => {
                        console.log('Error: ', err);

                        // await setShouldPlayFromRemoteUrl(true)
                        return medias[currentIndex]
                    })
                console.log('res', res);
                // await setCachedFilePath(res?.data)
                if (res?.data !== undefined) {
                    return res?.data
                }
                return medias[currentIndex]

            } else {
                return path
                // await setCachedFilePath(path)
                // console.log('current======', path);
                // RNFetchBlob.fs.unlink(path).then(() => {
                //     console.log('removed from cache');
                //     setCachedFilePath('')
                // })
            }
        } catch (error) {
            console.log('Error caching media: ', error);
            // await setShouldPlayFromRemoteUrl(true)
            return medias[currentIndex]

        }
    }


    return (
        <SafeAreaView style={styles.container}>
            {Header()}
            {medias.length > 0 &&
                <FlatList
                    data={medias}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) =>
                        <MediaItem
                            item={item}
                            index={index}
                            type={type}
                        />}
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