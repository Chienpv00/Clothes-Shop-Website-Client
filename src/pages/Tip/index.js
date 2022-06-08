import React, { Fragment } from 'react'
import classNames from 'classnames/bind'
import { Helmet } from 'react-helmet-async'

import styles from './Tip.module.scss'
import Image from '~/components/Image'
import images from '~/assets/images'

const cx = classNames.bind(styles)

function Tip() {
    return (
        <Fragment>
            <Helmet>
                <title>Tips: Đi học mặc gì?</title>
            </Helmet>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h1>Đi học mặc gì?</h1>
                    <span>Admin 22/11/2020</span>
                    <div className={cx('description')}>
                        <p>
                            Thời điểm kết thúc lớp 12 cũng chính là lúc chúng ta tạm biệt người bạn “áo đồng phục” để
                            bắt đầu cho sự tự do lựa chọn phong cách mặc đồ đi học.
                        </p>
                        <p>
                            Nhưng nếu không muốn mỗi buổi sáng đều phải đắn đo suy nghĩ nên mặc gì trước khi tới giảng
                            đường thì bạn hãy ghim ngay 5 tips "Đi học mặc gì ?" dưới đây nhé!
                        </p>
                    </div>
                </div>
                <div className={cx('content')}>
                    <h2>1. Jean ống rộng + áo len</h2>
                    <div className={cx('image')}>
                        <Image ratio={'ratio1x1'} src={images.candytop} alt="" />
                    </div>
                    <div className={cx('content-description')}></div>
                </div>
            </div>
        </Fragment>
    )
}

export default Tip
