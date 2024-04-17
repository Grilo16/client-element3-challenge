import { apiSlice } from "./apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getUsers: builder.query({
            query: () => "/auth/users", 
            providesTags: ["users"],
            keepUnusedDataFor: 5,   
        }),

    })
})

export const { 
    useGetUsersQuery,
 } = usersApiSlice


 