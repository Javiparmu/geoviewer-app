import { Dimensions, LayoutAnimation, NativeModules } from "react-native"

const { UIManager } = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true)

export const SideMenuAnimations = (isOpen) => {
    let sideMenuXPosition
    if (isOpen) {
        LayoutAnimation.configureNext(
            {
                duration: 500,
                create: { type: 'linear', property: 'opacity' },
                update: { type: 'spring', springDamping: 1 },
                delete: { type: 'linear', property: 'opacity' }
            })
        sideMenuXPosition = 0
    } else {
        LayoutAnimation.configureNext(
            {
                duration: 400,
                create: { type: 'linear', property: 'opacity' },
                update: { type: 'spring', springDamping: 1 },
                delete: { type: 'linear', property: 'opacity' }
            })
        sideMenuXPosition = -Dimensions.get('window').width
    }
    return sideMenuXPosition
}