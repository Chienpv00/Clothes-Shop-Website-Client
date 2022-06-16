import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import { GET_USER } from '~/config/queryGQLConst/user'

export function useUser() {
    const [user, setUser] = useState()

    const { loading, error } = useQuery(GET_USER, {
        onCompleted: (data) => {
            setUser(data.getUser)
        },
    })

    return {
        user,
        setUser,
        loading,
        error,
    }
}
