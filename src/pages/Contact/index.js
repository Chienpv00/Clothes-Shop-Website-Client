/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Fragment } from 'react'
import classNames from 'classnames/bind'
import { Helmet } from 'react-helmet-async'

import styles from './Contact.module.scss'
import images from '~/assets/images'
import Input from '~/components/Input'
import Button from '~/components/Button'
import HeaderImage from '~/components/HeaderImage'

const cx = classNames.bind(styles)

const contactMethods = [
    {
        id: 1,
        title: 'Địa chỉ của chúng tôi',
        content: [
            'Chi nhánh 1: 133b Hoàng Diệu 2, P.Linh Trung, Q.Thủ Đức, HCM',

            'Chi nhánh 2: 218-220 Quang Trung, P.10, Q.Gò Vấp, HCM',
            'Chi nhánh 3: 73 Nguyễn Gia Trí (D2 cũ), P.25, Q.Bình Thạnh, HCM',
            'Chi nhánh 4: 535 Nguyễn Tri Phương, P.8, Q.10, HCM',
            'Chi nhánh 5: 48 Tô Vĩnh Diện, P.Linh Chiểu, Q.Thủ Đức, HCM',
        ],
    },
    { id: 2, title: 'Email', content: ['vivoshop@gmail.com'] },
    { id: 3, title: 'Số điện thoại', content: ['0123456789'] },
]
function Contact() {
    return (
        <Fragment>
            <Helmet>
                <title>Liên hệ</title>
            </Helmet>
            <div className={cx('wrapper')}>
                <HeaderImage image={images.contact} alt={'Contact'} />
                <div className={cx('container')}>
                    <div className={cx('left-container')}>
                        <span className={cx('title')}>Gửi thắc mắc cho chúng tôi</span>
                        <form className={cx('contact-form')} onSubmit={(e) => e.preventDefault()}>
                            <Input className={cx('contact-input')} primary placeholder="Họ và tên" size="xl-size" />
                            <Input className={cx('contact-input')} primary placeholder="Số điện thoại" size="xl-size" />
                            <Input className={cx('contact-input')} primary placeholder="Email" size="xl-size" />
                            <Input
                                className={cx('contact-input')}
                                primary
                                textarea
                                placeholder="Nội dung"
                                size="xl-size"
                            />
                            <Button primary className={cx('contact-btn')}>
                                Gửi cho chúng tôi
                            </Button>
                        </form>
                    </div>
                    <div className={cx('right-container')}>
                        <span className={cx('title')}>Liên hệ</span>
                        {contactMethods.map((method) => {
                            return (
                                <div key={method.id} className={cx('method')}>
                                    <strong>{method.title}</strong>
                                    {method.content.map((item, index) => (
                                        <div key={index}>{item}</div>
                                    ))}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={cx('image-container')}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.2311711962034!2d106.80086541462147!3d10.87001416043201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527587e9ad5bf%3A0xafa66f9c8be3c91!2sUniversity%20of%20Information%20Technology%20-%20VNUHCM!5e0!3m2!1sen!2s!4v1643486726041!5m2!1sen!2s"
                        allowFullScreen=""
                        loading="lazy"
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default Contact
