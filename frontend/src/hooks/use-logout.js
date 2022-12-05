import { useContext } from "react"
import AuthContext from "../context/auth-context"

export const useLogout = () => {
    const AuthCtx = useContext(AuthContext)

    const logout = () => {
        // remove user from local storage
        localStorage.removeItem('user')

        // dispatch logout action
        AuthCtx.logout();
    }

    return {logout}
}