import { gql } from '@apollo/client'

export const product = {}

export const user = {}

export const auth = {
    LOGIN: gql`
        mutation Mutation($password: String!, $email: String) {
            login(password: $password, email: $email) {
                accessToken
                refreshToken
            }
        }
    `,
    SIGN_IN: gql`
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
    `,
}
