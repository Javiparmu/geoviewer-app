import { SafeAreaView, View, StatusBar, TouchableWithoutFeedback, TouchableOpacity, Platform } from 'react-native'
import { useLayoutEffect, useState, useEffect, useContext, useRef } from 'react'
import { ThemeContext } from '../contexts/themeContext.js'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import { Ionicons } from '@expo/vector-icons'
import mapDarkStyle from '../custom-maps/mapDarkStyle.json'
import mapLightStyle from '../custom-maps/mapLightStyle'
import { Markers, BottomInfo, SideMenu, TopMenu, MapDirections } from '../components'
import { homeScreenStyles } from '../themes'
import { getColors } from '../helpers'
import { useDispatch, useSelector } from 'react-redux'
import { setIsOpen, toggleIsOpen } from '../store/geoviewer/sideMenuSlice.js'

export const HomeScreen = ({ navigation }) => {
    const { setTheme, theme } = useContext(ThemeContext)

    const [location, setLocation] = useState(null)
    const [placedMarkerPosition, setPlacedMarkerPosition] = useState(null)
    const [pathToStationData, setPathToStationData] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const [showRoute, setShowRoute] = useState(false)
    const [selectedMarker, setSelectedMarker] = useState(null)

    const mapRef = useRef(null)

    const [selectedIndexes, setSelectedIndexes] = useState([])
    const [selectedTravelMode, setSelectedTravelMode] = useState(0)

    const [markerSize, setMarkerSize] = useState(45)

    const dispatch = useDispatch()
    const { mapType, sliderValues } = useSelector(state => state.sideMenu)

    const colors = getColors()
    const styles = homeScreenStyles(colors)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Geo Viewer',
            headerStyle: { backgroundColor: colors.background },
            headerTitleStyle: { color: colors.text, fontSize: 18 },
            headerTitleAlign: "center",
            headerRight: () => (
                <TouchableOpacity
                    style={{ marginRight: 1 }}
                    onPress={() => dispatch(toggleIsOpen())}
                >
                    <Ionicons
                        name='settings-outline'
                        size={26}
                        color={colors.text}
                    />
                </TouchableOpacity>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginRight: 20 }}
                    onPress={() => setTheme(prev => prev === 'Light' ? 'Dark' : 'Light')}
                >
                    <Ionicons
                        name={theme === 'Dark' ? 'sunny' : 'moon'}
                        size={24}
                        color={colors.text}
                    />
                </TouchableOpacity>
            ),
        })
    }, [navigation, theme])

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
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

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={theme === 'Dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
            <View style={styles.mapcontainer}>
                <TopMenu markerSize={markerSize} selectedIndexes={selectedIndexes} setSelectedIndexes={setSelectedIndexes} />
                <SideMenu />
                <TouchableWithoutFeedback onPress={() => dispatch(setIsOpen(false))}>
                    <MapView style={styles.map}
                        ref={mapRef}
                        provider={mapType === '1' ? null : PROVIDER_GOOGLE}
                        mapType={Platform.OS === 'ios' && mapType === '1' ? 'mutedStandard' : 'standard'}
                        userInterfaceStyle={theme === 'Dark' ? 'dark' : 'light'}
                        customMapStyle={theme === 'Dark' ? mapDarkStyle[`landmarks:${sliderValues[0]};roads:${sliderValues[1]};labels:${sliderValues[2]}`] : mapLightStyle[`landmarks:${sliderValues[0]};roads:${sliderValues[1]};labels:${sliderValues[2]}`]}
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
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }, 400)
                            const [latitude, longitude] = [e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude]
                            setPlacedMarkerPosition({ latitude: latitude, longitude: longitude })
                        }}
                        showsTraffic={sliderValues[3]}
                        zoomTapEnabled={false}
                        showsUserLocation
                        zoomControlEnabled
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
                            mapType={mapType}
                        />
                    </MapView>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => dispatch(setIsOpen(false))}>
                    <BottomInfo
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        selectedMarker={selectedMarker}
                        pathToStationData={pathToStationData}
                        setPathToStationData={setPathToStationData}
                        showRoute={showRoute}
                        setShowRoute={setShowRoute}
                        setSelectedTravelMode={setSelectedTravelMode}
                        mapRef={mapRef}
                    />
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}