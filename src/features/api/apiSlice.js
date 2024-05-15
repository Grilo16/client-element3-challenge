import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

const Url = "http://localhost"
const Port = "8080"
export const FetchUrl = `${Url}:${Port}`

export const getTokenFromCookie = () => {
    const cookies = Object.fromEntries(document.cookie.split(';').map(cookie => cookie.trim().split('=')));
    return cookies['token'] || '';
}

export const setCookieJWTToken = (tokenData) => {
      document.cookie = `token=${tokenData}; expires=session; path=/`;
}


const baseQuery = fetchBaseQuery({
    baseUrl: `${FetchUrl}`,
    credentials: "include",
    prepareHeaders: (headers) => {
        const token = getTokenFromCookie()
        if(token){
            headers.set("Authorization", `Bearer ${token}`)
        }  
        return headers 
    },
})

export const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.status === 401){
        const refreshResult = await baseQuery({url: "/refresh", method: "POST"}, api, extraOptions)
        if(refreshResult?.token){
            setCookieJWTToken(refreshResult)
            result = await baseQuery(args, api, extraOptions)
        }else{
            Cookies.remove("token")
            return
        }
    }
    return result
}
export const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: builder => ({}),
}) 

