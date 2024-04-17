import * as Pages from ".";

export const routeIndex = [
    {
        element: <Pages.Home/>,
        label: "Home",
        path: "/",
        isProtected: true,
    },
    {
        element: <Pages.Users/>,
        path: "/users",
        label: "Users",
        isProtected: true,
    },
    {
        element: <Pages.Login/>,
        path: "/login",
        label: "Log in",
    },

]
