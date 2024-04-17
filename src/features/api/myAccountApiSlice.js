import { apiSlice } from "./apiSlice";

const myAccountApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        
        getMyAccount: builder.query({
            query: () => `/auth/my-account`, 
            providesTags: ["users"],
            keepUnusedDataFor: 5,   
        }
    ),

        createMyAccount: builder.mutation({
            query: (user) => ({
                url : `/create-account`, 
                method: "POST",
                body: {...user},
            }), 
            invalidatesTags: ["users"],
            keepUnusedDataFor: 5,   
        }),
        
        editMyAccount: builder.mutation({
            query: ({edits}) => ({
                url : `/auth/my-account`, 
                method: "PATCH",
                body: {...edits},
            }), 
            invalidatesTags: ["users"],
            keepUnusedDataFor: 5,   
        }),
        
        deleteMyAccount: builder.mutation({
            query: () => ({
                url : `/auth/my-account`, 
                method: "DELETE",
            }), 
            invalidatesTags: ["users"],
            keepUnusedDataFor: 5,   
        }),
    })
})

export const { 
    useCreateMyAccountMutation,
    useGetMyAccountQuery,
    useEditMyAccountMutation,
    useDeleteMyAccountMutation,
 } = myAccountApiSlice


 