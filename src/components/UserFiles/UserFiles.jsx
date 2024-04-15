import { useGetUserFilesQuery } from "../../features/api/userFilesApiSlice"
import { UserFileCard } from "./UserFileCard"

export const UserFiles = () => {
    
    const {data: userFiles} = useGetUserFilesQuery() 
    const files = userFiles?.map((file, index) => <UserFileCard key={index} {...file}/>)


    return (
        <div className="container-fluid card my-3 ">
            <div className="card-header">
                <h1 className="">My files</h1>
            </div>
            <div className="row row-cols-md-4 overflow-y-scroll overflow-x-hidden" style={{height: "50rem", maxHeight: "50rem"}}>
                {files}
            </div>
        </div>
    )
}