import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { PermissionsAndroid, Platform } from "react-native";
import RNReactNativeHapticFeedback from "react-native-haptic-feedback";
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import Snackbar from "react-native-snackbar";
import RNFetchBlob from "rn-fetch-blob";


const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};

export const checkPermission = async () => {
    RNReactNativeHapticFeedback.trigger("impactHeavy", options)
    if (Platform.OS === 'android') {
        try {
            if (Number(Platform.Version) >= 33) {  // for sdk >=33 
                return true;
            }
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission Required',
                    message: 'This app needs access to your storage to download files.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            // console.log('granted', granted);


            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    } else {
        try {

            const permission = await request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
            return permission === RESULTS.GRANTED;
        } catch (error) {
            console.log('ios permission error', error);

        }
        // return true
    }
};

export const showSnackBar = (
    text,
    textColor,
    buttontext,
    onPressHandle,
) => {
    setTimeout(() => {
        Snackbar.show({
            text: text,
            textColor: textColor ?? 'blue',
            duration: 3000,
            action: {
                onPress: onPressHandle ?? undefined,
                textColor: 'green',
                text: buttontext ?? '',
            },
        });
    }, 100);
};

export const downloadFile = async (url, typeExt = '', mediaType = 'photo') => {


    function getFileExtension(txt) {
        if (txt?.length > 0) {
            return txt?.split(/\.(?=[^\.]+$)/)?.pop();
        }
    }

    // console.log('11111');

    const permissions = await checkPermission();
    // console.log('log22222');

    let extractedFormat = getFileExtension(url);
    if (permissions) {
        const date = new Date();
        const image_URL = url;
        let ext = getFileExtension(image_URL);

        ext = `.${ext[0]}`;
        console.log('ext', ext);
        const validExt = ['jpg', 'jpeg', 'png', '.mp4', '.mov'];
        ext = validExt.includes(ext) ? ext : typeExt;
        const { config, fs, ios } = RNFetchBlob;
        const PictureDir =
            Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
        const configOption = Platform.select({
            ios: {
                fileCache: true,
                path:
                    `${PictureDir}/${typeExt}` +
                    Math.random().toString().slice(2, 6) +
                    '.' +
                    extractedFormat,
                appendExt: typeExt,
            },
            android: {
                fileCache: true,
                addAndroidDownloads: {
                    // Related to the Android only
                    useDownloadManager: true,
                    notification: true,
                    path: `${PictureDir}/${typeExt}${Math.floor(
                        date.getTime() + date.getSeconds() / 2,
                    )}.${extractedFormat}`,
                    description: 'downloading file from slice',
                },
            },
        });
        console.log(configOption);

        config(configOption)
            .fetch('GET', url, {})
            .then(res => {
                if (Platform.OS === 'ios') {
                    console.log('RESS', res);
                    const tag = `file://${res.data}`
                    try {
                        CameraRoll.saveAsset(tag, { type: mediaType })
                        showSnackBar('Media downloaded', 'white');
                    } catch (error) {
                        console.log('error-cameraroll', error);
                    }
                }
                if (Platform.OS == 'android') {
                    showSnackBar('Media downloaded', 'white');
                }
            })
            .catch(e => {
                console.log(e.message);
            });
    }
};

export async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}