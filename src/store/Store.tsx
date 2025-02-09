import {configureStore} from "@reduxjs/toolkit";
import { DataSlice } from "../slices/DataSlice";

const Store = configureStore({
    reducer:{
        formRed:DataSlice.reducer,
    },
});


//types:
export type ActionState = ReturnType<typeof Store.getState>;
export type Dispatch = typeof Store.dispatch;
export default Store;