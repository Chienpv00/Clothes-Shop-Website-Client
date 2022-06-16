import React from 'react'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'

import styles from './ProductItem.module.scss'
import Card from '~/components/Card'
import convertLink from '~/utils/convertLink'
import config from '~/config'
import { formatMoney } from '~/utils'
import SoldOut from '~/components/SoldOut'

const cx = classNames.bind(styles)

function ProductItem({ product }) {
    return (
        <div className={cx('wrapper')}>
            <Card
                to={`${config.routes.detailed}?id=${product.id}&product=${convertLink(product.title)}`}
                title={product.title}
                // onClick={() => console.log(convertLink(product.name))}
                image={product.thumbnail}
                imageOpacity={product.soldOut}
                textStyle={'capitalize'}
            >
                {`${formatMoney(product.price)} VND`}
            </Card>
            {product.soldOut && <SoldOut />}
        </div>
    )
}

ProductItem.propTypes = {
    product: PropTypes.object,
}

export default React.memo(ProductItem)
