import { createSlice } from '@reduxjs/toolkit'

export const geoviewerSlice = createSlice({
    name: 'geoviewer',
    initialState: {
        selectedMarker: null,
    },
    reducers: {
        setSelectedMarker: (state, { payload }) => {
            state.selectedMarker = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setSelectedMarker } = geoviewerSlice.actions