import React from 'react'
import classNames from 'classnames/bind'

import styles from './Header.module.scss'
import images from '~/assets/images'
import HeaderImage from '~/components/HeaderImage'
import Button from '~/components/Button'
import config from '~/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

function Header() {
    return (
        <div className={cx('wrapper')}>
            <Button to={config.routes.home} leftIcon={<FontAwesomeIcon icon={faHome} className={cx('header-link')} />}>
                VỀ TRANG CHỦ
            </Button>
            <HeaderImage className={cx('header-image')} image={images.tipBanner} alt={'Tip Banner'} />
        </div>
    )
}

export default Header