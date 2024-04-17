import { useState } from "react";
import { Form, Input, ModalComponent } from "../layout";
import { SignUpForm } from "./SignUpForm";
import { useMyAccount } from "../../hooks";

export const LoginForm = () => {
  
  const {handleLogin} = useMyAccount()
  
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })

  const setEmail = (value) => setCredentials(current => ({...current, email: value }))
  const setPassword = (value) => setCredentials(current => ({...current, password: value }))



  return (
    <Form className="px-4">
      <Input id="emailInputId" type="text" label="Email Address" value={credentials.email} onChange={setEmail} autoComplete="username" />
      <Input id="passwordInputId" type="password" label="Password" value={credentials.password} onChange={setPassword} autoComplete="current-password"/>

      <div className="row row-cols-md-3 justify-content-center ">
        <div className="col text-center">
          <button type="submit" className="btn btn-darkAccent text-white w-75" onClick={(e) => handleLogin(e, credentials)}>
            <strong>Log in</strong> 
          </button>
        </div>
      </div>
    </Form>
  );
};
