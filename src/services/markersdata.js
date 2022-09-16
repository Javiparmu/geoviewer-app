import markersData from '../assets/markersData.json'

const getAllData = () => {
    const tramMarkers = markersData.markers
        .filter(marker => marker.type === 'Tram')
        .map(marker => marker.position)
    const crosswalkMarkers = markersData.markers
        .filter(marker => marker.type === 'Crosswalk')
        .map(marker => marker.position)
    let bikeMarkersPositions = []
    let bikeMarkersAmounts = []
    markersData.markers
        .filter(marker => marker.type === 'Bike')
        .map(marker => {
            bikeMarkersPositions.push(marker.position)
            bikeMarkersAmounts.push(marker.bikeAmount)
        })
    return {
        tram: tramMarkers,
        crosswalk: crosswalkMarkers,
        bike: {
            positions: bikeMarkersPositions,
            bikeAmounts: bikeMarkersAmounts
        }
    }
}

const getTramsData = () => {
    const tramMarkers = markersData.markers
        .filter(marker => marker.type === 'Tram')
        .map(marker => marker.position)
    return tramMarkers
}

const getCrosswalksData = () => {
    const crosswalkMarkers = markersData.markers
        .filter(marker => marker.type === 'Crosswalk')
        .map(marker => marker.position)
    return crosswalkMarkers
}

const getBikesData = () => {
    let bikeMarkersPositions = []
    let bikeMarkersAmounts = []
    markersData.markers
        .filter(marker => marker.type === 'Bike')
        .map(marker => {
            bikeMarkersPositions.push(marker.position)
            bikeMarkersAmounts.push(marker.bikeAmount)
        })
    return {
        positions: bikeMarkersPositions,
        bikeAmounts: bikeMarkersAmounts
    }
}

export default { getAllData, getTramsData, getCrosswalksData, getBikesData }