import * as React from 'react'
import classNames from 'classnames/bind'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import TabPanel from './TabPanel'
import { useForm } from 'react-hook-form'

import Pick from './Pick'
import { getCarts } from '~/utils/manageCart'
import { Button, MenuItem, Select } from '@mui/material'
import styles from './Payment.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
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
import { Input, InputNumber, Radio, Space } from 'antd'

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
    const navigate = useNavigate()

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const sendAdrr = (value) => {
        setValue(1)
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
    } = useForm()

    const [age, setAge] = React.useState(0)
    const handleChange1 = (event) => {
        setAge(event.target.value)
    }

    const onSubmit = handleSubmit(async (value) => {
        console.log('🚀 ~ file: Pick.js ~ line 21 ~ onSubmit ~ value', value)
        sendAdrr(value)
        let a = []
        getCarts().cart.map((data) => {
            const data1 = data[0]
            a.push(parseInt(data1.id))
        })
        const res = await callAddNewOrder({
            variables: {
                address: value.address,
                method: parseInt(value.method),
                prodIdArr: a,
                total: parseInt(getCarts().total),
            },
            onCompleted: (data) => {
                if (data.addOrder.code === 200) {
                    toast.success('Tạo hóa đơn thành công!')
                    a.map((value) => {
                        callRemoveCart({ variables: { prodId: value } })
                    })
                    navigate('/cart')
                } else {
                    toast.error('Tạo hóa đơn thất bại, vui lòng thử lại sau!')
                }
            },
        })
    })

    const onChange = (e) => {
        setMethod(e.target.value)
    }
    return (
        <Box sx={{ width: '100%', fontSize: '2rem' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab sx={style.textTab} label="Nhập thông tin thanh toán" {...a11yProps(0)} />
                </Tabs>
            </Box>
            <div className={cx('pick')}>
                <form onSubmit={onSubmit}>
                    <div className="row gap-4">
                        <div className="col">
                            <div className={cx('delivery-info')}>
                                <div className={cx('title')}>Thông tin vận chuyển</div>

                                <div className={cx('info-block')}>
                                    <div className={cx('info-block__item')}>
                                        <Input style={{ padding: '4px 8px' }} placeholder="Họ tên"></Input>
                                        <Input placeholder="Số điện thoại"></Input>
                                    </div>

                                    <div className={cx('info-block__item')}>
                                        <Input
                                            {...register('address', {
                                                required: { value: true, message: 'Trường này không được để trống' },
                                            })}
                                            placeholder="Địa chỉ"
                                        ></Input>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('err')}>{errors?.address?.message}</div>

                            <div className={cx('delivery-info')}>
                                <div className={cx('title')}>Hình thức thanh toán</div>

                                <div className={cx('info-block')}>
                                    <Radio.Group onChange={onChange} value={method}>
                                        <Space direction="vertical" style={{'width': '100%'}}>
                                            <div className="border rounded p-2 d-flex align-items-center">
                                                <Radio value={1}>
                                                    <div className="d-flex flex-column">
                                                        <div>COD</div>
                                                        <div>Thanh toán khi nhận hàng</div>
                                                    </div>
                                                </Radio>
                                            </div>
                                           <div className='border rounded p-2 d-flex align-items-center' style={{'height': '57px'}}>
                                           <Radio value={2}>
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

                                {getCarts().cart.map((value) => {
                                    let item = value[0]
                                    return (
                                        <div>
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
                                                        <span>{item.title}</span>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <InputNumber
                                                        addonBefore="-"
                                                        addonAfter="+"
                                                        defaultValue={1}
                                                        min={1}
                                                        max={100}
                                                    />
                                                </div>
                                                <div className="col-2">
                                                    <span>{formatMoney(item.price)} đ</span>
                                                </div>
                                            </div>

                                            <hr />
                                        </div>
                                    )
                                })}

                                <div className="">
                                    <div className="d-flex flex-column gap-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="">Tạm tính</div>
                                            <div></div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="">Giảm giá</div>
                                            <div>0đ</div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="">Phí giao hàng</div>
                                            <div>Miễn phí</div>
                                        </div>
                                    </div>

                                    <hr />

                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>Tổng</div>
                                        <div className="fw-bold fs-3">100.000đ</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Box>
    )
}
