import { Link, useLocation } from "react-router-dom";

export const NavLink = ({path, label}) => {
    const {pathname: currentPath} = useLocation()

    return (
        <li className="nav-item">
        {   
            currentPath === path
            ? <Link className="nav-link active" aria-current="page" to={path}>{label}</Link> 
            : <Link className="nav-link" to={path}>{label}</Link> 
        }
        </li>
    )
}