import { useState } from "react"
import { Form, Input } from "../../layout"

export const CreateUserForm = ({userData, onChange}) => {
    
    const handleChange = (e) => {
        const {name, value} = e.target
        onChange({...userData, [name]: value})
    } 
 

    return (
        <Form>
            <Input id="user-email" name={"email"} label="Email" type="email" value={userData.email} onChange={handleChange} autoComplete="username"  />
            <Input id="user-name"  name={"name"} label="Name" type="password" value={userData.name} onChange={handleChange} autoComplete="username" />
        </Form>
    )


}