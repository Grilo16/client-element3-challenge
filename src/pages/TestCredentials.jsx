import { useState } from "react"
import { useDeleteUserFileMutation, useGetUserFilesQuery, useUploadFileMutation } from "../features/api/userFilesApiSlice"
import { getTokenFromCookie } from "../features/api"

export const TestCredentials = () => {

    const [userId, setUserId] = useState(1)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

   const [file, setFile] = useState(null)

   const [upload] = useUploadFileMutation()
   
   const baseQueryWithReauth = async (url, options = {}) => {
    const fetchOptions = {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${getTokenFromCookie()}`
        }
    };
        const response = await fetch(url, fetchOptions);
        if (response.status === 401){
            const refreshResult = await fetch('http://localhost:8080/refresh', {method: "POST", ...fetchOptions});
                if (refreshResult.ok) {
                    const data = await refreshResult.json()
                    const expires = new Date(data.expire)
                    expires.setHours(expires.getHours() + 1)
                    expires.toUTCString()
                    document.cookie = `token=${data.token}; expires=${expires}; path=/`
                    const refreshOptions = {
                        ...options,
                        headers: {
                            ...options.headers,
                            Authorization: `Bearer ${getTokenFromCookie()}`
                        }
                    };
                    return await fetch(url, refreshOptions);
                }
        }
        return response

};
    const handleDownloadFile = async (id) => {
    id=1
    try {
        const response = await baseQueryWithReauth(`http://localhost:8080/auth/files/${id}`);

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'filename.pdf';    
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading file:', error);
    }
    };
   
   const handleUploadFile = async () => {
    const formData = new FormData()
    formData.append("file", file)
    const result = await upload(formData)
   }


   const {data: userFiles} = useGetUserFilesQuery()
   const [deleteFile] = useDeleteUserFileMutation()


   const UserFile = ({id, userId, filePath, fileName}) => {
    const handleDeleteFile = async () => {
        await deleteFile(id).unwrap()
    }

        return (
            <div onClick={handleDeleteFile}>
                <h1>{id}</h1>
                <h1>{userId}</h1>
                <h1>{filePath}</h1>
                <h1>{fileName}</h1>
            </div>
        )
   }

   const displayUserFiles = userFiles?.map((userFile, index) => <UserFile key={index} {...userFile}/>)
    return (
        <div>
             <h1> Test Page</h1>
             {displayUserFiles}
            <input type="file" name="" id="" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUploadFile}>Upload</button>      
            <button onClick={handleDownloadFile}>download</button>
        </div>
    )
}
