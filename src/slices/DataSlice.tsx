import { createSlice } from "@reduxjs/toolkit";
import { FormDataType } from "../schema/FormSchema";

//copying schema ki details in our initial state;⭐⭐⭐;;
export type DataSliceType = Partial<FormDataType> & {
    addData: (data : Partial<FormDataType>) => void;
};


const initialState: DataSliceType[] = [];
const DataSlice = createSlice({
    name:"data",
    initialState,
    reducers:{
        addData: (state, action) => {
            state.push(action.payload);
        },
    }
});

export { DataSlice };
export const {addData} = DataSlice.actions;