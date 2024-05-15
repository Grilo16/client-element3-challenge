import { createSlice } from "@reduxjs/toolkit";

const adminReducer = createSlice({
    name: "admin",

    initialState : {
        orgID : "",
        users: [
            {
                email: "",
                firstName: "",
                lastName: "", 
            },    
        ]
    },

    reducers: {
        setOrgId: (state, action) => {
            const {orgID} = action.payload 
            state.orgID = orgID
        },

        addUser: (state, action) => {
            state.users.push({
                email: "",
                firstName: "",
                lastName: "", 
            })
        },
        
        updateUserByIndex: (state, action) => {
            const {index, updates} = action.payload
            const user = state.users[index] 
            state.users[index] = {...user, ...updates}
        },

        deleteUserByIndex: (state, action) => {
            const {index} = action.payload
            state.users.splice(index, 1)
        }
    }

})

export const { 
    setOrgId,
    addUser,
    updateUserByIndex,
    deleteUserByIndex
} = adminReducer.actions
export default adminReducer.reducer

export const selectUsers = (state) => state.admin.users
export const selectOrgID = (state) => state.admin.orgID