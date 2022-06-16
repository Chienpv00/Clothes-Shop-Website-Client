import React from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useReactiveVar } from '@apollo/client'

import styles from './Header.module.scss'
import images from '~/assets/images'
import Button from '~/components/Button'
import Search from '../../components/Search'
import { cartItems } from '~/apollo/cartApollo'
import config from '~/config'
import { useUser } from '~/utils/utils'

const cx = classNames.bind(styles)

function Header() {
    const navigate = useNavigate()
    const cart = useReactiveVar(cartItems)
    const {user} = useUser()
    return (
        <header className={cx('wrapper')}>
            <Link to={config.routes.home} className={cx('logo')}>
                <img src={images.logo} alt="logo" />
            </Link>

            <div className={cx('left-container')}>
                {!user ? (
                    <div className={cx('left-container-header')}>
                        <Button to={config.routes.login} className={cx('custom-btn')}>
                            Đăng nhập
                        </Button>
                        <span> hoặc </span>
                        <Button to={config.routes.signup} className={cx('custom-btn')}>
                            Tạo tài khoản
                        </Button>
                    </div>
                ) : (
                    <div>{user.email}</div>
                )}
                <div className={cx('left-container-footer')}>
                    <Search />

                    <button onClick={() => navigate(config.routes.cart)}>
                        <FontAwesomeIcon icon={faCartShopping} />
                        <span className={cx('quantity-product')}>{cart.length > 99 ? '99+' : cart.length}</span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
