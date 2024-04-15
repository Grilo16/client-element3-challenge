import { apiSlice } from "./apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        
        getUser: builder.query({
            query: () => `/auth/users/my-details`, 
            providesTags: ["users"],
            keepUnusedDataFor: 5,   
        }),

        getUsers: builder.query({
            query: () => "/auth/users", 
            providesTags: ["users"],
            keepUnusedDataFor: 5,   
        }),
        
        newUser: builder.mutation({
            query: (user) => ({
                url : `/users`, 
                method: "POST",
                body: {...user},
            }), 
            invalidatesTags: ["users"],
            keepUnusedDataFor: 5,   
        }),
        
        editUser: builder.mutation({
            query: ({edits}) => ({
                url : `/auth/users`, 
                method: "PATCH",
                body: {...edits},
            }), 
            invalidatesTags: ["users"],
            keepUnusedDataFor: 5,   
        }),
        
        deleteUser: builder.mutation({
            query: () => ({
                url : `/auth/users`, 
                method: "DELETE",
            }), 
            invalidatesTags: ["users"],
            keepUnusedDataFor: 5,   
        }),

      

    })
})

export const { 
    useGetUserQuery,
    useGetUsersQuery,
    useNewUserMutation,
    useEditUserMutation,
    useDeleteUserMutation,
 } = usersApiSlice


 