import { apiSlice } from "./apiSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: "/realms/Element3/auth/login",
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
        }),
        createAccount: builder.mutation({
            query: user => ({
                url: "/create-new-account",
                method: "POST",
                body: {...user}
            })
        })
    })
})



export const {
    useLoginMutation,
    useRefreshMutation,
    useCreateAccountMutation
} = authApiSlice