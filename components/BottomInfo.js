import { ActivityIndicator, PixelRatio, StyleSheet, Button, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { Divider } from 'react-native-elements'
import { ButtonGroup } from 'react-native-elements'

const BottomInfo = ({ selectedMarker, showRoute, setShowRoute, pathToStationData, isVisible, setIsVisible, setSelectedTravelMode }) => {
    const [arrivalTime, setArrivalTime] = useState(null)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [closed, setClosed] = useState(false)

    const { colors } = useTheme()

    const iconSize = 30

    const styles = StyleSheet.create({
        infovisible: {
            backgroundColor: colors.card,
            width: '100%',
            height: showRoute ? PixelRatio.get() * 55 : PixelRatio.get() * 45,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            paddingLeft: 20,
            justifyContent: 'center',
            flexDirection: 'column',
            position: 'absolute',
            bottom: isVisible ? 0 : showRoute ? -PixelRatio.get() * 45 : -PixelRatio.get() * 35,
            shadowOffset: { width: -2, height: -2 },
            shadowColor: '#171717',
            shadowOpacity: 0.1,
            shadowRadius: 2,
        },
        closebutton: {
            display: isVisible ? 'block' : 'none',
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 100,
            margin: 10,
            backgroundColor: '#EEEEEE',
            borderRadius: 30,
        },
        hidebutton: {
            color: colors.text,
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
            backgroundColor: '#ECECEA',
            width: iconSize + 35,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 1,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'transparent',
        },
        driveiconshadow: {
            shadowOffset: { width: -2, height: -2 },
            shadowColor: '#171717',
            shadowOpacity: 0.1,
            shadowRadius: 2,
        }
    })

    const carComponent = () => <FontAwesome5 name="car-alt" size={24} color={selectedIndex === 0 ? colors.text : '#999999'}/>
    const walkComponent = () => <FontAwesome5 name="walking" size={iconSize - 5} color={selectedIndex === 1 ? colors.text : '#999999'} />
    const bikeComponent = () => <MaterialIcons name="pedal-bike" size={iconSize} color={selectedIndex === 2 ? colors.text : '#999999'} />

    const driveSelector = [
        { element: carComponent },
        { element: walkComponent },
        { element: bikeComponent },
    ]

    useEffect(() => {
        let time = new Date()
        if (pathToStationData) {
            let hours = Math.floor(pathToStationData?.duration / 60)
            let minutes = (pathToStationData?.duration.toFixed(2) % 60).toFixed(0)
            if (time.getMinutes() + minutes > 60) {
                hours++
                minutes = (Number(time.getMinutes()) + Number(minutes)) - 60
                time.setMinutes(0)
            }
            if (time.getHours() + hours > 24) {
                hours = time.getHours() + hours - 24
            }

            let arrivalPathTime = new Date()
            arrivalPathTime.setHours(time.getHours() + hours)
            arrivalPathTime.setMinutes(time.getMinutes() + minutes)
            setArrivalTime(arrivalPathTime)
        }
    }, [showRoute, pathToStationData])

    useEffect(() => {
        if (isVisible) setClosed(false)
    }, [isVisible])

    const getRightTime = (time1, time2, type) => {
        if (time1 < 10) {
            time1 = '0' + time1
        }
        if (time2 < 10) {
            time2 = '0' + time2
        }
        if (type === 0) {
            return time1 + ':' + time2
        }
        else if (type === 1) {
            return time1
        }
        else return 'Unvalid type'
    }

    const handleClose = () => {
        setIsVisible(false)
        setClosed(true)
    }

    return (
        <>
            {
                selectedMarker && !closed &&
                <View style={styles.infovisible} >
                    <TouchableOpacity onPress={handleClose} style={styles.closebutton}>
                        <Ionicons name="ios-close" size={iconSize-10} color='#777777' />
                    </TouchableOpacity>
                    <View style={{ marginBottom: 10, marginTop: -5 }}>
                        <Button title='^' onPress={() => setIsVisible(!isVisible)} style={styles.hidebutton} />
                    </View>
                    {
                        !showRoute &&
                        <View>
                            <View style={{ marginTop: -25, marginBottom: 15 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 22, color: isVisible ? colors.text : 'transparent' }}>{selectedMarker.name}</Text>
                                <Text style={{ fontSize: 18, color: isVisible ? colors.text : 'transparent' }}>Estación de Tranvía</Text>
                            </View>
                            <Divider />
                            <View style={{ marginBottom: 10, marginTop: 5 }} >
                                <Button title='Ver ruta' onPress={() => setShowRoute(true)} />
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
                                                backgroundColor: colors.card,
                                                shadowOffset: { width: 0, height: 0 },
                                                shadowColor: '#000',
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

export default BottomInfo