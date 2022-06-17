import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import { GET_USER } from '~/config/queryGQLConst/user'
import { GET_CAT_CONSTANT } from '~/config/queryGQLConst/productConstant'

export function useUser() {
    const [user, setUser] = useState()

    const { loading, error } = useQuery(GET_USER, {
        fetchPolicy: 'no-cache',
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

export function useCategories() {
    const [categories, setCategories] = useState()
    const { loading, error } = useQuery(GET_CAT_CONSTANT, {
        
        onCompleted: (data) => {
            fetchPolicy: 'no-cache',
            setCategories(data.getCatsSchema)
        },
    })
    return { categories, setCategories, loading, error }
}


