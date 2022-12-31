import { createSlice } from '@reduxjs/toolkit'
import {PayloadAction} from "@reduxjs/toolkit";

export const authUserSlice = createSlice({
    name: 'authUserSlice',
    initialState: {
        userDetails: null,
    },
    reducers: {
        setUserState: (state, action: PayloadAction<object>) => {
            // @ts-ignore
            state.userDetails = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { setUserState} = authUserSlice.actions

export default authUserSlice.reducer