import {
  useCreateMyAccountMutation,
  useDeleteMyAccountMutation,
  useEditMyAccountMutation,
  useGetMyAccountQuery,
} from "../features/api/myAccountApiSlice";
import { getTokenFromCookie, setCookieJWTToken, useLoginMutation } from "../features";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const useMyAccount = () => {
  const navigate = useNavigate();
  const token = getTokenFromCookie()

  const { data: myAccount } = useGetMyAccountQuery(null, {skip: !token});
  const [createAccount] = useCreateMyAccountMutation();
  const [editMyAccount] = useEditMyAccountMutation();
  const [deleteMyAccount] = useDeleteMyAccountMutation();
  const [login] = useLoginMutation();


  const logout = () => Cookies.remove("token");

  const handleCreateAccount = async (e, newAccountData) => {
    e.preventDefault();
    const { dateOfBirth, ...rest } = newAccountData;
    const newAccount = {
      dateOfBirth: new Date(dateOfBirth),
      ...rest,
    };
    try {
      const createAccountResult = await createAccount(newAccount).unwrap();
      if (!createAccountResult) {
        throw new Error("User creation failed");
      }
      const loginResult = await login({
        email: newAccountData.email,
        password: newAccountData.password,
      }).unwrap();

      if (!loginResult) {
        throw new Error("Login failed after user creation");
      }
      setCookieJWTToken(loginResult);
      navigate("/");
    } catch (error) {
      console.error("User creation and login failed:", error);
    }
  };

  const handleEditMyAccount = async (e, data) => {
    e.preventDefault();
    const edits = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value)
    );
    await editMyAccount({ edits: edits });
  };

  
  const handleLogin = async (e, credentials) => {
      e.preventDefault();
      const result = await login(credentials).unwrap();
      if (result) {
          setCookieJWTToken(result);
          navigate("/");
    } else {
        console.log("login failed");
    }
};
    const handleDeleteMyAccount = async (e) => {
    await deleteMyAccount();
    logout();
    navigate("/login");
    };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  return {
    myAccount,
    handleLogin,
    handleLogout,
    handleCreateAccount,
    handleEditMyAccount,
    handleDeleteMyAccount,
  };
};
