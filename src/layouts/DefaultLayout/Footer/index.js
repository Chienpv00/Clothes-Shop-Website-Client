import React from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'

import styles from './Footer.module.scss'
import images from '~/assets/images'
import Button from '~/components/Button'
import { faFacebook, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons'
import config from '~/config'

const cx = classNames.bind(styles)

const links = [
    { path: '/provision', name: 'Điều khoản chung' },
    { path: '/order-method', name: 'Phương thức đặt hàng' },
    { path: '/payment', name: 'Thanh toán và giao nhận' },
    { path: config.routes.returnPolicy, name: 'Chính sách đổi trả' },
    { path: '/private-policy', name: 'Chính sách bảo mật' },
    { path: '/faq', name: 'Câu hỏi thường gặp' },
]

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('left-container')}>
                <div className={cx('footer-logo')}>
                    <img src={images.logoFooter} alt="footer logo" />
                </div>
                <span>Your style, your choice</span>
            </div>
            <div className={cx('mid-container')}>
                <h1>Kết nối với Vivo</h1>
                <div className={cx('social-icon')}>
                    <FontAwesomeIcon icon={faFacebook} color="#0a80ec" />
                    <FontAwesomeIcon icon={faTiktok} color="#000" />
                    <FontAwesomeIcon icon={faTwitter} color="#1d9bf0" />
                </div>
                <Button className={cx('custom-btn')} text leftIcon={<FontAwesomeIcon icon={faPhone} />}>
                    090 789 3879
                </Button>
                <Button className={cx('custom-btn')} text leftIcon={<FontAwesomeIcon icon={faLocationDot} />}>
                    12/2, Linh Trung, Q.Thủ Đức, HCM
                </Button>
                <Button className={cx('custom-btn')} text leftIcon={<FontAwesomeIcon icon={faEnvelope} />}>
                    vivoshop@gmail.com
                </Button>
            </div>
            <div className={cx('right-container')}>
                <h1>BẠN NÊN BIẾT</h1>
                {links.map((link, index) => (
                    <Button key={index} to={link.path} className={cx('custom-link-btn')}>
                        {link.name}
                    </Button>
                ))}
            </div>
        </footer>
    )
}

export default Footer
