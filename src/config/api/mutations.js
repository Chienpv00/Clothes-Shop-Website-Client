import { gql } from '@apollo/client'

export const product = {}

export const user = {
    ADD_TO_CART: gql`
        mutation Mutation($prodId: Int!, $quantity: Int) {
            addToCart(prodId: $prodId, quantity: $quantity) {
                code
                success
                message
                cart {
                    id
                    userId
                    product {
                        id
                        title
                        price
                        thumbnail
                        category
                        description
                        type
                        material
                        form
                        color
                        madeBy
                        sizes {
                            name
                            soldOut
                        }
                        soldOut
                        commentId {
                            id
                            user {
                                id
                                email
                                password
                                fullName
                                phone
                                image
                                enable
                                verificationCode
                                role
                                prodBoughtId
                            }
                            content
                            star
                            reply {
                                id
                                content
                                star
                            }
                        }
                    }
                    quantity
                }
            }
        }
    `,
    REMOVE_CARD: gql`
        mutation Mutation($prodId: Int) {
            removeCart(prodId: $prodId) {
                code
                success
                message
            }
        }
    `,
}

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

export const order = {
    ADD_NEW_ORDER: gql`
        mutation AddOrder($address: String!, $method: Int!, $total: Int!, $prodIdArr: [Int]) {
            addOrder(address: $address, method: $method, total: $total, prodIdArr: $prodIdArr) {
                code
                success
                message
            }
        }
    `,
}
