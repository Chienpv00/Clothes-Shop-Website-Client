import { gql } from '@apollo/client'

export const product = {
    PRODUCTS_FOR_PRODUCT: gql`
        query Query($category: String!, $limit: Int!) {
            getProductByCat(category: $category, limit: $limit) {
                id
                title
                price
                thumbnail
                category
                type
                soldOut
            }
        }
    `,
}

export const user = {
    GET_USER: gql`
        query GetUser {
            getUser {
                fullName
                phone
                image
                email
                enable
                prodBoughtId
            }
        }
    `,
    GET_CART: gql`
        query Query {
            getCart {
                id
                userId
                product {
                    id
                    title
                    thumbnail
                    category
                    sizes {
                        name
                        soldOut
                    }
                    soldOut
                    price
                }
                quantity
            }
        }
    `,
    GET_CART_LENGTH: gql`
        query Query {
            getCartLength
        }
    `,
}
