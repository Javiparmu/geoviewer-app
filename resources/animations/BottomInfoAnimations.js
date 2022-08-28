import { Dimensions, LayoutAnimation, NativeModules } from "react-native"

const { UIManager } = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true)

export const BottomInfoAnimations = (closed, isVisible, showRoute) => {
    let BottomInfoYPosition
    if (closed) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        BottomInfoYPosition = -Dimensions.get('window').width * 0.5
    } else if (isVisible) {
        LayoutAnimation.configureNext(
            {
                duration: showRoute ? 350 : 300,
                create: { type: 'linear', property: 'opacity' },
                update: { type: 'spring', springDamping: 1 },
                delete: { type: 'linear', property: 'opacity' }
            })
        BottomInfoYPosition = 0
    } else if (showRoute) {
        LayoutAnimation.configureNext(
            {
                duration: 350,
                create: { type: 'linear', property: 'opacity' },
                update: { type: 'spring', springDamping: 1 },
                delete: { type: 'linear', property: 'opacity' }
            })
        BottomInfoYPosition = -Dimensions.get('window').width * 0.35
    } else {
        LayoutAnimation.configureNext(
            {
                duration: 300,
                create: { type: 'linear', property: 'opacity' },
                update: { type: 'spring', springDamping: 1 },
                delete: { type: 'linear', property: 'opacity' }
            })
        BottomInfoYPosition = -Dimensions.get('window').width * 0.27
    }
    return BottomInfoYPosition
}