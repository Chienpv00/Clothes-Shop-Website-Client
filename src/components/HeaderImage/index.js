import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './HeaderImage.module.scss'
import Image from '~/components/Image'

const cx = classNames.bind(styles)

function HeaderImage({ image, alt, className }) {
    const classes = cx('wrapper', {
        [className]: className,
    })
    return (
        <div className={classes}>
            <Image src={image} alt={alt} />
        </div>
    )
}

HeaderImage.propTypes = {
    image: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
}

export default HeaderImage
