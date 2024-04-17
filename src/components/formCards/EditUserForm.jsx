import { useState } from "react"
import { Form, Input } from "../layout"
import { useMyAccount } from "../../hooks"

export const EditUserForm = () => {
  
  const {myAccount, handleEditMyAccount } = useMyAccount()

  const [editData, setEditData] = useState({
    firstName: myAccount?.firstName  ,
    lastName: myAccount?.lastName ,
    password:"", 
  })
  
  const setFirstName = (value) => setEditData(current => ({...current, firstName: value }))
  const setLastName = (value) => setEditData(current => ({...current, lastName: value }))
  const setPassword = (value) => setEditData(current => ({...current, password: value }))

    return (
        <Form>
        <div className="row">
          <div className="col-md-6">
            <Input id="first-name" label="First Name" type="text" value={editData.firstName} onChange={setFirstName}  autoComplete="first-name" />
          </div>
          <div className="col-md-6">
            <Input id="last-name" label="Last Name" type="text" value={editData.lastName} onChange={setLastName} autoComplete="last-name"/>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Input id="user-password" label="Password" type="password" value={editData.password} onChange={setPassword} autoComplete="current-password"/>
          </div>
        </div>
            <button onClick={(e) => handleEditMyAccount(e, editData)} type="submit" className="btn btn-primary text-white  w-100 " data-bs-dismiss="modal"><strong>Save Edits</strong></button>
      </Form>
    )
}