import React from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery, useReactiveVar } from '@apollo/client'

import styles from './Header.module.scss'
import images from '~/assets/images'
import Button from '~/components/Button'
import Search from '../../components/Search'
import config from '~/config'
import { useUser } from '~/utils/utils'
import { deleteTokens } from '~/utils/manageTokens'
import api from '~/config/api'
import { Avatar, Tooltip, Zoom } from '@mui/material'

const cx = classNames.bind(styles)

function Header() {
    const navigate = useNavigate()
    const { user, refetchUser } = useUser()
    const { data, refetch } = useQuery(api.queries.user.GET_CART_LENGTH, { fetchPolicy: 'no-cache' })

    const handleLogout = () => {
        deleteTokens()
        refetchUser();
    }

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
                    <div className={cx('info')} >
                        <Tooltip TransitionComponent={Zoom} sx={{ fontSize: '20px !important' }} title={user.email}>
                            <Avatar
                                alt={user.fullName}
                                src={user.thumbnail || ''}
                                sx={{ width: '60px', height: '60px' }}
                            />
                        </Tooltip>
                        <Button onClick={handleLogout} to={config.routes.home} className={cx('custom-btn')}>
                            Đăng xuất
                        </Button>
                    </div>
                )}
                <div className={cx('left-container-footer')}>
                    <Search />

                    <button onClick={() => navigate(config.routes.cart)}>
                        <FontAwesomeIcon icon={faCartShopping} />
                        <span className={cx('quantity-product')}>
                            {data?.getCartLength > 99 ? '99+' : data?.getCartLength}
                        </span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
