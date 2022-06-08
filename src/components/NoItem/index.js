import React from 'react'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'

import styles from './NoItem.module.scss'

const cx = classNames.bind(styles)

function NoItem({ content }) {
    return <h2 className={cx('wrapper')}>Chưa có {content} nào!</h2>
}

NoItem.propTypes = {
    content: PropTypes.string,
}

export default NoItem
