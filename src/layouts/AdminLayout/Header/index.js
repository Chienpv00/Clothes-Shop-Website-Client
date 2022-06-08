import React from 'react'
import classNames from 'classnames/bind'

import styles from './Header.module.scss'
import Button from '~/components/Button'
import config from '~/config'
import useAuth from '~/hooks/useAuth'

const cx = classNames.bind(styles)

function Header() {
    const { logout } = useAuth()

    return (
        <div className={cx('wrapper')}>
            <Button to={config.routes.home}>VỀ TRANG CHỦ</Button>
            <Button primary onClick={() => logout()}>
                Đăng xuất
            </Button>
        </div>
    )
}

export default Header
