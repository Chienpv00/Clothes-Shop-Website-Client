import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import { GET_CAT_CONSTANT } from '~/config/queryGQLConst/productConstant'
import api from '~/config/api'

export function useUser() {
    const [user, setUser] = useState()

    const { loading, error } = useQuery(api.queries.user.GET_USER, {
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
        fetchPolicy: 'no-cache',
        onCompleted: (data) => {
            setCategories(data.getCatsSchema)
        },
    })
    return { categories, setCategories, loading, error }
}
