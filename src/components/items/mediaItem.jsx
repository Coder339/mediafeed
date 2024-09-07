import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { SCREEN_WIDTH } from '../../utils/constants'
import Video, { VideoRef } from 'react-native-video';

const MediaItem = ({ item, index, type }) => {

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
        <View key={index} style={{ justifyContent: 'center' }}>
            {type === 'image' ?
                <Image
                    source={{ uri: item }}
                    style={{ width: SCREEN_WIDTH, height: '100%' }}
                />
                :
                <Video
                    // key={index}
                    ref={videoRef}
                    // onBuffer={onBuffer}
                    // muted={videoPaused}
                    onLoad={onLoad}
                    playInBackground={true}
                    onVideoLoad={onVideoLoad}
                    onError={onError}
                    resizeMode="cover"
                    ignoreSilentSwitch={'ignore'}
                    paused={true}
                    source={{
                        uri: item
                    }}
                    style={{
                        height: 260,
                        width: SCREEN_WIDTH
                    }}
                    controls={true}
                />
            }
        </View>
    )
}

export default MediaItem

const styles = StyleSheet.create({})