import { createSlice } from "@reduxjs/toolkit";
import { FormDataType } from "../schema/FormSchema";

//copying schema ki details in our initial state;⭐⭐⭐;;
// export type DataSliceType = Partial<FormDataType> & {
//     addData: (data : Partial<FormDataType>) => void;
// };


// const initialState: DataSliceType[] = [];

//new code 
const initialState: Partial<FormDataType> = {};  // Store in a single object;

const DataSlice = createSlice({
    name:"data",
    initialState,
    reducers:{
        addData: (state, action) => {
            //state.push(action.payload);  // if we want to store each data in a separate object
            return {...state,...action.payload}  
        },
    }
});

export { DataSlice };
export const {addData} = DataSlice.actions;