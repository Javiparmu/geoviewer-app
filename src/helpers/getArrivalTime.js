export const getArrivalTime = (pathToStationData) => {
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
        return arrivalPathTime
    }
}