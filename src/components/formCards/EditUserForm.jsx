import { useState } from "react"
import { Form, Input } from "../layout"
import { selectUserDateOfBirth, selectUserEmail, selectUserFirstName, selectUserLastName, setUserData, useEditUserMutation } from "../../features"
import { useDispatch, useSelector } from "react-redux"

export const EditUserForm = () => {
  const selectedFirstName = useSelector(selectUserFirstName)
  const selectedLastName = useSelector(selectUserLastName)
    const [firstName, setFirstName] = useState(selectedFirstName)
    const [lastName, setLastName] = useState(selectedLastName)
    const [password, setPassword] = useState("")
    const [editUser] = useEditUserMutation()

    const dispatch = useDispatch()
    const handleEditUser = async (e) => {
      e.preventDefault()
      const data = {
          firstName: firstName,
          lastName: lastName,
          password: password,
      }
      const edits = Object.fromEntries(Object.entries(data).filter(([key, value]) => value))

      const user = await editUser({edits: edits}).unwrap()
      if (user) {
        dispatch(setUserData(user))

      }

  }
    return (
        <Form>
        <div className="row">
          <div className="col-md-6">
            <Input id="first-name" label="First Name" type="text" value={firstName} onChange={setFirstName}  autoComplete="first-name" />
          </div>
          <div className="col-md-6">
            <Input id="last-name" label="Last Name" type="text" value={lastName} onChange={setLastName} autoComplete="last-name"/>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Input id="user-password" label="Password" type="password" value={password} onChange={setPassword} autoComplete="current-password"/>
          </div>
        </div>
            <button onClick={handleEditUser} type="submit" className="btn btn-primary text-white  w-100 " data-bs-dismiss="modal"><strong>Save Edits</strong></button>
      </Form>
    )
}