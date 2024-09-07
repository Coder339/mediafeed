import { ActivityIndicator, Image, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fonts } from '../styles/fonts'
import { MasonryFlashList } from "@shopify/flash-list";
import FeedItem from '../components/items/feedItem';
import DATA from '../utils/media.json'
import { wait } from '../utils/helpers';
import { SCREEN_HEIGHT } from '../utils/constants';

export default function Feed(props) {

    const [media, setMedia] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [limit, setLimit] = useState(10)


    useEffect(() => {
        loadMedia(1)
    }, [])


    const loadMedia = async (page) => {

        setLoading(true);

        try {

            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;

            // Slice the data array to get the current chunk
            const newData = DATA.slice(startIndex, endIndex);
            console.log('newData', newData.length);
            await wait(500) // mocking api response time for half second 500ms
            if (page === 0) {
                setMedia(newData)
            }
            else {
                setMedia((prevMedia) => [...prevMedia, ...newData]);
            }
            if (newData.length !== 0) {
                setPage((prevPage) => prevPage + 1);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const _emlptyComponent = () => {
        return (
            <View style={{ marginTop: SCREEN_HEIGHT / 3, alignItems: 'center' }}>
                <Text style={{ fontFamily: fonts.semiBoldFont, color: '#000', fontSize: 18 }}>No Media Found</Text>
            </View>
        )
    }

    const handleLoadMore = () => {

        if (!loading) {
            loadMedia(page)
            console.log('PAGE', page);
        }
    };

    const renderFooter = () => {
        return loading ? <ActivityIndicator size='small' color="#0000ff" style={{ marginTop: 20 }} /> : null;
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                ...styles.headerContainer,
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
            }}>
                <Text style={styles.headerLabel}>MEDIA</Text>
            </View>
            <MasonryFlashList
                data={media}
                numColumns={2}
                renderItem={({ item, index }) =>
                    <FeedItem
                        item={item}
                        index={index}
                        navigation={props.navigation}
                    />
                }
                keyExtractor={(item) => item.id}
                estimatedItemSize={200}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                onEndReached={handleLoadMore}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={_emlptyComponent}
                onEndReachedThreshold={0.6}
                showsVerticalScrollIndicator={false}

            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    headerLabel: {
        color: '#000',
        fontFamily: fonts.semiBoldFont,
        textAlign: 'center'
    }
})