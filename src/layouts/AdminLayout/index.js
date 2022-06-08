import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './AdminLayout.module.scss'
import Header from './Header'
import Navigation from './Navigation'

const cx = classNames.bind(styles)

function AdminLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <Navigation />
            <div className={cx('container')}>{children}</div>
        </div>
    )
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AdminLayout
