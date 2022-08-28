import { getDistance } from "geolib"

export const getDistanceToStationMessage = (origin, destination, stationName) => {
    const distanceMsg = origin
        ? getDistance(origin, { latitude: destination[0], longitude: destination[1] }) <= 1000
            ? 'Estación más cercana: ' + stationName + ' a ' + getDistance(origin, { latitude: destination[0], longitude: destination[1] }) + ' metros'
            : 'Estación más cercana: ' + stationName + ' a ' + getDistance(origin, { latitude: destination[0], longitude: destination[1] }) / 1000 + ' kms'
        : 'Estación más cercana: No disponible'
    return distanceMsg
}