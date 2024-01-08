import * as React from 'react'
import classNames from 'classnames/bind'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { useFieldArray, useForm } from 'react-hook-form'

import Pick from './Pick'
import { getCarts, saveCarts } from '~/utils/manageCart'
import { Button, MenuItem } from '@mui/material'
import styles from './Payment.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useLazyQuery, useMutation, useQuery, useReactiveVar } from '@apollo/client'

import { FlexWrapper, Wrapper } from '~/components/Popper'
import Image from '~/components/Image'
import { formatMoney } from '~/utils'
import { useUser } from '~/utils/utils'
import LoadingSpinner from '~/components/Loading'
import { Alert, Checkbox, FormControl, Snackbar } from '@mui/material'
import api from '~/config/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Input, InputNumber, Radio, Select, Space } from 'antd'
import useAuth from '~/hooks/useAuth'
import { TransactionContext } from '~/context/TransactionContext'

const cx = classNames.bind(styles)

const style = {
    textTab: {
        fontSize: '1em',
        textTransform: 'none',
    },
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

export default function Payment() {
    const [value, setValue] = React.useState(0)
    const [method, setMethod] = React.useState(1)
    const [callAddNewOrder] = useMutation(api.mutations.order.ADD_NEW_ORDER)
    const [callRemoveCart] = useMutation(api.mutations.user.REMOVE_CARD)

    const { data, loading, refetch } = useQuery(api.queries.user.GET_CART, {
        fetchPolicy: 'no-cache',
    })
    const { user } = useUser()

    const { setTransactionForm, sendTransaction } = React.useContext(TransactionContext)

    const [formData, setFormData] = React.useState({
        fullName: '',
        phoneNumber: '',
        deliveryAddress: '',
        paymentMethod: 1,
        items: [],
    })

    const handleChangeForm = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    // const onSubmit = handleSubmit(async (value) => {
    //     console.log('🚀 ~ file: Pick.js ~ line 21 ~ onSubmit ~ value', value)
    //     let a = []
    //     return
    //     getCarts().cart.map((data) => {
    //         const data1 = data[0]
    //         a.push(parseInt(data1.id))
    //     })
    //     const res = await callAddNewOrder({
    //         variables: {
    //             address: value.address,
    //             method: parseInt(value.method),
    //             prodIdArr: a,
    //             total: parseInt(getCarts().total),
    //         },
    //         onCompleted: (data) => {
    //             if (data.addOrder.code === 200) {
    //                 toast.success('Tạo hóa đơn thành công!')
    //                 a.map((value) => {
    //                 })
    //                 navigate('/cart')
    //             } else {
    //                 toast.error('Tạo hóa đơn thất bại, vui lòng thử lại sau!')
    //             }
    //         },
    //     })
    // })

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log('🚀 ~ file: Payment.js ~ line 78 ~ onSubmit ~ formData', formData)

        try {
            setTransactionForm(parseFormData(formData))
            sendTransaction()
            removeAllCart()
        } catch (error) {
            alert('Có lỗi xảy ra, vui lòng thử lại sau!')
        }
    }

    const parseFormData = (formData) => {
        return { ...formData, items: JSON.stringify(formData.items) }
    }

    const countTotal = () => {
        let total = 0
        formData.items.forEach((item) => {
            total += item.product[0].price * (item.product[0].quantity || 1)
        })
        return formatMoney(total) + ' đ'
    }

    const handleChangePaymentMethod = (e) => {
        setMethod(e.target.value)
    }

    const removeCart = (index) => {
        setFormData((prevState) => {
            const newState = { ...prevState }
            newState.items.splice(index, 1)
            return newState
        })

        callRemoveCart({ variables: { prodId: parseInt(formData.items[index].product[0].id) } })
    }

    const removeAllCart = () => {
        formData.items.forEach((item) => {
            callRemoveCart({ variables: { prodId: parseInt(item.product[0].id) } })
        })
    }

    React.useEffect(() => {
        if (user) {
            setFormData((prevState) => ({ ...prevState, fullName: user?.fullName, phoneNumber: user?.phone }))
        }
    }, [user])

    React.useEffect(() => {
        if (data) {
            setFormData((prevState) => ({ ...prevState, items: data.getCart || [] }))
        }
    }, [data])

    return (
        <Box sx={{ width: '100%', fontSize: '2rem' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs variant="fullWidth" value={value} aria-label="basic tabs example">
                    <Tab sx={style.textTab} label="Nhập thông tin thanh toán" {...a11yProps(0)} />
                </Tabs>
            </Box>
            {user && (
                <div className={cx('pick')}>
                    <form onSubmit={onSubmit}>
                        <div className="row gap-4">
                            <div className="col">
                                <div className={cx('delivery-info')}>
                                    <div className={cx('title')}>Thông tin vận chuyển</div>

                                    <div className={cx('info-block')}>
                                        <div className={cx('info-block__item')}>
                                            <Input
                                                style={{ padding: '4px 8px' }}
                                                placeholder="Họ tên"
                                                defaultValue={user?.fullName || 'test'}
                                                onChange={(e) => handleChangeForm(e, 'fullName')}
                                            ></Input>
                                            <Input
                                                placeholder="Số điện thoại"
                                                value={user?.phone}
                                                onChange={(e) => handleChangeForm(e, 'phoneNumber')}
                                            ></Input>
                                        </div>

                                        <div className={cx('info-block__item')}>
                                            <Input
                                                onChange={(e) => handleChangeForm(e, 'deliveryAddress')}
                                                placeholder="Địa chỉ"
                                            ></Input>
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('delivery-info')}>
                                    <div className={cx('title')}>Hình thức thanh toán</div>

                                    <div className={cx('info-block')}>
                                        <Radio.Group
                                            onChange={(e) => {
                                                handleChangePaymentMethod(e)
                                            }}
                                            value={method}
                                        >
                                            <Space direction="vertical" style={{ width: '100%' }}>
                                                <div className="border rounded p-2 d-flex align-items-center">
                                                    <Radio value={1}>
                                                        <div className="d-flex flex-column">
                                                            <div>COD</div>
                                                            <div>Thanh toán khi nhận hàng</div>
                                                        </div>
                                                    </Radio>
                                                </div>
                                                <div
                                                    className="border rounded p-2 d-flex align-items-center"
                                                    style={{ height: '57px' }}
                                                >
                                                    <Radio
                                                        title="Phương thức thanh toán này hiện tại không khả dụng. Xin lỗi vì sự bất tiện này!"
                                                        disabled
                                                        value={2}
                                                    >
                                                        <div>
                                                            <div>Thanh toán Momo</div>
                                                        </div>
                                                    </Radio>
                                                </div>
                                            </Space>
                                        </Radio.Group>
                                    </div>
                                </div>
                                <div className={cx('btn')}>
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        sx={{ fontSize: '16px', color: 'inherit', borderColor: 'inherit' }}
                                    >
                                        Thanh toán
                                    </Button>
                                </div>
                            </div>
                            <div className="col">
                                <div className={cx('delivery-info')}>
                                    <div className={cx('title')}>Giỏ hàng</div>

                                    <div className="row text-secondary">
                                        <div className="col-7">Mô tả sản phẩm</div>
                                        <div className="col-3">Số lượng</div>
                                        <div className="col-2">Giá</div>
                                    </div>

                                    <hr />

                                    {formData.items.length ? (
                                        formData.items.map((cart, index) => {
                                            const item = cart.product[0]
                                            return (
                                                <div key={item.id}>
                                                    <div className="row align-items-center">
                                                        <div className="col-7">
                                                            <div className={cx('product')}>
                                                                <div className={cx('image')}>
                                                                    <Image
                                                                        src={item.thumbnail}
                                                                        ratio="ratio3x4"
                                                                        alt={item.title}
                                                                    />
                                                                </div>
                                                                <div className="d-flex flex-column gap-2">
                                                                    <span className="text-truncate">{item.title}</span>
                                                                    <div>
                                                                        <Select
                                                                            defaultValue="S"
                                                                            options={item?.sizes?.map((s) => ({
                                                                                value: s.name,
                                                                                label: s.name,
                                                                                disabled: s.soldOut,
                                                                            }))}
                                                                            onChange={(e) => {
                                                                                setFormData((prevState) => {
                                                                                    const newState = { ...prevState }
                                                                                    newState.items[index].size = e.value
                                                                                    return newState
                                                                                })
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        onClick={() => {
                                                                            removeCart(index)
                                                                        }}
                                                                        className="d-inline-block"
                                                                        role="button"
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            icon={faTrashCan}
                                                                        ></FontAwesomeIcon>{' '}
                                                                        Xóa
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-3">
                                                            <InputNumber
                                                                defaultValue={1}
                                                                min={1}
                                                                max={100}
                                                                onChange={(e) => {
                                                                    setFormData((prevState) => {
                                                                        const newState = { ...prevState }
                                                                        newState.items[index].quantity = e
                                                                        return newState
                                                                    })
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="col-2">
                                                            <span>{formatMoney(item.price)} đ</span>
                                                        </div>
                                                    </div>

                                                    <hr />
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <div>Không có sản phẩm nào trong giỏ hàng</div>
                                    )}

                                    <div className="">
                                        <div className="d-flex flex-column gap-3">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="">Tạm tính</div>
                                                <div>{countTotal()}</div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="">Giảm giá</div>
                                                <div>0 đ</div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="">Phí giao hàng</div>
                                                <div>Miễn phí</div>
                                            </div>
                                        </div>

                                        <hr />

                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>Tổng</div>
                                            <div className="fw-bold fs-3">{countTotal()}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </Box>
    )
}
