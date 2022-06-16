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

import { useQuery } from "@apollo/client";
import {PRODUCTS_FOR_HOME} from '../../config/queryGQLConst/productConstant'


const cx = classNames.bind(styles)

function Home() {

    const {data, loading} = useQuery(PRODUCTS_FOR_HOME)
    if (loading) return <p>loading</p>
    return (
        <Fragment>
            {console.log(data)}
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
                    {data?.getProductsForHome[0].map((newProduct) => (
                        <FlexWrapper key={newProduct.id}>
                            <ProductItem product={newProduct} />
                        </FlexWrapper>
                    ))}
                </ProductWrapper>
                <hr />
                <Title content={'sản phẩm hot'} rightContent={'Xem thêm...'} />
                <ProductWrapper flexWrapper>
                    {data?.getProductsForHome[1].map((hotProduct) => (
                        <FlexWrapper key={hotProduct.id}>
                            <ProductItem product={hotProduct} />
                        </FlexWrapper>
                    ))}
                </ProductWrapper>
                <hr />
                <Title content={'hàng mới về'} rightContent={'Xem thêm...'} />
                <ProductWrapper flexWrapper>
                    {data?.getProductsForHome[2].map((newImport) => (
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
