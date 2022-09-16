import { getDistance } from "geolib"

export const getDistanceToUserMessage = (origin, destination) => {
    const distanceMsg = origin?.coords
        ? getDistance(origin?.coords, { latitude: destination[0], longitude: destination[1] }) <= 1000
            ? 'Distancia a tu posición: ' + getDistance(origin?.coords, { latitude: destination[0], longitude: destination[1] }) + ' metros'
            : 'Distancia a tu posición: ' + getDistance(origin?.coords, { latitude: destination[0], longitude: destination[1] }) / 1000 + ' kms'
        : 'Distancia a tu posición: No disponible'
    return distanceMsg
}