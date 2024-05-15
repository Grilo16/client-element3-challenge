import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api"
import adminReducer from "./reducers/adminReducer"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        admin: adminReducer
    }, 

    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware),
        devTools: true
})
