import { getTokenFromCookie } from "../../features"
import { useDeleteUserFileMutation } from "../../features/api/userFilesApiSlice"

export const UserFileCard = ({id: fileId, fileName}) => {
   const [deleteFile] = useDeleteUserFileMutation()

    const handleDeleteFile = async (e) => {
        e.preventDefault()
        await deleteFile(fileId).unwrap()
    }

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
    const handleDownloadFile = async (e) => {
        e.preventDefault()
        try {
            const response = await baseQueryWithReauth(`http://localhost:8080/auth/files/${fileId}`);
    
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName; // Set the desired filename here
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
        };
       
   
    return (
        <div className="col p-2">
                <div className="card p-3">

                <h2>file: {fileName}</h2>
                <div className="row">
                <div className="col">
                    <button onClick={handleDownloadFile} className="btn btn-primary w-100">Download</button>
                </div>
                <div className="col ">
                    <button onClick={handleDeleteFile} className="btn btn-danger w-100">Delete</button>
                </div>
                </div>
                </div>
            </div>
    )
}