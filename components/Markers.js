import { StyleSheet, Text, View } from 'react-native'
import { Callout, Marker } from 'react-native-maps'
import { muybicis, tramStations, markersData } from '../resources'
import { MaterialIcons } from '@expo/vector-icons'
import { getClosestStation, getColors, getDistanceToStationMessage, getDistanceToUserMessage } from '../helpers'
import { useMakersStyles } from '../hooks/stylehooks/useMarkersStyles'

export const Markers = ({ location,
    placedMarkerPosition,
    markerSize,
    selectedIndexes,
    setSelectedMarker,
    setShowRoute,
    setIsVisible,
    setPathToStationData,
    mapType
}) => {
    const colors = getColors()
    const markersStyles = useMakersStyles(colors)
    const styles = StyleSheet.create(markersStyles)

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
                    title="Posición marcada"
                    pinColor={colors.primary}
                >
                    <Callout tooltip={mapType === '1' ? false : true} style={mapType === '1' ? '' : styles.custommarkercallout}>
                        <View style={mapType === '1' ? styles.customcalloutios : ''}>
                            <Text style={{ fontSize: 16, color: colors.text, fontWeight: '500' }}>Posición marcada</Text>
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
                            <Callout tooltip={mapType === '1' ? false : true} style={mapType === '1' ? '' : styles.staticcustomcalloutgmaps}>
                                <View style={mapType === '1' ? styles.staticcustomcalloutios : ''}>
                                    <Text style={{ fontSize: 16, color: colors.text, fontWeight: '500' }}>Estación de tranvía</Text>
                                    <Text style={{ fontSize: 12, color: colors.text }}>{station.name}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    )
                })
            }
            {
                selectedIndexes.includes(0) &&
                markersData.filter(marker => marker.type === 'Tram').map((marker, index) => {
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
                            <Callout tooltip={mapType === '1' ? false : true} style={mapType === '1' ? '' : styles.customcalloutgmaps}>
                                <View style={mapType === '1' ? styles.customcalloutios : ''}>
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
                markersData.filter(marker => marker.type === 'Crosswalk').map((marker, index) => {
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
                            <Callout tooltip={mapType === '1' ? false : true} style={mapType === '1' ? '' : styles.customcalloutgmaps} >
                                <View style={mapType === '1' ? styles.customcalloutios : ''}>
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
                muybicis.map((bike, index) => {
                    return (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: bike.position[0],
                                longitude: bike.position[1],
                            }}
                            title='MUyBICI'
                            pinColor='#3163c6'
                            onPress={() => {
                                setSelectedMarker(bike)
                                setIsVisible(true)
                                setShowRoute(false)
                                setPathToStationData(null)
                            }}
                        >
                            <MaterialIcons
                                name="pedal-bike"
                                size={markerSize - 5}
                                color={bike.bikeAmount === 0 ? 'gray' : "#f3954f"}
                            />
                            <Callout tooltip={mapType === '1' ? false : true} style={mapType === '1' ? '' : styles.customcalloutgmaps} >
                                <View style={mapType === '1' ? styles.customcalloutios : ''}>
                                    <Text style={{ fontSize: 16, color: colors.text, fontWeight: '500' }}>{bike.name}</Text>
                                    <Text style={{ fontSize: 12, color: colors.text }}>{bike.bikeAmount === 1 ? 'Queda 1 bicicleta.' : 'Quedan ' + bike.bikeAmount + ' bicicletas.'}</Text>
                                    <Text style={{ fontSize: 12, color: colors.text }}>{getDistanceToUserMessage(location, bike.position)}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    )
                })
            }
        </>
    )
}
