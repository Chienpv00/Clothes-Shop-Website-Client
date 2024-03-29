import { gql } from '@apollo/client'

const PRODUCTS_FOR_HOME = gql`
    query Query {
        getProductsForHome {
            id
            title
            price
            thumbnail
            category
            type
            soldOut
        }
    }
`

const PRODUCT_FOR_DETAIL = gql`
    query Query($getProductId: Int!) {
        getProduct(id: $getProductId) {
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
        }
    }
`

const GET_CAT_CONSTANT = gql`
    query Query {
        getCatsSchema {
            id
            name
        }
    }
`

export { PRODUCTS_FOR_HOME, PRODUCT_FOR_DETAIL, GET_CAT_CONSTANT }
