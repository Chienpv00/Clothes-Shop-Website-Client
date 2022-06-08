import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './Title.module.scss'
import Button from '~/components/Button'

const cx = classNames.bind(styles)

function Title({ content, rightContent }) {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('left-title')}>{content}</span>
            {rightContent && (
                <Button text className={cx('right-title')}>
                    {rightContent}
                </Button>
            )}
        </div>
    )
}

Title.propTypes = {
    content: PropTypes.string.isRequired,
    rightContent: PropTypes.string,
}

export default Title
