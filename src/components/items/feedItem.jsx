import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { APP_IMAGES } from '../../utils/constants'
import Video, { VideoRef } from 'react-native-video';


const FeedItem = ({ item, index, navigation }) => {

    const videoRef = useRef(null);

    const onError = ({ error }) => {
        // console.log('error of video', index, error);
    };

    const onLoad = (e) => {
        // console.log('onLoad', index, e);
    };

    const onVideoLoad = () => {
        console.log('load');
    };
    return (
        <Pressable
            onPress={() => navigation.navigate('Detail', { medias: item?.media, type: item?.type })}
        >
            {item?.type === 'image' ?
                <Image
                    source={{ uri: item.media[0] }}
                    style={{
                        height: index % 3 === 0 ? 180 : 260,
                        marginBottom: 10,
                        marginHorizontal: 10,
                        backgroundColor: 'grey'
                    }}
                />
                :
                <Video
                    ref={videoRef}
                    onLoad={onLoad}
                    playInBackground={true}
                    onVideoLoad={onVideoLoad}
                    onError={onError}
                    resizeMode="cover"
                    ignoreSilentSwitch={'ignore'}
                    paused={true}
                    source={{
                        uri: item?.media[0]
                    }}
                    style={{
                        height: index % 3 === 0 ? 180 : 260,
                        marginBottom: 10,
                        marginHorizontal: 10
                    }}
                />
            }
            {item?.type === 'video' &&
                <View style={styles.overlay}>
                    <Image
                        source={APP_IMAGES.play}
                        style={{ width: 26, height: 26 }}
                    />
                </View>
            }
        </Pressable>
    )
}

export default FeedItem

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust the opacity as needed
        // alignItems: 'center',
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 10,
        marginHorizontal: 10
        // margin: 12
    },
})