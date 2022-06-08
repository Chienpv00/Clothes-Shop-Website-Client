import React, { Fragment } from 'react'
import classNames from 'classnames/bind'
import { Helmet } from 'react-helmet-async'

import styles from './Product.module.scss'
import Title from '~/components/Title'
import { somis } from '~/data'
import { Wrapper as ProductWrapper, FlexWrapper } from '~/components/Popper'
import Button from '~/components/Button'
import { useQuery } from '~/hooks'
import ProductItem from '~/components/ProductItem'

const cx = classNames.bind(styles)

const categories = [
    { id: 'ao-so-mi', name: 'Áo Sơ Mi' },
    { id: 'ao-kieu', name: 'Áo Kiểu' },
    { id: 'ao-thun', name: 'Áo Thun' },
    { id: 'quan-jean', name: 'Quần Jean' },
    { id: 'quan-kieu', name: 'Quần Kiểu' },
    { id: 'chan-vay', name: 'Chân Váy' },
    { id: 'dam', name: 'Đầm' },
]
function Product() {
    let query = useQuery().get('type')

    const title = categories.filter((category) => category.id === query)

    return (
        <Fragment>
            <Helmet>
                <title>{title[0].name}</title>
            </Helmet>
            <div className={cx('wrapper')}>
                <Title content={title[0].name} />
                <ProductWrapper flexWrapper>
                    {somis.map((somi) => (
                        <FlexWrapper key={somi.id}>
                            <ProductItem product={somi} />
                        </FlexWrapper>
                    ))}
                </ProductWrapper>
                <Button text>Xem thêm...</Button>
            </div>
        </Fragment>
    )
}

export default Product
