import {configureStore} from "@reduxjs/toolkit";
import authUserSlice from "../slices/authUserSlice";

export const store = configureStore({
    reducer: {
        authUser: authUserSlice
    }
})

// Infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostState, comments: CommentState, users: usersstate}
export type AppDispatch = typeof store.dispatch