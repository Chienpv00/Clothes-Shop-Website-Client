import React, { Fragment } from 'react'
import classNames from 'classnames/bind'
import { Helmet } from 'react-helmet-async'

import styles from './ReturnPolicy.module.scss'
import Title from '~/components/Title'
import { FlexWrapper, Wrapper } from '~/components/Popper'
import images from '~/assets/images'
import Image from '~/components/Image'

const cx = classNames.bind(styles)

const policies = [
    {
        id: 1,
        image: images.policy1,
        content: (
            <div>
                Chỉ áp dụng với các <strong>sản phẩm nguyên giá</strong> hoặc sử dụng mã giảm giá không quá 30%, còn
                nhãn mã và hoá đơn mua hàng. (Sản phẩm giảm giá từ 30% trở lên vui lòng không đổi hàng)
            </div>
        ),
    },
    {
        id: 2,
        image: images.policy2,
        content: (
            <div>
                Thời gian đổi hàng trong vòng <strong>30 ngày</strong> kể từ ngày xuất hoá đơn.
            </div>
        ),
    },
    {
        id: 3,
        image: images.policy3,
        content: (
            <div>
                Sản phẩm đổi phải là <strong>sản phẩm chưa qua sử dụng</strong>, chưa qua giặt - tẩy, còn nguyên vẹn
                nhãn mác trên sản phẩm, không bị vấy bẩn hoặc ám mùi lạ,...
            </div>
        ),
    },
    {
        id: 4,
        image: images.policy4,
        content: (
            <div>
                Mỗi sản phẩm trên hoá đơn mua hàng <strong>chỉ được đổi 01 lần.</strong>
            </div>
        ),
    },
    {
        id: 5,
        image: '/return-policy/policy5.png',
        content: (
            <div>
                <strong>Không áp dụng trả hàng</strong> để lấy lại tiền mặt dưới bất kỳ hình thức nào. Không hoàn tiền
                thừa trong trường hợp sản phẩm đổi có giá trị thấp hơn.
            </div>
        ),
    },
    {
        id: 6,
        image: images.policy6,
        content: <div>Không áp dụng cho phụ kiện.</div>,
    },
]
function ReturnPolicy() {
    return (
        <Fragment>
            <Helmet>
                <title>Chính Sách Đổi Trả</title>
            </Helmet>
            <div className={cx('wrapper')}>
                <Title content={'Chính sách đổi trả'} />
                <h2>VivoShop nhận đổi trả sản phẩm với các quy định sau:</h2>
                <div className={cx('container')}>
                    {policies.map((policy) => (
                        <Wrapper key={policy.id} flexWrapper>
                            <FlexWrapper xxl={2} xl={2} lg={2} md={2}>
                                <div className={cx('image-container')}>
                                    <Image
                                        className={cx('image')}
                                        ratio={'ratio1x1'}
                                        src={policy.image}
                                        alt={`Chính sách đổi trả ${policy.id}`}
                                    />
                                </div>
                            </FlexWrapper>
                            <FlexWrapper xxl={10} xl={10} lg={10} md={10} className={cx('content')}>
                                {policy.content}
                            </FlexWrapper>
                        </Wrapper>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}

export default ReturnPolicy
