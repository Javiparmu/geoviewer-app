import { PixelRatio, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Callout, Marker } from 'react-native-maps'
import { tramStations } from '../resources/tramStations.js'
import markersData from '../resources/markersData.json'
import { MaterialIcons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { getDistance } from 'geolib'
import { useTheme } from '@react-navigation/native'

const Markers = ({ location, placedMarkerPosition, markerSize, selectedIndexes, setSelectedMarker, setShowRoute, setIsVisible, setPathToStationData }) => {
    const { colors } = useTheme()

    const styles = StyleSheet.create({
        customcallout: {
            width: PixelRatio.get() * 90,
            backgroundColor: colors.card,
            margin: -30,
            padding: 30
        },
        staticcustomcallout: {
            width: 205,
            backgroundColor: colors.card,
            margin: -30,
            padding: 30
        },
    })

    const getDistanceToUserMessage = (origin, destination) => {
        const distanceMsg = origin?.coords
            ? getDistance(origin?.coords, { latitude: destination[0], longitude: destination[1] }) <= 1000
                ? 'Distancia a tu posición: ' + getDistance(origin?.coords, { latitude: destination[0], longitude: destination[1] }) + ' metros'
                : 'Distancia a tu posición: ' + getDistance(origin?.coords, { latitude: destination[0], longitude: destination[1] }) / 1000 + ' kms'
            : 'Distancia a tu posición: No disponible'
        return distanceMsg
    }

    const getDistanceToStationMessage = (origin, destination, stationName) => {
        const distanceMsg = origin
            ? getDistance(origin, { latitude: destination[0], longitude: destination[1] }) <= 1000
                ? 'Estación más cercana: ' + stationName + ' a ' + getDistance(origin, { latitude: destination[0], longitude: destination[1] }) + ' metros'
                : 'Estación más cercana: ' + stationName + ' a ' + getDistance(origin, { latitude: destination[0], longitude: destination[1] }) / 1000 + ' kms'
            : 'Estación más cercana: No disponible'
        return distanceMsg
    }

    const getClosestStation = (placedMarkerPosition) => {
        let shortestDistance = 9999999
        let closestStation = null
        tramStations.map(station => {
            const distance = getDistance(placedMarkerPosition, { latitude: station.position[0], longitude: station.position[1] })
            if (distance < shortestDistance) {
                shortestDistance = distance
                closestStation = station
            }
        })
        return closestStation
    }

    return (
        <>
            {
                placedMarkerPosition &&
                <Marker
                    key={placedMarkerPosition.latitude + placedMarkerPosition.longitude}
                    identifier='tram1'
                    coordinate={{
                        latitude: placedMarkerPosition.latitude,
                        longitude: placedMarkerPosition.longitude
                    }}
                    title="Tu posición"
                    pinColor={colors.primary}
                >
                    <Callout>
                        <View style={styles.customcallout}>
                            <Text style={{ fontSize: 16, color: colors.text, fontWeight: '500' }}>Tu posición</Text>
                            <Text style={{ fontSize: 12, color: colors.text }}>{getDistanceToUserMessage(location, [placedMarkerPosition.latitude, placedMarkerPosition.longitude])}</Text>
                            <Text style={{ fontSize: 12, color: colors.text }}>{getDistanceToStationMessage(placedMarkerPosition, getClosestStation(placedMarkerPosition).position, getClosestStation(placedMarkerPosition).name)}</Text>
                        </View>
                    </Callout>
                </Marker>
            }
            {
                tramStations.map((station, index) => {
                    return (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: station.position[0],
                                longitude: station.position[1],
                            }}
                            title={'Estación de Tranvía'}
                            description={station.name}
                            onPress={() => {
                                setSelectedMarker(station)
                                setIsVisible(true)
                                setShowRoute(false)
                                setPathToStationData(null)
                            }}
                        >
                            <MaterialIcons
                                name="tram"
                                size={markerSize}
                                color="#32e482"
                            />
                            <Callout>
                                <View style={styles.staticcustomcallout}>
                                    <Text style={{ fontSize: 16, color: colors.text, fontWeight: '500' }}>Estación de tranvía</Text>
                                    <Text style={{ fontSize: 12, color: colors.text }}>{station.name}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    )
                })
            }
            {
                <Marker
                    identifier='tram2'
                    coordinate={{
                        latitude: 37.2436246,
                        longitude: -2.2646,
                    }}
                    title={'Estación de Tranvía'}
                    description='eheh'
                >
                    <MaterialIcons
                        name="tram"
                        size={markerSize}
                        color="#32e482"
                    />
                    <Callout>
                        <View style={styles.staticcustomcallout}>
                            <Text style={{ fontSize: 16, color: colors.text, fontWeight: '500' }}>Estación de tranvía</Text>
                            <Text style={{ fontSize: 12, color: colors.text }}>reher</Text>
                        </View>
                    </Callout>
                </Marker>
            }
            {
                selectedIndexes.includes(0) &&
                markersData.markers.filter(marker => marker.type === 'Tram').map((marker, index) => {
                    return (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: marker.position[0],
                                longitude: marker.position[1],
                            }}
                            title='Tranvía.'
                            description='Marcador de Tranvía.'
                        >
                            <MaterialIcons
                                name="tram"
                                size={markerSize}
                                color="#f56a4d"
                            />
                            <Callout>
                                <View style={styles.customcallout}>
                                    <Text style={{ fontSize: 16, color: colors.text, fontWeight: '500' }}>Tranvía</Text>
                                    <Text style={{ fontSize: 12, color: colors.text }}>{getDistanceToUserMessage(location, marker.position)}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    )
                })
            }
            {
                selectedIndexes.includes(1) &&
                markersData.markers.filter(marker => marker.type === 'Crosswalk').map((marker, index) => {
                    return (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: marker.position[0],
                                longitude: marker.position[1],
                            }}
                            title='Paso de peatones'
                            pinColor='#3163c6'
                        >
                            <MaterialIcons
                                name="directions-walk"
                                size={markerSize}
                                color="#8cbbf1"
                            />
                            <Callout>
                                <View style={styles.customcallout}>
                                    <Text style={{ fontSize: 16, color: colors.text, fontWeight: '500' }}>Paso de peatones</Text>
                                    <Text style={{ fontSize: 12, color: colors.text }}>{getDistanceToUserMessage(location, marker.position)}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    )
                })
            }
            {
                selectedIndexes.includes(2) &&
                markersData.markers.filter(marker => marker.type === 'Bike').map((marker, index) => {
                    return (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: marker.position[0],
                                longitude: marker.position[1],
                            }}
                            title='MUyBICI'
                            pinColor='#3163c6'
                        >
                            <MaterialIcons
                                name="pedal-bike"
                                size={markerSize}
                                color="#f3954f"
                            />
                            <Callout>
                                <View style={styles.customcallout}>
                                    <Text style={{ fontSize: 16, color: colors.text, fontWeight: '500' }}>MUyBICI</Text>
                                    <Text style={{ fontSize: 12, color: colors.text }}>{getDistanceToUserMessage(location, marker.position)}</Text>
                                    <Text style={{ fontSize: 12, color: colors.text }}>{'Quedan ' + marker.bikeAmount + ' bicicletas'}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    )
                })
            }
        </>
    )
}

export default Markers
