import React from 'react'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxesPacking, faCubes, faMoneyCheck, faUser } from '@fortawesome/free-solid-svg-icons'

import styles from './Navigation.module.scss'
import Button from '~/components/Button'
import config from '~/config'
import SubNav from '../SubNav'

const cx = classNames.bind(styles)

const adminLink = [
    { route: config.routes.userManagement, name: 'QUẢN LÝ USERS', icon: <FontAwesomeIcon icon={faUser} /> },
    { route: config.routes.productManagement, name: 'QUẢN LÝ SẢN PHẨM', icon: <FontAwesomeIcon icon={faCubes} /> },
    {
        route: config.routes.packageManagement,
        name: 'QUẢN LÝ ĐƠN HÀNG',
        icon: <FontAwesomeIcon icon={faBoxesPacking} />,
    },
    { route: config.routes.postManagement, name: 'QUẢN LÝ BÀI VIẾT', icon: <FontAwesomeIcon icon={faMoneyCheck} /> },
]

function Navigation() {
    const location = useLocation()

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('main-nav')}>
                {adminLink.map((item) => (
                    <li key={item.name} className={item.route === location.pathname ? cx('active') : ''}>
                        <Button to={item.route} leftIcon={item.icon}>
                            {item.name}
                        </Button>
                    </li>
                ))}
                {<div className={cx('current-page')} />}
            </ul>
            {location.pathname === '/admin/package-management' && <SubNav />}
        </div>
    )
}

export default Navigation
