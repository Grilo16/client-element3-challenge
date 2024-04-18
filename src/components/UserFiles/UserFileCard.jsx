import { getTokenFromCookie } from "../../features"
import { useUserFiles } from "../../hooks/useUserFiles";

export const UserFileCard = ({id: fileId, fileName}) => {

    const {handleDeleteFile, handleDownloadFile} = useUserFiles()
   
    return (
        <div className="col p-2">
                <div className="card p-3">

                <h2>file: {fileName}</h2>
                <div className="row">
                <div className="col">
                    <button onClick={(e) => handleDownloadFile(e, fileId, fileName)} className="btn btn-primary w-100">Download</button>
                </div>
                <div className="col ">
                    <button onClick={(e) => handleDeleteFile(e, fileId)} className="btn btn-danger w-100">Delete</button>
                </div>
                </div>
                </div>
            </div>
    )
}