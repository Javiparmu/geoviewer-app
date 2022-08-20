import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { AntDesign, MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import { ButtonGroup } from 'react-native-elements'

const TopMenu = ({ selectedIndexes, setSelectedIndexes }) => {
    const [isVisible, setIsVisible] = useState(false)

    const { colors } = useTheme()

    const iconSize = 30

    const tramComponent = () => <MaterialIcons name="tram" size={iconSize} color={selectedIndexes.includes(0) ? colors.text : '#999999'} />
    const crosswalkComponent = () => <MaterialIcons name="directions-walk" size={iconSize - 3} color={selectedIndexes.includes(1) ? colors.text : '#999999'} />
    const bikeComponent = () => <MaterialIcons name="pedal-bike" size={iconSize} color={selectedIndexes.includes(2) ? colors.text : '#999999'} />

    const menuButtons = [
        { element: tramComponent },
        { element: crosswalkComponent },
        { element: bikeComponent },
    ]

    const styles = StyleSheet.create({
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
            backgroundColor: '#ECECEA',
            width: iconSize + 30,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 1,
            borderRadius: 10,
            borderColor: colors.text,
        }
    })
    return (
        <View style={styles.topmenu}>
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
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

export default TopMenu