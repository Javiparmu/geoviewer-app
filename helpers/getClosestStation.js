import { getDistance } from "geolib"
import { tramStations } from "../resources/tramStations"

export const getClosestStation = (placedMarkerPosition) => {
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