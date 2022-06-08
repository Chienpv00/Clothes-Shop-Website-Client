import { useContext, createContext } from 'react'

export const UserContext = createContext()

function useAuth() {
    return useContext(UserContext)
}

export default useAuth
