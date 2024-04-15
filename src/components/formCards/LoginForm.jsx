import { useState } from "react";
import { Form, Input, ModalComponent } from "../layout";
import { SignUpForm } from "./SignUpForm";
import { clearUserData, logout, setUserData, useGetUserQuery, useLoginMutation } from "../../features";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"

export const LoginForm = () => {

  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [Modal, Button] = ModalComponent({id:"create-account-modal", label :"create-account-modal-label", headerTitle: "Create new account"})
  const [loginUser] = useLoginMutation()
  const [skip, setSkip] = useState(true)
  const {data: user} = useGetUserQuery({skip: skip})
  const navigate = useNavigate()
  const dispatch = useDispatch()
 
  const handleLogin = async (e) => {
    e.preventDefault()
    const credentials = {
      email: email,
      password: password,
    }
    const result = await loginUser(credentials).unwrap()
    if (!result) {
          logout()
          setSkip(true)
          dispatch(clearUserData())
        return
    } else {
      const expires = new Date(result?.expire)
      expires.setHours(expires.getHours() + 1)
      expires.toUTCString()
      document.cookie = `token=${result?.token}; expires=${expires}; path=/`
      setSkip(false)
      if (user?.id){
        dispatch(setUserData(user))
      }


      navigate("/")
    }
  }

  return (
    <div>

    <Form className="px-4">
      <Input id="emailInputId" type="text" label="Email Address" value={email} onChange={setEmail} autoComplete="username" />
      <Input id="passwordInputId" type="password" label="Password" value={password} onChange={setPassword} autoComplete="current-password"/>


      <div className="row row-cols-md-3 justify-content-center ">
        <div className="col text-center">
          <button type="submit" className="btn btn-darkAccent text-white w-75" onClick={handleLogin}>
            <strong>Log in</strong> 
          </button>
        </div>

      <div className="col text-center">
        <h4><strong>or</strong></h4>
      </div>
      <div className="col text-center">
          <Button type="submit" className="btn btn-primary text-white w-75">
            <strong>Create account</strong> 
          </Button>
        </div>
      </div>
    </Form>
          <Modal>
            <SignUpForm/>
          </Modal>
    </div>
  );
};
