import { Link, useLocation } from "react-router-dom";
import { getTokenFromCookie } from "../../../features/api";

export const NavLink = ({path, label, isProtected}) => {
    const {pathname: currentPath} = useLocation()
    const token = getTokenFromCookie()
    const selectStatus = currentPath === path ? "active" : ""

    return token && isProtected || !token && !isProtected
        ? (
            <li className="nav-item">
                <Link className={`nav-link ${selectStatus}`} aria-current="page" to={path}>{label}</Link> 
            </li>
        )
        : null
}