import { LayoutAnimation, NativeModules } from "react-native"

const { UIManager } = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true)

export const TopMenuAnimations = (isVisible) => {
    let topMenuWidth
    if (isVisible) {
        LayoutAnimation.configureNext(
            {
                duration: 800,
                create: { type: 'linear', property: 'opacity' },
                update: { type: 'spring', springDamping: 0.5 },
                delete: { type: 'linear', property: 'opacity' }
            }
        )
        topMenuWidth = '100%'
    } else {
        LayoutAnimation.configureNext(
            {
                duration: 700,
                create: { type: 'linear', property: 'opacity' },
                update: { type: 'spring', springDamping: 0.8 },
                delete: { type: 'linear', property: 'opacity' }
            }
        )
        topMenuWidth = 50
    }
    return topMenuWidth
}