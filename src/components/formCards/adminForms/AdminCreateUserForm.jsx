import { useState } from "react";
import { Button, Column, Form, Input, Row } from "../../layout";
import { useCreateAccountMutation } from "../../../features";

export const AdminCreateUserForm = () => {
    
  const [formInputs, setFormInputs] = useState({
    firstName: "" ,
    lastName: "" ,
    orgID: "",
    email: "",
  })
  
  const setFirstName = (value) => setFormInputs(current => ({...current, firstName: value }))
  const setLastName = (value) => setFormInputs(current => ({...current, lastName: value }))
  const setOrgID = (value) => setFormInputs(current => ({...current, orgID: value }))
  const setEmail = (value) => setFormInputs(current => ({...current, email: value }))
   

  const newUser = {
    Enabled: true,
    FirstName: formInputs.firstName,
    LastName: formInputs.lastName,
    Email: formInputs.email,
    Attributes: {
        orgID: [formInputs.orgID]
    }
}

const [createAccount] = useCreateAccountMutation()

const handleCreateAccount = async (e) => {
    e.preventDefault()
    await createAccount(newUser)
}

  return (
        <Form onSubmit={handleCreateAccount}>
            <h1>create user form </h1>
            <Row>
                <Input id="user-email" label="Email" type="email" value={formInputs.email} onChange={setEmail} autoComplete="username" />
                <Input id="user-org-id" label="Organization ID" type="text" value={formInputs.orgID} onChange={setOrgID}  />
                <Column>
                    <Input id="user-first-name" label="First Name" type="text" value={formInputs.firstName} onChange={setFirstName} />
                </Column>
                <Column>
                    <Input id="user-last-name" label="Last Name" type="text" value={formInputs.lastName} onChange={setLastName} />
                </Column>
            </Row>
            <Button>
                Create New user
            </Button>

        </Form>
    )
};