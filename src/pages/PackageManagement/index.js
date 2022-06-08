import React, { Fragment } from 'react'
import classNames from 'classnames/bind'

import styles from './PackageManagement.module.scss'
import { FlexWrapper, Wrapper } from '~/components/Popper'
import Button from '~/components/Button'
import HeaderTable from '~/components/HeaderTable'
import NoItem from '~/components/NoItem'

const cx = classNames.bind(styles)

const headerTable = [
    { column: 1, width: 2, title: 'Mã đơn hàng' },
    { column: 2, width: 3, title: 'Người nhận hàng' },
    { column: 3, width: 2, title: 'Đơn hàng' },
    { column: 4, width: 2, title: 'Tổng tiền' },
    { column: 5, width: 3, title: '' },
]

//When having API, remove it
const fakePackages = [
    {
        id: 'askjahsd1jq',
        packageInfo: 'x2 Quần Jean, size M\nx1 Áo Thun, size M\nx1 Áo Kiểu, size M',
        userInfo: 'Đào Đại Dương\nĐại chỉ: KTX khu B, Đại học Quốc gia TPHCM',
        totalPrice: '549 000 VND',
    },
    {
        id: 'asdjhasdjkh',
        packageInfo: 'x2 Quần Jean, size M\nx1 Áo Thun, size M\nx1 Áo Kiểu, size M',
        userInfo: 'Đào Đại Dương\nĐại chỉ: KTX khu B, Đại học Quốc gia TPHCM',
        totalPrice: '549 000 VND',
    },
    {
        id: 'kjasdkjasds',
        packageInfo: 'x2 Quần Jean, size M\nx1 Áo Thun, size M\nx1 Áo Kiểu, size M',
        userInfo: 'Đào Đại Dương\nĐại chỉ: KTX khu B, Đại học Quốc gia TPHCM',
        totalPrice: '549 000 VND',
    },
]

function PackageManagement() {
    return (
        <div className={cx('wrapper')}>
            {fakePackages.length > 0 && <HeaderTable tHeader={headerTable} />}
            {fakePackages.map((fakePackage) => (
                <Fragment key={fakePackage.id}>
                    <Wrapper flexWrapper>
                        <FlexWrapper
                            className={cx('package-col-info')}
                            xxl={headerTable[0].width}
                            xl={headerTable[0].width}
                            lg={headerTable[0].width}
                            md={headerTable[0].width}
                        >
                            {fakePackage.id}
                        </FlexWrapper>
                        <FlexWrapper
                            className={cx('package-col-info')}
                            xxl={headerTable[1].width}
                            xl={headerTable[1].width}
                            lg={headerTable[1].width}
                            md={headerTable[1].width}
                        >
                            {fakePackage.userInfo}
                        </FlexWrapper>
                        <FlexWrapper
                            className={cx('package-col-info')}
                            xxl={headerTable[2].width}
                            xl={headerTable[2].width}
                            lg={headerTable[2].width}
                            md={headerTable[2].width}
                        >
                            {fakePackage.packageInfo}
                        </FlexWrapper>
                        <FlexWrapper
                            className={cx('package-col-info')}
                            xxl={headerTable[3].width}
                            xl={headerTable[3].width}
                            lg={headerTable[3].width}
                            md={headerTable[3].width}
                        >
                            {fakePackage.totalPrice}
                        </FlexWrapper>
                        <FlexWrapper
                            className={cx('package-col-info')}
                            xxl={headerTable[4].width}
                            xl={headerTable[4].width}
                            lg={headerTable[4].width}
                            md={headerTable[4].width}
                        >
                            <Button primary className={cx('confirm-btn')}>
                                Xác nhận
                            </Button>
                            <Button primary className={cx('remove-btn')}>
                                Xóa
                            </Button>
                        </FlexWrapper>
                    </Wrapper>
                    <div className={cx('bottom-line')} />
                </Fragment>
            ))}
            {fakePackages.length < 1 && <NoItem content={'đơn hàng'} />}
        </div>
    )
}

export default PackageManagement
