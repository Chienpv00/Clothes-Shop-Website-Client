import { gql } from '@apollo/client'

export const LOGIN = gql`
    mutation Mutation($password: String!, $email: String) {
        login(password: $password, email: $email) {
            accessToken
            refreshToken
        }
    }
`

export const SIGN_IN = gql`
    mutation Mutation($user: CreateCus!) {
        createCus(user: $user) {
            code
            success
            message
            user {
                id
                fullName
                email
                image
                enable
                verificationCode
                role
            }
        }
    }
`
