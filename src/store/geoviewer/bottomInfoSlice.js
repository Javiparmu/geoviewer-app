import { createSlice } from '@reduxjs/toolkit'

export const bottomInfoSlice = createSlice({
    name: 'bottomInfo',
    initialState: {
        isVisible: false,
        pathToStationData: null,
        showRoute: false,
        selectedTravelMode: null,
    },
    reducers: {
        setIsVisible: (state, { payload }) => {
            state.isVisible = payload
        },
        setPathToStationData: (state, { payload }) => {
            state.pathToStationData = payload
        },
        setShowRoute: (state, { payload }) => {
            state.showRoute = payload
        },
        setSelectedTravelMode: (state, { payload }) => {
            state.selectedTravelMode = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setIsVisible, setPathToStationData, setShowRoute } = bottomInfoSlice.actions