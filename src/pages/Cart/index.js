import React, { Fragment } from 'react'
import classNames from 'classnames/bind'
import { Helmet } from 'react-helmet-async'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useReactiveVar } from '@apollo/client'

import styles from './Cart.module.scss'
import HeaderImage from '~/components/HeaderImage'
import images from '~/assets/images'
import { FlexWrapper, Wrapper } from '~/components/Popper'
import Image from '~/components/Image'
import Input from '~/components/Input'
import Button from '~/components/Button'
import { formatMoney } from '~/utils'
import { cartItems, updateCart, removeFromCart } from '~/apollo/cartApollo'
import config from '~/config'

const cx = classNames.bind(styles)

function Cart() {
    const cart = useReactiveVar(cartItems)
    const total = cart.reduce((result, item) => {
        return result + item.product.price * item.quantity
    }, 0)

    const handleUpdateCart = (item, type) => {
        if (type === 'increase' && item.quantity < 1000) updateCart(item.product, 1)
        if (type === 'decrease' && item.quantity > 1) updateCart(item.product, -1)
    }

    return (
        <Fragment>
            <Helmet>
                <title>Giỏ Hàng</title>
            </Helmet>
            <div className={cx('wrapper')}>
                <HeaderImage image={images.cartBanner} alt={'Cart'} />
                {cart.length > 0 ? (
                    <div className={cx('container')}>
                        <Wrapper className={cx('row')} flexWrapper>
                            <FlexWrapper className={cx('item')} xxl={5} xl={5} lg={5}>
                                <span>Sản Phẩm</span>
                            </FlexWrapper>
                            <FlexWrapper className={cx('item', 'quantity')} xxl={2} xl={2} lg={2}>
                                <span>Số Lượng</span>
                            </FlexWrapper>
                            <FlexWrapper className={cx('item', 'price')} xxl={3} xl={3} lg={3}>
                                <span>Giá</span>
                            </FlexWrapper>
                            <FlexWrapper className={cx('item')} xxl={2} xl={2} lg={2}>
                                <span />
                            </FlexWrapper>
                        </Wrapper>
                        {cart.map((item) => (
                            <Wrapper key={item.product.id} flexWrapper className={cx('row')}>
                                <FlexWrapper className={cx('item')} xxl={5} xl={5} lg={5}>
                                    <div className={cx('product')}>
                                        <div className={cx('image')}>
                                            <Image
                                                src={item.product.thumbnail}
                                                ratio="ratio3x4"
                                                alt={item.product.name}
                                            />
                                        </div>
                                        <span>{item.product.name}</span>
                                    </div>
                                </FlexWrapper>
                                <FlexWrapper className={cx('item')} xxl={2} xl={2} lg={2}>
                                    <button
                                        onClick={() => handleUpdateCart(item, 'decrease')}
                                        className={cx('change-quantity-btn')}
                                    >
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                    <Input
                                        min={1}
                                        max={999}
                                        value={item.quantity}
                                        className={cx('quantity-inp')}
                                        primary
                                        type="number"
                                        readOnly
                                        onChange={(e) => console.log(e.target.value)}
                                    />
                                    <button
                                        onClick={() => handleUpdateCart(item, 'increase')}
                                        className={cx('change-quantity-btn')}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </FlexWrapper>
                                <FlexWrapper className={cx('item', 'price')} xxl={3} xl={3} lg={3}>
                                    <span>{formatMoney(item.product.price)} VND</span>
                                </FlexWrapper>
                                <FlexWrapper className={cx('item')} xxl={2} xl={2} lg={2}>
                                    <Button
                                        onClick={() => removeFromCart(item.product)}
                                        primary
                                        className={cx('remove-btn')}
                                    >
                                        Xóa
                                    </Button>
                                </FlexWrapper>
                            </Wrapper>
                        ))}
                        <Wrapper flexWrapper>
                            <FlexWrapper xxl={5} xl={5} lg={5}>
                                <span />
                            </FlexWrapper>
                            <FlexWrapper className={cx('footer', 'quantity')} xxl={2} xl={2} lg={2}>
                                <h3>Tổng cộng: </h3>
                            </FlexWrapper>
                            <FlexWrapper className={cx('footer', 'price')} xxl={3} xl={3} lg={3}>
                                <span>{formatMoney(total)} VND</span>
                            </FlexWrapper>
                            <FlexWrapper className={cx('footer')} xxl={2} xl={2} lg={2}>
                                <Button to={'/payment'} primary className={cx('payment-btn')}>
                                    Thanh Toán
                                </Button>
                            </FlexWrapper>
                        </Wrapper>
                    </div>
                ) : (
                    <div className={cx('no-item')}>
                        <h2>Bạn chưa có sản phẩm nào trong giỏ hàng!</h2>
                        <Button primary to={`${config.routes.productTop}?type=ao-so-mi`}>
                            Mua hàng ngay
                        </Button>
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default Cart