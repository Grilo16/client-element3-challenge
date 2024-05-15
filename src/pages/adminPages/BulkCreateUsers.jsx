import { useState } from "react";
import { Button, CreateUserForm, Input, Main, Row } from "../../components"
import { useAdmin } from "../../hooks/useAdmin";

export const BulkCreateUsers = () => {

    const {orgID, users, handleSetOrgId, handleAddUser, handleUpdateUser, handleDeleteUser} = useAdmin()

    const newUserForms = users.map((user, index) => {
        const {firstName, lastName, email} = user
        return (-
        <Row key={index} rowCols="row-cols-4">
            <Input id="user-first-name" name="firstName" label="First Name" type="text" value={firstName} onChange={(e) => handleUpdateUser(e, index)} />
            <Input id="user-last-name" name="lastName" label="Last Name" type="text" value={lastName} onChange={(e) => handleUpdateUser(e, index)} />
            <Input id="user-email" name="email" label="Email" type="email" value={email} onChange={(e) => handleUpdateUser(e, index)} />
            <Button onClick={handleDeleteUser}>delete </Button>
        </Row>
    )}) 

    return (
        <Main>
            <Input id="org-id" label="Organization ID" type="text" value={orgID} onChange={handleSetOrgId} />
            {newUserForms}
            <Button onClick={handleAddUser}>Add user</Button>
        </Main>
    )
};8
