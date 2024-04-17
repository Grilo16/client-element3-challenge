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
      const token = tokenData.token;
      const expireDate = new Date(tokenData.expire);
      expireDate.setHours(expireDate.getHours() + 1);
      document.cookie = `token=${token}; expires=${expireDate.toUTCString()}; path=/`;
}


const baseQuery = fetchBaseQuery({
    baseUrl: `${FetchUrl}`,
    credentials: "include",
    prepareHeaders: (headers) => {
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
            setCookieJWTToken(refreshResult?.data)
            result = await baseQuery(args, api, extraOptions)
        }else{
            Cookies.remove("token")
            return
        }
    }
    return result
}
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({}),
}) 

