import React from 'react'
import classNames from 'classnames/bind'

import styles from './DetailedProduct.module.scss'
import { FlexWrapper, Wrapper as ProductWrapper } from '~/components/Popper'
import { newImports } from '~/data'
import Card from '~/components/Card'
import convertLink from '~/utils/convertLink'
import config from '~/config'
import ProductInformation from '~/components/ProductInformation'

const cx = classNames.bind(styles)

function DetailedProduct() {
    return (
        <div className={cx('wrapper')}>
            <ProductInformation product={newImports[0]} />
            <hr />
            <h2>SẢN PHẨM LIÊN QUAN</h2>
            <ProductWrapper flexWrapper>
                {newImports.map((newImport) => (
                    <FlexWrapper key={newImport.id}>
                        <Card
                            to={`${config.routes.detailed}?product=${convertLink(newImport.name)}`}
                            title={newImport.name}
                            // onClick={() => alert('say hi')}
                            image={newImport.thumbnail}
                            textStyle={'capitalize'}
                        >
                            {`${newImport.price} VND`}
                        </Card>
                    </FlexWrapper>
                ))}
            </ProductWrapper>
        </div>
    )
}

export default DetailedProduct
