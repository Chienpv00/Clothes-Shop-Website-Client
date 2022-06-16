import { gql } from '@apollo/client'

const GET_USER = gql`
    query GetUser {
        getUser {
            fullName
            phone
            image
            email
            enable
            cardId
            prodBoughtId
        }
    }
`

export { GET_USER }
