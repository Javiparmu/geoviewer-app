import { PixelRatio } from "react-native"

export const useMakersStyles = (colors) => {
    return {
        customcalloutgmaps: {
            width: Platform.OS === 'ios' ? PixelRatio.get() * 80 : PixelRatio.get() * 90,
            height: 65,
            backgroundColor: colors.card,
            padding: 10,
            borderRadius: 10,
            overflow: 'hidden',
        },
        staticcustomcalloutgmaps: {
            width: PixelRatio.get() * 60,
            height: 55,
            padding: 10,
            backgroundColor: colors.card,
            borderRadius: 10,
            overflow: 'hidden',
            zIndex: 10
        },
        custommarkercallout: {
            width: Platform.OS === 'ios' ? PixelRatio.get() * 80 : PixelRatio.get() * 90,
            height: 90,
            backgroundColor: colors.card,
            padding: 10,
            borderRadius: 10,
            overflow: 'hidden',
        },
        customcalloutios: {
            width: PixelRatio.get() * 90,
            backgroundColor: colors.card,
            margin: -30,
            padding: 30
        },
        staticcustomcalloutios: {
            width: 205,
            backgroundColor: colors.card,
            margin: -30,
            padding: 30
        },
    }
}