import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { getColors } from '../helpers'
import { useTheme } from '@react-navigation/native'

export const MapDirections = ({ location, showRoute, setPathToStationData, selectedMarker, selectedTravelMode }) => {
    const colors = getColors()
    return (
        <>
            {
                location && showRoute &&
                <MapViewDirections
                    origin={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
                    destination={{ latitude: selectedMarker.position[0], longitude: selectedMarker.position[1] }}
                    apikey={GOOGLE_MAPS_APIKEY}
                    mode={selectedTravelMode === 0 ? 'DRIVING' : selectedTravelMode === 1 ? 'WALKING' : 'BICYCLING'}
                    strokeWidth={4}
                    strokeColor={colors.border}
                    precision='high'
                    onReady={(result) => {
                        setPathToStationData({
                            distance: result.distance,
                            duration: result.duration,
                            origin: result.origin,
                            destination: result.destination,
                        })
                    }}
                >
                </MapViewDirections>
            }
        </>
    )
}