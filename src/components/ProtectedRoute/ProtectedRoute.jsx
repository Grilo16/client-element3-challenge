import { getTokenFromCookie } from "../../features/api"
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({children}) => {
    const token = getTokenFromCookie()
    return !token ? <Navigate to={"/login"}/> : children
}