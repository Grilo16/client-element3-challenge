import { useState } from "react"
import { Form, Input } from "../layout"
import { logout, useLoginMutation, useNewUserMutation } from "../../features"
import { useNavigate } from "react-router-dom"

export const SignUpForm = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newUser] = useNewUserMutation()
    const [loginUser] = useLoginMutation()
    const navigate = useNavigate()

    const handleCreateUser = async (e) => {
         e.preventDefault();
    try {
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            dateOfBirth: new Date(dateOfBirth),
        };

        const createUserResult = await newUser(user).unwrap();
        if (!createUserResult) {
            throw new Error("User creation failed");
        }
        
        const credentials = {
            email: user.email,
            password: user.password,
        };

        const loginResult = await loginUser(credentials).unwrap();
        if (!loginResult) {
            throw new Error("Login failed after user creation");
        }

        const token = loginResult.token;
        const expireDate = new Date(loginResult.expire);
        expireDate.setHours(expireDate.getHours() + 1);
        document.cookie = `token=${token}; expires=${expireDate.toUTCString()}; path=/`;
        navigate("/");

    } catch (error) {
        console.error("User creation and login failed:", error);
        logout();
    }
     }


    return (
  <Form>
    <div className="row">
      <div className="col-md-6">
        <Input id="user-email" label="Email" type="email" value={email} onChange={setEmail}  autoComplete="username" />
      </div>
      <div className="col-md-6">
        <Input id="user-password" label="Password" type="password" value={password} onChange={setPassword} autoComplete="current-password"/>
      </div>
    </div>
    <div className="row">
        
      <div className="col-md-4">
        <Input id="first-name" label="First Name" type="text" value={firstName} onChange={setFirstName}/>
      </div>
      <div className="col-md-4">
        <Input id="last-name" label="Last Name" type="text" value={lastName} onChange={setLastName}/>
      </div>
      <div className="col-md-4">
        <Input id="date-of-birth" label="Date of birth" type="date" value={dateOfBirth} onChange={setDateOfBirth}/>
      </div>
    </div>

    <div className="w-100 row">
        <button onClick={handleCreateUser} data-bs-dismiss="modal"  type="submit" className="btn btn-primary text-white w-50 m-auto col-6"><strong>Create account</strong></button>
    </div>
  </Form>
    )
}