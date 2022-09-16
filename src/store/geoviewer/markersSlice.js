import { createSlice } from '@reduxjs/toolkit'

export const markersSlice = createSlice({
    name: 'markers',
    initialState: {
        location: null,
        placedMarkerPosition: null,
    },
    reducers: {
        setLocation: (state, { payload }) => {
            state.location = payload
        },
        setPlacedMarkerPosition: (state, { payload }) => {
            state.placedMarkerPosition = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setLocation, setPlacedMarkerPosition } = markersSlice.actions