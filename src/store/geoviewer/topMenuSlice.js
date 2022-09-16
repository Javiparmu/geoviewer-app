import { createSlice } from '@reduxjs/toolkit'

export const topMenuSlice = createSlice({
    name: 'topMenu',
    initialState: {
        selectedIndexes: [],
        isVisible: false,
    },
    reducers: {
        setSelectedIndexes: (state, { payload }) => {
            state.selectedIndexes = payload
        },
        setIsVisible: (state, { payload }) => {
            state.isVisible = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setIsVisible, setSelectedIndexes } = topMenuSlice.actions