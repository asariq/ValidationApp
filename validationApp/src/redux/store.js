
import { configureStore } from "@reduxjs/toolkit";
import  dataSlice  from "./slice";
export const store=configureStore({
    reducer:{valueData:dataSlice}
})