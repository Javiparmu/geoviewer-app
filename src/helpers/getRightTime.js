export const getRightTime = (time1, time2, type) => {
    if (time1 < 10) {
        time1 = '0' + time1
    }
    if (time2 < 10) {
        time2 = '0' + time2
    }
    if (type === 0) {
        return time1 + ':' + time2
    }
    else if (type === 1) {
        return time1
    }
    else return 'Unvalid type'
}