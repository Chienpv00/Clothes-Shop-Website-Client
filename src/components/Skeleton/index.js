import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './Skeleton.module.scss'

const cx = classNames.bind(styles)

function Skeleton({ image = false }) {
    return (
        <div className={cx('wrapper')}>
            {image && <div className={cx('image')} />}
            <div className={cx('title')} />
            <div className={cx('content')} />
        </div>
    )
}

Skeleton.propTypes = {
    image: PropTypes.bool,
}

export default Skeleton
