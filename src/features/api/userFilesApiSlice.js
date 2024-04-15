import { apiSlice } from "./apiSlice";

const credentialsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        
        getUserFile: builder.query({
            query: (userFileId) => `/auth/files/${userFileId}`, 
            providesTags: ["files"],
            keepUnusedDataFor: 5,   
        }),

        getUserFiles: builder.query({
            query: () => "/auth/files", 
            providesTags: ["files"],
            keepUnusedDataFor: 5,   
        }),

        uploadFile: builder.mutation({
            query: (file) => ({
                url: "/auth/files",
                method: "POST",
                body: file
            }),
            invalidatesTags: ["files"],
            keepUnusedDataFor: 5,   
        }),
        
        deleteUserFile: builder.mutation({
            query: (userFileId) => ({
                url : `/auth/files/${userFileId}`, 
                method: "DELETE",
            }), 
            invalidatesTags: ["files"],
            keepUnusedDataFor: 5,   
        }),
    })
})

export const { 
    useDeleteUserFileMutation,
    useGetUserFileQuery,
    useGetUserFilesQuery,
    useUploadFileMutation,
 } = credentialsApiSlice


 