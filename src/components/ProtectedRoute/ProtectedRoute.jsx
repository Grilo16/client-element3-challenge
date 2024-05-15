import { useEffect, useState } from "react";
import { useKeycloak } from '@react-keycloak/web'
import { getTokenFromCookie, setCookieJWTToken } from "../../features/api"
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({children}) => {
    // const token = null
    // const token = getTokenFromCookie()
    // return !token ? <Navigate to={"/login"}/> : children
    const { keycloak, initialized } = useKeycloak();
    const [authChecked, setAuthChecked] = useState(false);
  
    useEffect(() => {
      if (!initialized) {
        return;
      }
      if (keycloak.authenticated) {
        setAuthChecked(true);
        setCookieJWTToken(keycloak.token)
      } else {
        keycloak.login().catch(console.error);
      }
    }, [keycloak, initialized]);
  
    if (!initialized || !authChecked) {
      return <div>Loading...</div>; // Or any other loading state representation
    }
  
    return keycloak.authenticated ? children : <Navigate to="/login" />;
  };
    