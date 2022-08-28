import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { ButtonGroup } from 'react-native-elements'
import { TopMenuAnimations } from '../resources'
import { useTopMenuStyles } from '../hooks/stylehooks/useTopMenuStyles'
import { getColors } from '../helpers'

const iconSize = 30

export const TopMenu = ({ selectedIndexes, setSelectedIndexes }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [topMenuWidth, setTopMenuWidth] = useState(50)

    useEffect(() => {
        const width = TopMenuAnimations(isVisible)
        setTopMenuWidth(width)
    }, [isVisible])

    const colors = getColors()
    const topStyles = useTopMenuStyles(colors, isVisible)
    const styles = StyleSheet.create(topStyles)

    const tramComponent = () => <MaterialIcons name="tram" size={iconSize} color={selectedIndexes.includes(0) ? colors.text : colors.iconDisabled} />
    const crosswalkComponent = () => <MaterialIcons name="directions-walk" size={iconSize - 3} color={selectedIndexes.includes(1) ? colors.text : colors.iconDisabled} />
    const bikeComponent = () => <MaterialIcons name="pedal-bike" size={iconSize} color={selectedIndexes.includes(2) ? colors.text : colors.iconDisabled} />

    const menuButtons = [
        { element: tramComponent },
        { element: crosswalkComponent },
        { element: bikeComponent },
    ]

    return (
        <View style={[styles.topmenu, { width: topMenuWidth }]}>
            <TouchableOpacity onPress={() => setIsVisible(prev => !prev)}>
                <AntDesign name={isVisible ? "indent-right" : "indent-left"} size={30} color={colors.text} />
            </TouchableOpacity>
            {
                isVisible &&
                <ButtonGroup
                    buttons={menuButtons}
                    selectMultiple={true}
                    selectedIndexes={selectedIndexes}
                    onPress={(value) => {
                        setSelectedIndexes(value)
                    }}
                    containerStyle={styles.topmenuicons}
                    buttonStyle={styles.topmenuicon}
                    selectedButtonStyle={{ backgroundColor: colors.border }}
                    innerBorderStyle={{ width: 0 }}
                />
            }
        </View>
    )
}