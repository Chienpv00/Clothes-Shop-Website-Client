import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './Popper.module.scss'

const cx = classNames.bind(styles)

function Wrapper({ children, flexWrapper = false, className }) {
    const classes = cx('wrapper', {
        [className]: className,
        flexWrapper,
    })

    return <div className={classes}>{children}</div>
}

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
    flexWrapper: PropTypes.bool,
    className: PropTypes.string,
}

export default Wrapper
