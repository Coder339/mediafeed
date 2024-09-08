import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/constants'
import Video, { VideoRef } from 'react-native-video';
import { fonts } from '../../styles/fonts';

const MediaItem = ({ item, index, type, }) => {

    const videoRef = useRef(null);
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState(false)


    const onError = ({ error }) => {
        // console.log('error of video', index, error);
        setLoader(false)
        setError(true)
    };

    const onLoad = (e) => {
        // console.log('onLoad', index, e);
        setLoader(false)
    };

    const onVideoLoad = () => {
        console.log('load');
    };

    return (
        <View key={index} style={{ justifyContent: 'center' }}>
            <View style={{}}>
                {error &&
                    <Text style={{
                        fontFamily: fonts.boldFont,
                        fontSize: 18,
                        color: '#fff',
                        textAlign: 'center',
                        top: SCREEN_HEIGHT / 3,
                        position: 'absolute',
                        left: SCREEN_WIDTH / 5
                    }}>Internet connection is poor!!</Text>}
                {loader && !error &&
                    <ActivityIndicator
                        size={'large'}
                        color={'white'}
                        style={{
                            top: SCREEN_HEIGHT / 9,
                            position: 'absolute',
                            left: SCREEN_WIDTH / 2.2
                        }}
                    />}
            </View>
            {type === 'image' ?
                <Image
                    source={{ uri: item }}
                    style={{ width: SCREEN_WIDTH, height: '100%', backgroundColor: 'grey' }}
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
                        uri: item
                    }}
                    style={{
                        height: 260,
                        width: SCREEN_WIDTH
                    }}
                    controls={true}
                    poster={item}
                />
            }
        </View>
    )
}

export default MediaItem

const styles = StyleSheet.create({})