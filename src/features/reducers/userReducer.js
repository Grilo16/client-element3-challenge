import {createSlice} from "@reduxjs/toolkit"


const userReducer = createSlice({
    name: "user",

    initialState:{
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
    },

    reducers: {
        setUserData: (state, action) => {
            const {firstName, lastName, email, dateOfBirth} = action.payload
            state.firstName = firstName
            state.lastName = lastName
            state.email = email
            state.dateOfBirth = dateOfBirth
        },
        
        clearUserData: (state, action) => {
            state.firstName = ""
            state.lastName = ""
            state.email = ""
            state.dateOfBirth = ""
        }
    }
})

export default userReducer.reducer
export const {
    setUserData,
    clearUserData,
} = userReducer.actions

export const selectUserFirstName = (state) => state.user.firstName
export const selectUserLastName = (state) => state.user.lastName
export const selectUserEmail = (state) => state.user.email
export const selectUserDateOfBirth = (state) => state.user.dateOfBirth