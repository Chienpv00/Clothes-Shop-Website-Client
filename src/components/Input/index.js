import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './Input.module.scss'

const cx = classNames.bind(styles)

function Input({
    primary,
    size = 'md-size',
    textarea = false,
    shadow = '',
    className,
    onFocus,
    onBlur,
    onChange,
    ...passProps
}) {
    const _props = {
        onFocus,
        onBlur,
        onChange,
        ...passProps,
    }

    let Comp = textarea ? 'textarea' : 'input'

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        textarea,
        [size]: size,
        [shadow]: shadow,
    })
    return <Comp className={classes} {..._props} />
}

Input.propTypes = {
    primary: PropTypes.bool,
    size: PropTypes.string,
    textarea: PropTypes.bool,
    shadow: PropTypes.string,
    className: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
}

export default React.memo(Input)
