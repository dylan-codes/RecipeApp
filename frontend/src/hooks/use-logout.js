import { useContext } from "react"
import AuthContext from "../context/auth-context"
import InventoryContext from "../context/inventory-context"

export const useLogout = () => {
    const AuthCtx = useContext(AuthContext)
    const InventoryCtx = useContext(InventoryContext)

    const logout = () => {
        // remove user from local storage
        localStorage.removeItem('user')

        // dispatch logout action
        InventoryCtx.clear();
        AuthCtx.logout();
    }

    return {logout}
}