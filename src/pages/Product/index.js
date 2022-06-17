import React, { Fragment } from 'react'
import classNames from 'classnames/bind'
import { Helmet } from 'react-helmet-async'

import styles from './Product.module.scss'
import Title from '~/components/Title'
import { Wrapper as ProductWrapper, FlexWrapper } from '~/components/Popper'
import Button from '~/components/Button'
import { useQueryHook } from '~/hooks'
import ProductItem from '~/components/ProductItem'
import { useQuery } from '@apollo/client'
import constant from '~/config/constant'
import api from '~/config/api'
const cx = classNames.bind(styles)

function Product() {
    let query = useQueryHook().get('type')

    const [title] = constant.product.categories.filter((category) => category.id === query)
    const { data, loading } = useQuery(api.queries.product.PRODUCTS_FOR_PRODUCT, {
        variables: { category: title.id, limit: constant.product.LIMIT_PRODUCT_PAGE },
    })

    if (loading) {
        return <div>Đang tải ...</div>
    }

    return (
        <Fragment>
            <Helmet>
                <title>{title.name}</title>
            </Helmet>
            <div className={cx('wrapper')}>
                <Title content={title.name} />
                <ProductWrapper flexWrapper>
                    {data.getProductByCat.map((item) => (
                        <FlexWrapper key={item.id}>
                            <ProductItem product={item} />
                        </FlexWrapper>
                    ))}
                </ProductWrapper>
                <Button text>Xem thêm...</Button>
            </div>
        </Fragment>
    )
}

export default Product
