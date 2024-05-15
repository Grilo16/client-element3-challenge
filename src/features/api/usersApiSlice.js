import { apiSlice } from "./apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getUsers: builder.query({
            query: () => "realms/Element3/auth/users", 
            providesTags: ["users"],
            keepUnusedDataFor: 5,   
        }),

    })
})

export const { 
    useGetUsersQuery,
 } = usersApiSlice


 