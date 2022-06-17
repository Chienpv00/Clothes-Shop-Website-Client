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

export const user = {}
