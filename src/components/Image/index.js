/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { getDownloadURL, ref } from 'firebase/storage'

import styles from './Image.module.scss'
import images from '~/assets/images'
import config from '~/config'
const cx = classNames.bind(styles)

const Image = forwardRef(({ src, alt, ratio = '', opacity = false, className, ...props }, reference) => {
    const [fallback, setFallback] = useState('')
    const [imageURL, setImageURL] = useState('')
    useEffect(() => {
        let isSubcribe = true

        if (src && !src?.includes('/static'))
            getDownloadURL(ref(config.firebaseStorage, `${src}`))
                .then((url) => {
                    if (isSubcribe) setImageURL(url)
                })
                .catch((error) => console.log(error))
        return () => {
            setImageURL('')
            isSubcribe = false
        }
    }, [src])

    const classes = cx('wrapper', {
        [className]: className,
        [ratio]: ratio,
        opacity,
    })
    const handleError = () => {
        setFallback(images.noImage)
    }
    return (
        <div className={classes}>
            <img
                ref={reference}
                src={(src.includes('/static') ? src : imageURL) || fallback}
                alt={alt}
                {...props}
                onError={handleError}
            />
        </div>
    )
})

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    ratio: PropTypes.string,
    opacity: PropTypes.bool,
    className: PropTypes.string,
}

export default Image
