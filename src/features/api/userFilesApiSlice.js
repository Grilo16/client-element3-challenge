import { apiSlice } from "./apiSlice";

const credentialsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        
        getUserFile: builder.query({
            query: (userFileId) => `realms/Element3/auth/files/${userFileId}`, 
            providesTags: ["files"],
            keepUnusedDataFor: 5,   
        }),

        getUserFiles: builder.query({
            query: () => "realms/Element3/auth/files", 
            providesTags: ["files"],
            keepUnusedDataFor: 5,   
        }),

        uploadFile: builder.mutation({
            query: (file) => ({
                url: "realms/Element3/auth/files",
                method: "POST",
                body: file
            }),
            invalidatesTags: ["files"],
            keepUnusedDataFor: 5,   
        }),
        
        deleteUserFile: builder.mutation({
            query: (userFileId) => ({
                url : `realms/Element3/auth/files/${userFileId}`, 
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


 