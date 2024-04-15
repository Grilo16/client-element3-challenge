import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api"
import userReducer from "./reducers/userReducer"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        user: userReducer
    }, 

    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware),
        devTools: true
})
