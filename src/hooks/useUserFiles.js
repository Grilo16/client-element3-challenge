import { getTokenFromCookie, setCookieJWTToken } from "../features"
import { useDeleteUserFileMutation, useGetUserFilesQuery, useUploadFileMutation } from "../features/api/userFilesApiSlice"

export const useUserFiles = () => {

    const token = getTokenFromCookie()

    const downloadByIdWithReauth = async (fileId) => {
        const url = `http://localhost:8080/auth/files/${fileId}`
        const fetchOptions = {
            headers: {
                Authorization: `Bearer ${getTokenFromCookie()}`
            }
        };
            const response = await fetch(url, fetchOptions);
            if (response.status === 401){
                const refreshResult = await fetch('http://localhost:8080/refresh', {method: "POST", ...fetchOptions});
                    if (refreshResult.ok) {
                        setCookieJWTToken(data)
                        const refreshOptions = {
                            headers: {
                                Authorization: `Bearer ${getTokenFromCookie()}`
                            }
                        };
                        return await fetch(url, refreshOptions);
                    }
            }
            return response
    };

    const {data: userFiles} = useGetUserFilesQuery(null, {skip: !token}) 
    const [deleteFile] = useDeleteUserFileMutation()
    const [upload] = useUploadFileMutation()

    const handleUploadFile = async (e, fileToUpload) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("file", fileToUpload)
        await upload(formData).unwrap()
       }
    
    const handleDownloadFile =  async (e, fileId, fileName) => {
        e.preventDefault()
        try {
            const response = await downloadByIdWithReauth(fileId);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    } 

    const handleDeleteFile = async (e, fileId) => {
        e.preventDefault()
        await deleteFile(fileId).unwrap()
    }


    return {
        userFiles,
        handleUploadFile,
        handleDeleteFile,
        handleDownloadFile,
    }
}