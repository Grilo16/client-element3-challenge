import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

const Url = "http://localhost"
const Port = "8080"
export const FetchUrl = `${Url}:${Port}`

export const getTokenFromCookie = () => {
    const cookies = Object.fromEntries(document.cookie.split(';').map(cookie => cookie.trim().split('=')));
    return cookies['token'] || '';
}

export const logout = () => {
    Cookies.remove("token")
};

const baseQuery = fetchBaseQuery({
    baseUrl: `${FetchUrl}`,
    credentials: "include",
    prepareHeaders: (headers, {getState}) => {
        const access = getTokenFromCookie()
        if(access){
            headers.set("Authorization", `Bearer ${access}`)
        }  
        return headers 
    },
})

export const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.status === 401){
        const refreshResult = await baseQuery({url: "/refresh", method: "POST"}, api, extraOptions)
        if(refreshResult?.data?.token){
            const expires = new Date(refreshResult?.data?.expire)
            expires.setHours(expires.getHours() + 1)
            expires.toUTCString()
            document.cookie = `token=${refreshResult?.data?.token}; expires=${expires}; path=/`
            result = await baseQuery(args, api, extraOptions)
        }else{
            logout()
        }
    }
    return result
}
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({}),
}) 

