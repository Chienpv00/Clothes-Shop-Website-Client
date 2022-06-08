import React from 'react'
import classNames from 'classnames/bind'

import styles from './SoldOut.module.scss'

const cx = classNames.bind(styles)

function SoldOut() {
    return <div className={cx('wrapper')}>SOLD OUT</div>
}

export default SoldOut
