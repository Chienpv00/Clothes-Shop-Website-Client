import React, { Fragment, useState, createContext } from 'react'
import classNames from 'classnames/bind'
import { Helmet } from 'react-helmet-async'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useLazyQuery, useMutation, useQuery, useReactiveVar } from '@apollo/client'

import styles from './Cart.module.scss'
import HeaderImage from '~/components/HeaderImage'
import images from '~/assets/images'
import { FlexWrapper, Wrapper } from '~/components/Popper'
import Image from '~/components/Image'
import Input from '~/components/Input'
import Button from '~/components/Button'
import { formatMoney } from '~/utils'
import config from '~/config'
import api from '~/config/api'
import { useUser } from '~/utils/utils'
import LoadingSpinner from '~/components/Loading'
import { Alert, Checkbox, FormControl, Snackbar } from '@mui/material'
import { saveCarts } from '~/utils/manageCart'

const cx = classNames.bind(styles)

function Cart() {
    const { user } = useUser()
    const [total, setTotal] = useState(0)
    const [onChange, setOnChange] = useState(false)
    const [cartSelected, setCartSelected] = useState([])
    const [open, setOpen] = useState(true)
    const { data, loading, refetch } = useQuery(api.queries.user.GET_CART, {
        fetchPolicy: 'no-cache',
    })

    console.log('🚀 ~ file: index.js ~ line 29 ~ Cart ~ cartSelected', cartSelected)
    const [callAddToCart] = useMutation(api.mutations.user.ADD_TO_CART)
    const [callRemoveCart] = useMutation(api.mutations.user.REMOVE_CARD)

    const handleUpdateCart = async (item, type) => {
        setOnChange(true)
        if (type == 'increase') {
            await callAddToCart({ variables: { prodId: parseInt(item.product[0].id), quantity: 1 } })
            setOnChange(false)
            refetch()
            return
        }
        await callAddToCart({ variables: { prodId: parseInt(item.product[0].id), quantity: -1 } })
        setOnChange(false)
        refetch()
    }

    const handleRemoveCart = async (item) => {
        setOnChange(true)
        await callRemoveCart({ variables: { prodId: parseInt(item.product[0].id) } })
        refetch()
        setOnChange(false)
    }

    const handleChange = (event, item) => {
        console.log('🚀 ~ file: index.js ~ line 60 ~ handleChange ~ item', item)
        if (event.target.checked === true) {
            if (cartSelected.length === 0) {
                setCartSelected([item.product])
                setTotal(item.product[0].price)
            } else {
                setCartSelected((prev) => [...prev, item.product])
                setTotal((prev) => prev + item.product[0].price)
            }
        } else {
            const temp = cartSelected.filter((value) => {
                return value.id !== item.product[0].id
            })
            setCartSelected(temp)
            setTotal((prev) => prev - item.product[0].price)
        }
    }

    const handlePayment = () => {
        saveCarts({cart: cartSelected, total: total})
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    return (
        <Fragment>
            <Helmet>
                <title>Giỏ Hàng</title>
            </Helmet>
            <div className={cx('wrapper')}>
                <HeaderImage image={images.cartBanner} alt={'Cart'} />
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div>
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={open}
                            autoHideDuration={6000}
                            onClose={handleClose}
                        >
                            <Alert onClose={handleClose} severity="info" sx={{ width: '100%', fontSize: '18px' }}>
                                Bạn có thể chọn hàng trong giỏ và thanh toán! 🐧
                            </Alert>
                        </Snackbar>
                        {data?.getCart.length > 0 ? (
                            <div className={cx('container')}>
                                <Wrapper className={cx('row')} flexWrapper>
                                    <FlexWrapper className={cx('item')} xxl={1} xl={1} lg={1}></FlexWrapper>
                                    <FlexWrapper className={cx('item')} xxl={4} xl={4} lg={4}>
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
                                {data.getCart.map((item) => (
                                    <Wrapper key={item.id} flexWrapper className={cx('row')}>
                                        <FlexWrapper className={cx('item')} xxl={1} xl={1} lg={1}>
                                            <Checkbox
                                                onChange={(event) => {
                                                    handleChange(event, item)
                                                }}
                                                size="140"
                                                className={cx('check-box')}
                                                color="success"
                                                disabled={item.product[0].soldOut}
                                            />
                                        </FlexWrapper>

                                        <FlexWrapper className={cx('item')} xxl={4} xl={4} lg={4}>
                                            <div className={cx('product')}>
                                                <div className={cx('image')}>
                                                    <Image
                                                        src={item.product[0].thumbnail}
                                                        ratio="ratio3x4"
                                                        alt={item.product[0].title}
                                                    />
                                                </div>
                                                <span>{item.product[0].title}</span>
                                            </div>
                                        </FlexWrapper>

                                        <FlexWrapper className={cx('item')} xxl={2} xl={2} lg={2}>
                                            <button
                                                onClick={() => handleUpdateCart(item, 'decrease')}
                                                className={cx('change-quantity-btn')}
                                                disabled={onChange}
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
                                                disabled={onChange}
                                            >
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </FlexWrapper>
                                        <FlexWrapper className={cx('item', 'price')} xxl={3} xl={3} lg={3}>
                                            <span>{formatMoney(item.product[0].price)} VND</span>
                                        </FlexWrapper>
                                        <FlexWrapper className={cx('item')} xxl={2} xl={2} lg={2}>
                                            <Button
                                                onClick={() => {
                                                    handleRemoveCart(item)
                                                }}
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
                                        <Button
                                            disabled={!cartSelected.length}
                                            to={cartSelected.length ? '/payment' : ''}
                                            primary
                                            className={cx('payment-btn')}
                                            onClick={handlePayment}
                                        >
                                            Thanh Toán
                                        </Button>
                                    </FlexWrapper>
                                </Wrapper>
                            </div>
                        ) : (
                            <div className={cx('no-item')}>
                                <h2>Bạn chưa có sản phẩm nào trong giỏ hàng!</h2>
                                <Button primary to={`${config.routes.productTop}?type=dam`}>
                                    Mua hàng ngay
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default Cart
