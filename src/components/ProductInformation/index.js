import React, { useState } from 'react'
import { toast } from 'react-toastify'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'

import styles from './ProductInformation.module.scss'
import Image from '~/components/Image'
import Button from '~/components/Button'
import { addToCart } from '~/apollo/cartApollo'
import { FlexWrapper, Wrapper } from '~/components/Popper'
import SoldOut from '~/components/SoldOut'

const cx = classNames.bind(styles)

function ProductInformation({ product }) {
    const [sizeSelected, setSizeSelected] = useState('')

    const handleSelectSize = (value, isSoldOut) => {
        if (!isSoldOut) setSizeSelected(sizeSelected === value ? '' : value)
    }

    const handleAddToCart = () => {
        if (sizeSelected) {
            addToCart(product, 1)
            setSizeSelected('')
            toast.success('Đã thêm vào giỏ hàng!')
        } else {
            toast.warning('Vui lòng chọn size!')
        }
    }

    return (
        <div className={cx('wrapper')}>
            <Wrapper flexWrapper>
                <FlexWrapper xxl={3} xl={3} lg={3}>
                    <div className={cx('image')}>
                        <Image src={product.thumbnail} opacity={product.soldOut} ratio="ratio3x4" alt="image" />
                        {product.soldOut && <SoldOut />}
                    </div>
                </FlexWrapper>
                <FlexWrapper xxl={9} xl={9} lg={9} className={cx('container')}>
                    <div className={cx('header')}>
                        <h2>{product.name}</h2>
                        <h3>{product.price} VND</h3>
                    </div>
                    <div className={cx('content')}>
                        Áo Thun được thiết kế in hình gấu nâu tạo điểm nhấn. <br />
                        Chất liệu: Thun Cotton <br />
                        Form dáng: Croptop & Freesize <br />
                        Màu sắc: Xám Sản xuất: Việt Nam.
                    </div>
                    <div className={cx('footer')}>
                        <div className={cx('size')}>
                            {product.sizes.map((size) => (
                                <div key={size.name}>
                                    <input
                                        id={`size${size.name}`}
                                        name={'size'}
                                        type={'checkbox'}
                                        disabled={size.soldOut || product.soldOut}
                                        checked={sizeSelected === size.name}
                                        onChange={() => handleSelectSize(size.name, size.soldOut)}
                                    />
                                    <label
                                        htmlFor={`size${size.name}`}
                                        className={size.soldOut || product.soldOut ? cx('disabled-size') : ''}
                                    >
                                        Size {size.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <Button primary disabled={product.soldOut} onClick={handleAddToCart}>
                            Thêm vào giỏ hàng
                        </Button>
                    </div>
                </FlexWrapper>
            </Wrapper>
        </div>
    )
}

ProductInformation.propTypes = {
    product: PropTypes.object,
}

export default ProductInformation
