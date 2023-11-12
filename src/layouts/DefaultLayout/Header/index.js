import React, { useState } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'

import styles from './Header.module.scss'
import images from '~/assets/images'
import Button from '~/components/Button'
import Search from '../../components/Search'
import config from '~/config'
import { useCartNumber, useUser } from '~/utils/utils'
import { deleteTokens } from '~/utils/manageTokens'
import { Avatar, Divider, ListItemIcon, Menu, MenuItem, Tooltip, Zoom } from '@mui/material'
import { toast } from 'react-toastify'
import { Logout, AdminPanelSettings, Settings } from '@mui/icons-material'

const cx = classNames.bind(styles)

function Header() {
    const navigate = useNavigate()
    const { user, refetchUser } = useUser()
    const { cartNumber } = useCartNumber()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        deleteTokens()
        refetchUser()
        toast.success('Đã thoát phiên đăng nhập!')
    }

    return (
        <>
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
                        <div className={cx('info')}>
                            <Tooltip
                                TransitionComponent={Zoom}
                                sx={{ fontSize: '20px !important' }}
                            >
                                <Avatar
                                    onClick={handleClick}
                                    alt={user.fullName}
                                    src={user.thumbnail || ''}
                                    sx={{ width: '60px', height: '60px' }}
                                />
                            </Tooltip>
                        </div>
                    )}
                    <div className={cx('left-container-footer')}>
                        <Search />

                        <button onClick={() => navigate(config.routes.cart)}>
                            <FontAwesomeIcon icon={faCartShopping} />
                            <span className={cx('quantity-product')}>{cartNumber > 99 ? '99+' : cartNumber}</span>
                        </button>
                    </div>
                </div>
            </header>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose} sx={{ fontSize: 14 }}>
                    <Avatar /> Thông tin tài khoản
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose} sx={{ fontSize: 14 }}>
                    <ListItemIcon>
                        <Settings fontSize="medium" />
                    </ListItemIcon>
                    Đơn hàng của tôi
                </MenuItem>
                <MenuItem onClick={handleLogout} to={config.routes.home} sx={{ fontSize: 14 }}>
                    <ListItemIcon>
                        <Logout fontSize="medium" />
                    </ListItemIcon>
                    Đăng xuất
                </MenuItem>
                {user?.role === 'ADMIN' ? (
                    <>
                        <MenuItem to={config.routes.userManagement} sx={{ fontSize: 14 }}>
                            <ListItemIcon>
                                <AdminPanelSettings fontSize="medium" />
                            </ListItemIcon>
                            Trang web quản trị
                        </MenuItem>
                    </>
                ) : (
                    ''
                )}
            </Menu>
        </>
    )
}

export default Header
