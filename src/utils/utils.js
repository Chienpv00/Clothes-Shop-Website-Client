import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import { GET_CAT_CONSTANT } from '~/config/queryGQLConst/productConstant'
import api from '~/config/api'

export function useUser() {
    const [user, setUser] = useState()
    
    const { loading, error, refetch } = useQuery(api.queries.user.GET_USER, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            setUser(data.getUser)
        },
    })
    
    const refetchUser = () => {
        refetch()
    }

    return {
        user,
        setUser,
        loading,
        error,
        refetchUser,
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

export function useCartNumber() {
    const [cartNumber, setCartNumber] = useState()
    const { loading, error, refetch } = useQuery(api.queries.user.GET_CART_LENGTH, {
        fetchPolicy: 'no-cache',    
        onCompleted: (data) => {
            setCartNumber(data.getCartLength)
        },
    })

    const refetchCartNumber = () => { 
        refetch()
     }

    return { cartNumber, loading, error, refetchCartNumber }
}
