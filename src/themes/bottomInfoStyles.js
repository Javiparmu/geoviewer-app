import { Dimensions, StyleSheet } from "react-native"

export const bottomInfoStyles = (colors, isVisible, showRoute) => {
    return StyleSheet.create({
        infovisible: {
            backgroundColor: colors.card,
            width: '100%',
            height: showRoute ? Dimensions.get('window').width * 0.4 : Dimensions.get('window').width * 0.32,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            paddingLeft: 20,
            justifyContent: 'center',
            flexDirection: 'column',
            position: 'absolute',
            shadowOffset: { width: -2, height: -2 },
            shadowColor: '#171717',
            shadowOpacity: 0.1,
            shadowRadius: 2,
        },
        closebutton: {
            display: isVisible ? 'flex' : 'none',
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 100,
            margin: 10,
            backgroundColor: colors.closeButton,
            borderRadius: 30,
        },
        driveselectoricons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
            paddingHorizontal: 5,
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: 'transparent',
            width: 280,
            height: 50,
            paddingVertical: 5,
            marginLeft: Dimensions.get('window').width / 2 - 140,
        },
        driveselectoricon: {
            backgroundColor: colors.buttonDisabledBackground,
            width: 65,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 1,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'transparent',
        },
        driveiconshadow: {
            shadowOffset: { width: -2, height: -2 },
            shadowColor: colors.shadow,
            shadowOpacity: 0.1,
            shadowRadius: 2,
        }
    })
}