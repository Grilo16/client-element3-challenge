import { useState } from "react"
import { Form, Input } from "../layout"
import { useMyAccount } from "../../hooks"

export const SignUpForm = () => {

  const {handleCreateAccount} = useMyAccount()  

  const [newAccountData, setNewAccountData] = useState({
    firstName: "" ,
    lastName: "",
    dateOfBirth: "", 
    email: "", 
    password: "", 
  })
  
  const setFirstName = (value) => setNewAccountData(current => ({...current, firstName: value }))
  const setLastName = (value) => setNewAccountData(current => ({...current, lastName: value }))
  const setDateOfBirth = (value) => setNewAccountData(current => ({...current, dateOfBirth: value}))
  const setEmail = (value) => setNewAccountData(current => ({...current, email: value }))
  const setPassword = (value) => setNewAccountData(current => ({...current, password: value }))



    return (
  <Form>
    <div className="row">
      <div className="col-md-6">
        <Input id="user-email" label="Email" type="email" value={newAccountData.email} onChange={setEmail}  autoComplete="username" />
      </div>
      <div className="col-md-6">
        <Input id="user-password" label="Password" type="password" value={newAccountData.password} onChange={setPassword} autoComplete="current-password"/>
      </div>
    </div>
    <div className="row">
        
      <div className="col-md-4">
        <Input id="first-name" label="First Name" type="text" value={newAccountData.firstName} onChange={setFirstName}/>
      </div>
      <div className="col-md-4">
        <Input id="last-name" label="Last Name" type="text" value={newAccountData.lastName} onChange={setLastName}/>
      </div>
      <div className="col-md-4">
        <Input id="date-of-birth" label="Date of birth" type="date" value={newAccountData.dateOfBirth} onChange={setDateOfBirth}/>
      </div>
    </div>

    <div className="w-100 row">
        <button onClick={(e) => handleCreateAccount(e, newAccountData)} data-bs-dismiss="modal"  type="submit" className="btn btn-primary text-white w-50 m-auto col-6"><strong>Create account</strong></button>
    </div>
  </Form>
    )
}