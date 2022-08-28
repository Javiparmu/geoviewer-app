import { ActivityIndicator, StyleSheet, Text, View, Dimensions, TouchableOpacity, LayoutAnimation, NativeModules } from 'react-native'
import { useEffect, useState } from 'react'
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { Button, ButtonGroup, Divider } from 'react-native-elements'
import { BottomInfoAnimations } from '../resources'
import { useBottomInfoStyles } from '../hooks/stylehooks/useBottomInfoStyles'
import { getArrivalTime, getColors, getRightTime } from '../helpers'

const iconSize = 30

export const BottomInfo = ({
    selectedMarker,
    showRoute,
    setShowRoute,
    pathToStationData,
    setPathToStationData,
    isVisible,
    setIsVisible,
    setSelectedTravelMode,
    mapRef
}) => {
    const [arrivalTime, setArrivalTime] = useState(null)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [closed, setClosed] = useState(true)
    const [bottomInfoYPosition, setBottomInfoYPosition] = useState(-Dimensions.get('window').width * 0.5)

    useEffect(() => {
        const arrivalPathTime = getArrivalTime(pathToStationData)
        setArrivalTime(arrivalPathTime)
    }, [showRoute, pathToStationData])

    useEffect(() => {
        if (isVisible) setClosed(false)
    }, [isVisible])

    useEffect(() => {
        const position = BottomInfoAnimations(closed, isVisible, showRoute)
        setBottomInfoYPosition(position)
    }, [isVisible, showRoute, closed])

    const colors = getColors()
    const bottomStyles = useBottomInfoStyles(colors, isVisible, showRoute)
    const styles = StyleSheet.create(bottomStyles)

    const carComponent = () => <FontAwesome5 name="car-alt" size={24} color={selectedIndex === 0 ? colors.text : '#999999'} />
    const walkComponent = () => <FontAwesome5 name="walking" size={iconSize - 5} color={selectedIndex === 1 ? colors.text : '#999999'} />
    const bikeComponent = () => <MaterialIcons name="pedal-bike" size={iconSize} color={selectedIndex === 2 ? colors.text : '#999999'} />

    const driveSelector = [
        { element: carComponent },
        { element: walkComponent },
        { element: bikeComponent },
    ]

    const handleClose = () => {
        setIsVisible(false)
        setClosed(true)
        setShowRoute(false)
        setPathToStationData(null)
        mapRef.current.animateToRegion({
            latitude: selectedMarker?.position[0],
            longitude: selectedMarker?.position[1],
            latitudeDelta: 0.02, longitudeDelta: 0.02
        }, 500)
    }

    return (
        <>
            {
                <View style={[styles.infovisible, { bottom: bottomInfoYPosition }]} >
                    <TouchableOpacity onPress={handleClose} style={styles.closebutton}>
                        <Ionicons name="ios-close" size={iconSize - 10} color={colors.text} />
                    </TouchableOpacity>
                    <View style={{ marginBottom: 10, marginTop: -5 }}>
                        <Button title='^' onPress={() => setIsVisible(prev => !prev)} type="clear" />
                    </View>
                    {
                        !showRoute &&
                        <View>
                            <View style={{ marginTop: -25, marginBottom: 15 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 22, color: isVisible ? colors.text : 'transparent' }}>{selectedMarker?.name}</Text>
                                <Text style={{ fontSize: 18, color: isVisible ? colors.text : 'transparent', marginTop: 4 }}>{selectedMarker?.bikeAmount >= 0
                                    ? selectedMarker.bikeAmount === 1
                                        ? 'Queda 1 bicicleta'
                                        : 'Quedan ' + selectedMarker.bikeAmount + ' bicicletas'
                                    : 'Estación de Tranvía'}
                                </Text>
                            </View>
                            <Divider />
                            <View style={{ marginBottom: 10, marginTop: 5 }} >
                                <Button title='Ver ruta' type="clear" onPress={() => setShowRoute(true)} />
                            </View>
                        </View>
                    }
                    {
                        showRoute
                            ? pathToStationData && arrivalTime
                                ? (
                                    <View style={{ flexDirection: 'column', flex: 1, flexWrap: 'wrap' }}>
                                        <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap', marginTop: -15 }}>
                                            <View style={{ flexDirection: 'column', marginRight: 30 }}>
                                                <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold', }}>{getRightTime(arrivalTime.getHours(), arrivalTime.getMinutes(), 0)}</Text>
                                                <Text style={{ color: colors.text, fontSize: 18 }}>llegada</Text>
                                            </View>
                                            <View style={{ flexDirection: 'column', marginRight: 30, marginLeft: 30 }}>
                                                <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold', }}>{pathToStationData?.duration > 59 ? getRightTime(Math.floor(pathToStationData?.duration.toFixed(0) / 60), pathToStationData?.duration.toFixed(0) % 60, 0) : getRightTime(pathToStationData?.duration.toFixed(0), null, 1)}</Text>
                                                <Text style={{ color: colors.text, fontSize: 18 }}>{pathToStationData?.duration > 59 ? 'h' : 'min'}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'column', marginLeft: 30 }}>
                                                <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold' }}>{pathToStationData?.distance.toFixed(2) > 1 ? pathToStationData?.distance.toFixed(2) : pathToStationData?.distance.toFixed(2) * 100}</Text>
                                                <Text style={{ color: colors.text, fontSize: 18 }}>{pathToStationData?.distance.toFixed(2) > 1 ? 'km' : 'm'}</Text>
                                            </View>
                                        </View>
                                        <Divider />
                                        <ButtonGroup
                                            buttons={driveSelector}
                                            selectedIndex={selectedIndex}
                                            onPress={(value) => {
                                                setSelectedIndex(value)
                                                setSelectedTravelMode(value)
                                            }}
                                            containerStyle={styles.driveselectoricons}
                                            buttonStyle={styles.driveselectoricon}
                                            selectedButtonStyle={{
                                                backgroundColor: colors.buttonEnabledBackground,
                                                shadowOffset: { width: 0, height: 0 },
                                                shadowColor: colors.shadow,
                                                shadowOpacity: 0.15,
                                                shadowRadius: 3,
                                            }}
                                            innerBorderStyle={{ width: 0 }}
                                        />
                                    </View>
                                )
                                : <ActivityIndicator color={colors.text} />
                            : null
                    }
                </View>
            }
        </>
    )
}