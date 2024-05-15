import { useDispatch, useSelector } from "react-redux"
import { addUser, deleteUserByIndex, selectOrgID, selectUsers, setOrgId, updateUserByIndex } from "../features/reducers"

export const useAdmin = () => {

    const dispatch = useDispatch()
    const orgID = useSelector(selectOrgID)
    const users = useSelector(selectUsers)

    const handleSetOrgId = (value) => {
        dispatch(setOrgId(value))
    }

    const handleAddUser = () => {
        console.log("here")
        dispatch(addUser())
    }

    const handleUpdateUser = (e, index) => {
        const {name, value} = e.target
        const updates = {[name]: value}
        dispatch(updateUserByIndex({index, updates}))
    }

    const handleDeleteUser = (index) => {
        dispatch(deleteUserByIndex({index}))
    }

    return {
        orgID,
        users,
        handleAddUser,
        handleSetOrgId,
        handleUpdateUser,
        handleDeleteUser,
    }
}