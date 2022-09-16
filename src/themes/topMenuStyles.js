import { Dimensions, StyleSheet } from "react-native"

export const topMenuStyles = (colors, isVisible) => {

    return StyleSheet.create({
        topmenu: {
            backgroundColor: colors.card,
            flexDirection: 'row-reverse',
            width: isVisible ? '100%' : 50,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderBottomLeftRadius: 15,
            borderTopLeftRadius: isVisible ? 0 : 15,
            borderBottomRightRadius: isVisible ? 15 : 0,
            borderColor: colors.border,
            shadowOffset: { width: -2, height: 3 },
            shadowColor: '#171717',
            shadowOpacity: 0.15,
            shadowRadius: 3,
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 100
        },
        topmenuicons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: -5,
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: 'transparent',
            width: 250,
            marginLeft: Dimensions.get('window').width / 2 - 125,
        },
        topmenuicon: {
            backgroundColor: colors.buttonDisabledBackground,
            width: 60,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 1,
            borderRadius: 10,
            borderColor: colors.text,
        }
    })
}