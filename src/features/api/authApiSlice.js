import { apiSlice } from "./apiSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: "/login",
                method: "POST",
                body: {...credentials}
            })
        
        }),
        refresh: builder.mutation({
            query: authToken => ({
                url: "/refresh",
                method: "POST",
                body: {...authToken}
            })
        })
    })
})



export const {
    useLoginMutation,
    useRefreshMutation,
} = authApiSlice