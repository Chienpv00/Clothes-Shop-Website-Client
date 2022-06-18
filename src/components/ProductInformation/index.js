import React, { useState } from 'react'
import { toast } from 'react-toastify'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'

import styles from './ProductInformation.module.scss'
import Image from '~/components/Image'
import Button from '~/components/Button'
import { FlexWrapper, Wrapper } from '~/components/Popper'
import SoldOut from '~/components/SoldOut'
import { useCartNumber, useUser } from '~/utils/utils'
import api from '~/config/api'
import { useMutation } from '@apollo/client'

const cx = classNames.bind(styles)

function ProductInformation({ product }) {
    const [sizeSelected, setSizeSelected] = useState('')
    const { user } = useUser()
    const [callAddToCart] = useMutation(api.mutations.user.ADD_TO_CART)
    const { refetchCartNumber } = useCartNumber()

    const handleSelectSize = (value, isSoldOut) => {
        if (!isSoldOut) setSizeSelected(sizeSelected === value ? '' : value)
    }

    const handleAddToCart = async () => {
        if (!user) {
            toast.info('Bạn phải đăng nhập trước! 👌')
            return
        }
        if (sizeSelected) {
            await callAddToCart({
                variables: { prodId: parseInt(product.id) },
                onCompleted: () => {
                    setSizeSelected('')
                    toast.success('Đã thêm vào giỏ hàng!')
                },
            })
            refetchCartNumber()
            // addToCart(product, 1)
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
                        <h2>{product.title}</h2>
                        <h3>{product.price} VND</h3>
                    </div>
                    <div className={cx('content')}>
                        {product.description} <br />
                        Chất liệu: <span style={{ opacity: '0.8' }}>{product.material}</span> <br />
                        Form dáng: <span style={{ opacity: '0.8' }}>{product.form}</span> <br />
                        Màu sắc: <span style={{ opacity: '0.8' }}>{product.color}</span> <br />
                        Sản xuất: <span style={{ opacity: '0.8' }}>{product.madeBy}</span>
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
