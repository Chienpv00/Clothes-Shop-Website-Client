import React, { Fragment } from 'react'
import classNames from 'classnames/bind'
import { Helmet } from 'react-helmet-async'

import styles from './Home.module.scss'
import Title from '~/components/Title'
import images from '~/assets/images'
import { Wrapper as ProductWrapper, FlexWrapper } from '~/components/Popper'
import SlideShow from '~/components/SlideShow'
import { hotProducts, newImports, newProducts } from '~/data'
import ProductItem from '~/components/ProductItem'

const cx = classNames.bind(styles)

function Home() {
    return (
        <Fragment>
            <Helmet>
                <title>Vivo Shop</title>
            </Helmet>
            <div className={cx('wrapper')}>
                <img className={cx('img-home', 'img-bell')} src={images.bell} alt="bell" />
                <img className={cx('img-home', 'img-christmas')} src={images.christmas} alt="christmas" />
                <img className={cx('img-home', 'img-tree')} src={images.tree} alt="tree" />
                <SlideShow />
                <Title content={'sản phẩm mới'} rightContent={'Xem thêm...'} />
                <ProductWrapper flexWrapper>
                    {newProducts.map((newProduct) => (
                        <FlexWrapper key={newProduct.id}>
                            <ProductItem product={newProduct} />
                        </FlexWrapper>
                    ))}
                </ProductWrapper>
                <hr />
                <Title content={'sản phẩm hot'} rightContent={'Xem thêm...'} />
                <ProductWrapper flexWrapper>
                    {hotProducts.map((hotProduct) => (
                        <FlexWrapper key={hotProduct.id}>
                            <ProductItem product={hotProduct} />
                        </FlexWrapper>
                    ))}
                </ProductWrapper>
                <hr />
                <Title content={'hàng mới về'} rightContent={'Xem thêm...'} />
                <ProductWrapper flexWrapper>
                    {newImports.map((newImport) => (
                        <FlexWrapper key={newImport.id}>
                            <ProductItem product={newImport} />
                        </FlexWrapper>
                    ))}
                </ProductWrapper>
            </div>
        </Fragment>
    )
}

export default Home
