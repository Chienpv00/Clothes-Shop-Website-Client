import React, { useState } from 'react'
import classNames from 'classnames/bind'

import styles from './SubNav.module.scss'

const cx = classNames.bind(styles)

const subNav = [
    { id: 0, name: 'Chờ xác nhận' },
    { id: 1, name: 'Đang giao hàng' },
    { id: 2, name: 'Giao hàng thành công' },
]

function SubNav() {
    const [deliveryStatus, setDeliveryStatus] = useState(0)

    return (
        <ul className={cx('wrapper')}>
            {subNav.map((item) => (
                <li
                    onClick={() => setDeliveryStatus(item.id)}
                    key={item.id}
                    className={item.id === deliveryStatus ? cx('active') : ''}
                >
                    {item.name}
                </li>
            ))}
            <div className={cx('current-sub-nav')} />
        </ul>
    )
}

export default SubNav
