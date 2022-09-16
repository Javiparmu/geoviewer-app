import { Dimensions, StyleSheet } from "react-native"

export const sideMenuStyles = (colors) => {

    return StyleSheet.create({
        menu: {
            backgroundColor: colors.card,
            borderRadius: 20,
            padding: 30,
            width: '80%',
            height: Dimensions.get('window').width * 0.8,
            position: 'absolute',
            top: 0,
            zIndex: 200,
            shadowOffset: { width: -2, height: 3 },
            shadowColor: '#171717',
            shadowOpacity: 0.15,
            shadowRadius: 3,
        },
        dropdown: {
            height: 40,
            width: 195,
            borderColor: colors.text,
            backgroundColor: colors.card,
            borderWidth: 0.5,
            borderRadius: 8,
            paddingHorizontal: 8,
        },
        icon: {
            marginRight: 5,
        },
        placeholderStyle: {
            fontSize: 16,
            color: colors.dropdowntext
        },
        selectedTextStyle: {
            fontSize: 16,
            color: colors.dropdowntext
        },
        iconStyle: {
            width: 20,
            height: 20,
        },
    })
}