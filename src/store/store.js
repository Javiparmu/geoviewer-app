import { configureStore } from "@reduxjs/toolkit";
import { bottomInfoSlice } from "./geoviewer/bottomInfoSlice";
import { geoviewerSlice } from "./geoviewer/geoviewerSlice";
import { markersSlice } from "./geoviewer/markersSlice";
import { sideMenuSlice } from "./geoviewer/sideMenuSlice";
import { topMenuSlice } from "./geoviewer/topMenuSlice";

export const store = configureStore({
    reducer: {
        geoviewer: geoviewerSlice.reducer,
        markers: markersSlice.reducer,
        topMenu: topMenuSlice.reducer,
        bottomInfo: bottomInfoSlice.reducer,
        sideMenu: sideMenuSlice.reducer,
    },
});