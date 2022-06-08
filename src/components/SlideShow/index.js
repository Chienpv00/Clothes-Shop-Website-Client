/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

import styles from './SlideShow.module.scss'
import images from '~/assets/images'
import Image from '~/components/Image'

const cx = classNames.bind(styles)

function SlideShow() {
    const [current, setCurrent] = useState(0)
    const slides = [
        { name: 'slide1', url: images.slide1 },
        { name: 'slide2', url: images.slide2 },
        { name: 'slide3', url: images.slide3 },
    ]

    const handleNext = () => {
        let clone = current + 1
        if (clone > slides.length - 1) clone = 0
        setCurrent(clone)
    }

    const handlePrev = () => {
        let clone = current - 1
        if (clone < 0) clone = slides.length - 1
        setCurrent(clone)
    }

    useEffect(() => {
        const timer = setInterval(() => {
            let clone = current + 1
            if (clone > slides.length - 1) clone = 0
            setCurrent(clone)
        }, 3000)

        return () => clearInterval(timer)
    }, [current])

    return (
        <div className={cx('wrapper')}>
            {slides.map((slide) => {
                if (slide.name === `slide${current + 1}`)
                    return (
                        <div key={slide.name} className={cx('container')}>
                            <Image src={slides[current].url} alt={slides[current].name} />
                        </div>
                    )
                return <Fragment key={slide.name} />
            })}
            <div className={cx('dot')}>
                {slides.map((slide, index) => {
                    if (slide.name === `slide${current + 1}`)
                        return <span key={slide.name} className={cx('current-dot')} />
                    return <span key={slide.name} onClick={() => setCurrent(index)} />
                })}
            </div>
            <button className={cx('prev')} onClick={handlePrev}>
                <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <button className={cx('next')} onClick={handleNext}>
                <FontAwesomeIcon icon={faAngleRight} />
            </button>
        </div>
    )
}

export default SlideShow
