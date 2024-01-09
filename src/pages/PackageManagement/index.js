import React, { Fragment, useContext } from 'react'
import classNames from 'classnames/bind'

import styles from './PackageManagement.module.scss'
import { FlexWrapper, Wrapper } from '~/components/Popper'
import Button from '~/components/Button'
import HeaderTable from '~/components/HeaderTable'
import NoItem from '~/components/NoItem'
import { TransactionContext } from '~/context/TransactionContext'

const cx = classNames.bind(styles)

const headerTable = [
    { column: 1, width: 2, title: 'Ngày đặt hàng' },
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
    const { transactions } = useContext(TransactionContext)

    const formatDate = (date) => {
        const dateStr = date.toString().split(' ')[0]
        const dateArr = dateStr.split('/')
        const newDateStr = `${dateArr[1]}/${dateArr[0]}/${dateArr[2]}`
        const newDate = new Date(newDateStr)
        return newDate.toLocaleDateString()
    }

    const buildItems = (items)=>{
        const item = items.map((item)=>{
            return `${item.product[0].title} x${item.quantity}`
        })

        return item.join(', ')
    }

    const countTotalPrice = (items) => {
        let totalPrice = 0
        items.forEach((item) => {
            totalPrice += item.quantity * item.product[0].price
        })
        return totalPrice + ' đ'
    }

    return (
        <div className={cx('wrapper')}>
            {console.log('package', transactions)}
            {transactions.length > 0 && <HeaderTable tHeader={headerTable} />}
            {transactions.map((transaction, index) => (
                <Fragment key={index}>
                    <Wrapper flexWrapper>
                        <FlexWrapper
                            className={cx('package-col-info')}
                            xxl={headerTable[0].width}
                            xl={headerTable[0].width}
                            lg={headerTable[0].width}
                            md={headerTable[0].width}
                        >
                            {formatDate(transaction.timestamp)}
                        </FlexWrapper>
                        <FlexWrapper
                            className={cx('package-col-info')}
                            xxl={headerTable[1].width}
                            xl={headerTable[1].width}
                            lg={headerTable[1].width}
                            md={headerTable[1].width}
                        >
                            {transaction.fullName + (transaction.deliveryAddress && ' ' + transaction.deliveryAddress)}
                        </FlexWrapper>
                        <FlexWrapper
                            className={cx('package-col-info')}
                            xxl={headerTable[2].width}
                            xl={headerTable[2].width}
                            lg={headerTable[2].width}
                            md={headerTable[2].width}
                        >
                            {buildItems(transaction.items)}
                        </FlexWrapper>
                        <FlexWrapper
                            className={cx('package-col-info')}
                            xxl={headerTable[3].width}
                            xl={headerTable[3].width}
                            lg={headerTable[3].width}
                            md={headerTable[3].width}
                        >
                            {countTotalPrice(transaction.items)}
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
                                Từ chối
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
