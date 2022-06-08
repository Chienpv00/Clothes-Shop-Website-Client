import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from 'firebase/auth'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import config from '~/config'
import { UserContext } from '~/hooks/useAuth'

function AuthContextProvider({ children }) {
    const [user, setUser] = useState({})

    const register = async (email, password, name) => {
        try {
            await createUserWithEmailAndPassword(config.firebaseAuth, email, password)
            const update = await updateProfile(config.firebaseAuth.currentUser, {
                displayName: name,
            })
            toast.success('Đăng ký thành công!')
            return update
        } catch (error) {
            toast.error('Email đã tồn tại!')
        }
    }
    const login = async (email, password) => {
        try {
            const user = await signInWithEmailAndPassword(config.firebaseAuth, email, password)
            toast.success('Đăng nhập thành công!')
            return user
        } catch (error) {
            toast.error('Email hoặc mật khẩu không chính xác!')
        }
    }
    const logout = async () => {
        try {
            await signOut(config.firebaseAuth)
            toast.success('Đã thoát phiên đăng nhập!')
        } catch (error) {
            toast.error(error)
        }
    }

    useEffect(() => {
        const unregisterAuthObserver = onAuthStateChanged(config.firebaseAuth, async (currentUser) => {
            console.log(currentUser)
            let objectUser = { email: '', accessToken: '' }
            if (currentUser)
                objectUser = {
                    name: currentUser.displayName,
                    email: currentUser.email,
                    accessToken: currentUser.accessToken,
                }
            setUser({ ...objectUser })
        })
        return () => {
            unregisterAuthObserver()
        }
    }, [])

    return <UserContext.Provider value={{ register, user, logout, login }}>{children}</UserContext.Provider>
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthContextProvider
