import { UserCard } from "../components";
import { useGetUsersQuery } from "../features";

export const Users = () => {
    const {data: users} = useGetUsersQuery()
    const displayAllUsers = users?.map((user, index) => <UserCard key={index} {...user}/>) 

    return (
        <main className="container-fluid row bg-secondary h-100 p-5 g-0">

            <div className="card">
                <div className="card-header">
                    <h1>All users</h1>
                </div>
                <div className="row overflow-y-scroll overflow-x-hidden p-2 mx-1" style={{maxHeight:"50rem"}}>
                    {displayAllUsers}
                </div>
            </div>

        </main>
    )
};