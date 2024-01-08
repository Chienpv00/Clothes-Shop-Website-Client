import classNames from 'classnames'
import { useContext } from 'react'
import Image from '~/components/Image'
import { TransactionContext } from '~/context/TransactionContext'
import styles from './Order.module.scss'
import { Button } from 'antd'
const cx = classNames.bind(styles)

export function Orders() {
    const { transactions } = useContext(TransactionContext);

    console.log(transactions)

    const formatDate = (date) => {
        const dateStr = date.toString().split(' ')[0]
        const dateArr = dateStr.split('/')
        const newDateStr = `${dateArr[1]}/${dateArr[0]}/${dateArr[2]}`
        const newDate = new Date(newDateStr)
        return newDate.toLocaleDateString()
    }

    return (
        <div className="">
            <div className="order__header mb-4">
                <h1>Lịch sử đơn hàng</h1>
            </div>

            <div className="order__body">
                <div className="order__body__sum text-secondary fs-4">
                    Đơn hàng của bạn: {transactions?.length || 0} đơn hàng
                </div>
                {transactions.length ? (
                    transactions.map((order) => {
                        return (
                            <div key={order.timestamp} className="order__body__item border rounded p-3 shadow mb-5"> 
                                <div className="order__body__item__header mb-3 d-flex justify-content-between">
                                    <div className="order__body__item__header__date">{formatDate(order.timestamp)}</div>
                                    <div className="order__body__item__header__status">
                                        <Button type="primary" shape="round">Đã xác nhận</Button>
                                    </div>
                                </div>

                                <div className="order__body__item__body">
                                    {order.items.map((product) => {
                                        const item = product.product[0]

                                        return (
                                            <div key={product.id} className="order__body__item__body__item d-flex gap-4 border-bottom mb-3" >
                                                <div style={{width: '70px'}}>
                                                    <Image cla src={item.thumbnail} ratio="ratio3x4" alt={item.title} />
                                                </div>
                                                <div className="order__body__item__body__item__info">
                                                    <div className="order__body__item__body__item__info__name">
                                                        {item.title}
                                                    </div>
                                                    <div className="order__body__item__body__item__info__size">
                                                        Size: {item.sizes[0].name}
                                                    </div>
                                                    <div className="order__body__item__body__item__info__price">
                                                        Giá: {item.price * product.quantity} đ
                                                    </div>
                                                    <div className="order__body__item__body__item__info__quantity">
                                                        Số lượng: {product.quantity}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className="order__body__empty text-secondary fs-4">Bạn chưa có đơn hàng nào</div>
                )}
            </div>
        </div>
    )
}
