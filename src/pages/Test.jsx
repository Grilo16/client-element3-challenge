import { useState } from "react"
import { useDeleteUserMutation, useEditUserMutation, useGetUserQuery, useGetUsersQuery, useNewUserMutation } from "../features/api"
import { UserCard } from "../components"

export const Test = () => {

    const [id, setId] = useState(1)

    const [name, setName] = useState("")
    const [age, setAge] = useState(0)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [password, setPassword] = useState("")


    const {data: user} = useGetUserQuery(id)
    const {data: users} = useGetUsersQuery()
    const [editUser] = useEditUserMutation()
    
    const [newUser] = useNewUserMutation()

    const displayAllUsers = users?.map((user, index) => <UserCard key={index} {...user}/>) 

    const handleCreateUser = (e) => {
        e.preventDefault()
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            dateOfBirth: new Date(dateOfBirth),
        }
        newUser(user)
    }

    const handleEditUser = async (e) => {
        e.preventDefault()
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString().slice(0, 10) : null,
        }
        const edits = Object.fromEntries(Object.entries(data).filter(([key, value]) => value))

        await editUser({id: id, edits: edits}).unwrap()

    }

    return (
        <div>
            <h1> Test Page</h1>
            <form>
    <div className="row">
      <div className="col-md-6">
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
        </div>
      </div>
      <div className="col-md-6">
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
      </div>
      <div className="col-md-6">
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
      </div>
      <div className="col-md-6">
        <div className="mb-3">
          <label htmlFor="dob" className="form-label">Date of birth</label>
          <input type="date" className="form-control" id="dob" value={dateOfBirth} onChange={(e)=>setDateOfBirth(e.target.value)} />
        </div>
      </div>
    </div>
    <div className="row justify-content-center">
        <button type="submit" className="btn btn-primary w-25" onClick={handleCreateUser}>Sign up</button>
    </div>
  </form>
            <input value={id} onChange={(e) => setId(e.target.value)}/>
            <input value={name} onChange={(e) => setName(e.target.value)}/>
            <input value={age} onChange={(e) => setAge(e.target.value)}/>
            <button onClick={handleCreateUser}>Create</button>
            <button onClick={handleEditUser}>edit user</button>
            <UserCard {...user}/>
            <hr />
            {displayAllUsers}
        </div>
    )
}
