import { SafeAreaView, StyleSheet, View, StatusBar, Platform } from 'react-native'
import React, { useLayoutEffect, useState, useEffect, useContext, useRef } from 'react'
import { useTheme } from '@react-navigation/native'
import { ThemeContext } from '../contexts/themeContext.js'
import MapView from 'react-native-maps'
import * as Location from 'expo-location'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import mapDarkStyle from '../custom-maps/mapDarkStyle.json'
import mapLightStyle from '../custom-maps/mapLightStyle.json'
import BottomInfo from '../components/BottomInfo.js'
import Markers from '../components/Markers.js'
import TopMenu from '../components/TopMenu.js'
import MapDirections from '../components/MapDirections.js'

const HomeScreen = ({ navigation }) => {
    const { setTheme, theme } = useContext(ThemeContext)

    const { colors } = useTheme()

    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [placedMarkerPosition, setPlacedMarkerPosition] = useState(null)
    const [pathToStationData, setPathToStationData] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const [showRoute, setShowRoute] = useState(false)
    const [selectedMarker, setSelectedMarker] = useState(null)

    const mapRef = useRef(null)

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-around',
            backgroundColor: colors.background,
        },
        mapcontainer: {
            zIndex: 500,
            flex: 1,
            borderTopWidth: 1,
            borderColor: colors.border,
            overflow: 'hidden',
        },
        map: {
            flex: 1,
            height: '70%'
        },
        bottom: {
            borderTopWidth: 1,
            borderColor: colors.border,
        },
        bottomcontainer: {
            backgroundColor: colors.card,
            borderWidth: 3,
            borderRadius: 20,
            borderColor: colors.border,
            marginVertical: 20,
            padding: 10,
            width: '80%',
            paddingVertical: 5,
            alignSelf: 'center',
        },
        checkboxcontainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        checkbox: {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            paddingVertical: 0,
        },
    })

    const [selectedIndexes, setSelectedIndexes] = useState([])
    const [selectedTravelMode, setSelectedTravelMode] = useState(0)

    const [markerSize, setMarkerSize] = useState(45)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Geo Viewer',
            headerStyle: { backgroundColor: colors.background },
            headerTitleStyle: { color: colors.text, fontSize: 18 },
            headerTitleAlign: "center",
            headerRight: () => (
                <TouchableOpacity
                    style={{ marginRight: 10 }}
                    onPress={handleThemeChange}
                >
                    <Ionicons
                        name={theme === 'Dark' ? 'sunny' : 'moon'}
                        size={24}
                        color={colors.text}
                    />
                </TouchableOpacity>
            )
        })
    }, [navigation, theme])

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied')
                return
            }
            let location = await Location.getCurrentPositionAsync({})
            setLocation(location)
        })()
    }, [])

    useEffect(() => {
        if (!location || !selectedMarker || !showRoute) return
        mapRef.current.fitToCoordinates([
            { latitude: location.coords.latitude, longitude: location.coords.longitude },
            { latitude: selectedMarker.position[0], longitude: selectedMarker.position[1] }],
            { edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }, animated: true })
    }, [location, selectedMarker, showRoute])

    const handleThemeChange = () => {
        setTheme(theme === 'Light' ? 'Dark' : 'Light')
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={theme === 'Dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
            <View style={styles.mapcontainer}>
                <TopMenu markerSize={markerSize} selectedIndexes={selectedIndexes} setSelectedIndexes={setSelectedIndexes} />
                <MapView style={styles.map}
                    ref={mapRef}
                    mapType={Platform.OS === 'ios' ? 'mutedStandard' : 'standard'}
                    userInterfaceStyle={theme === 'Dark' ? 'dark' : 'light'}
                    customMapStyle={Platform.OS === 'android' && theme === 'Dark' ? mapDarkStyle : mapLightStyle}
                    initialRegion={{
                        latitude: 37.992277870495116,
                        longitude: -1.1305234429857096,
                        latitudeDelta: 0.0052,
                        longitudeDelta: 0.0051,
                    }}
                    onRegionChange={(region) => {
                        if (region.latitudeDelta < 0.04) setMarkerSize(45)
                        else if (region.latitudeDelta < 0.4) setMarkerSize(30)
                        else if (region.latitudeDelta < 4) setMarkerSize(20)
                        else setMarkerSize(15)
                    }}
                    onDoublePress={(e) => {
                        mapRef.current.animateToRegion({
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude,
                            latitudeDelta: 0.0052,
                            longitudeDelta: 0.0051,
                        }, 500)
                        const [latitude, longitude] = [e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude]
                        setPlacedMarkerPosition({ latitude: latitude, longitude: longitude })
                    }}
                    showsUserLocation={true}
                    zoomTapEnabled={false}
                    zoomControlEnabled={true}
                >
                    <MapDirections
                        location={location}
                        showRoute={showRoute}
                        setPathToStationData={setPathToStationData}
                        selectedMarker={selectedMarker}
                        selectedTravelMode={selectedTravelMode}
                    />
                    <Markers
                        location={location}
                        markerSize={markerSize}
                        setShowRoute={setShowRoute}
                        placedMarkerPosition={placedMarkerPosition}
                        selectedIndexes={selectedIndexes}
                        setIsVisible={setIsVisible}
                        setPathToStationData={setPathToStationData}
                        setSelectedMarker={setSelectedMarker}
                    />
                </MapView>
                <BottomInfo
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    selectedMarker={selectedMarker}
                    pathToStationData={pathToStationData}
                    showRoute={showRoute}
                    setShowRoute={setShowRoute}
                    setSelectedTravelMode={setSelectedTravelMode}
                />
            </View>
        </SafeAreaView >
    )
}

export default HomeScreen