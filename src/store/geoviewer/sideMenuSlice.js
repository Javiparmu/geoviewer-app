import { createSlice } from '@reduxjs/toolkit'
import { Platform } from 'react-native'

export const sideMenuSlice = createSlice({
   name: 'sideMenu',
   initialState: {
       isOpen: false,
       sliderValues: [3, 3, 3, false],
       mapType: Platform.OS === 'ios' ? '1' : '2',
   },
   reducers: {
        setIsOpen: (state, { payload }) => {
            state.isOpen = payload
        },
        toggleIsOpen: (state) => {
            state.isOpen = !state.isOpen
        },
        setSliderValues: (state, { payload }) => {
            state.sliderValues = payload
        },
        setSliderValue: (state, { payload }) => {
            state.sliderValues[payload.index] = payload.value
        },
        setMapType: (state, { payload }) => {
            state.mapType = payload
        }
   },
})

// Action creators are generated for each case reducer function
export const { setIsOpen, setMapType, setSliderValues, setSliderValue, toggleIsOpen } = sideMenuSlice.actions