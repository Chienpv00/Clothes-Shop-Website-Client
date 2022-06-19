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
            variables: { address: value.address, method: parseInt(value.method), prodIdArr: a, total: parseInt(getCarts().total) },
            onCompleted: (data) => {
                if (data.addOrder.code === 200) {
                    toast.success('Tạo hóa đơn thành công!')
                    a.map((value) => {
                        callRemoveCart({variables: {prodId: value}})
                    })
                    navigate('/cart')
                } else {
                    toast.error('Tạo hóa đơn thất bại, vui lòng thử lại sau!')
                }
            },
        })
    })
    return (
        <Box sx={{ width: '100%', fontSize: '2rem' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab sx={style.textTab} label="Nhập thông tin thanh toán" {...a11yProps(0)} />
                </Tabs>
            </Box>
            <div className={cx('pick')}>
                <form onSubmit={onSubmit}>
                    <div className={cx('form-group')}>
                        <div className={cx('form-label')}>Phương thức thanh toán</div>
                        <div className={cx('form-input')}>
                            <Select
                                {...register('method')}
                                onChange={handleChange1}
                                autoWidth
                                label="Phương thức thanh toán"
                                value={age}
                                sx={{ fontSize: '16px', color: 'inherit', marginBottom: '15px' }}
                            >
                                <MenuItem sx={{ fontSize: '16px' }} value={0}>
                                    Thanh toán khi nhận hàng
                                </MenuItem>
                                <MenuItem sx={{ fontSize: '16px' }} value={1}>
                                    Thẻ ghi nợ nội địa
                                </MenuItem>
                                <MenuItem sx={{ fontSize: '16px' }} value={2}>
                                    Ví điện tử Momo
                                </MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <div className={cx('form-label')}>Địa chỉ thanh toán:</div>
                        <div className={cx('form-input')}>
                            <textarea
                                rows={'2'}
                                type="text-area"
                                className={cx('textarea')}
                                {...register('address', {
                                    required: { value: true, message: 'Truong nay la bat buoc' },
                                })}
                                onChange={() => {
                                    clearErrors()
                                }}
                            />
                        </div>
                    </div>
                    <div className={cx('err')}>{errors?.address?.message}</div>
                    <div className={cx('form-group')}>
                        <div className={cx('form-input')}>
                            {
                                <div className={cx('container')}>
                                    <Wrapper className={cx('row')} flexWrapper>
                                        <FlexWrapper className={cx('item')} xxl={8} xl={8} lg={8}>
                                            <span>Sản Phẩm</span>
                                        </FlexWrapper>

                                        <FlexWrapper className={cx('item', 'quantity')} xxl={4} xl={4} lg={4}>
                                            <span>Số Lượng</span>
                                        </FlexWrapper>
                                    </Wrapper>
                                    {getCarts().cart.map((value) => {
                                        let item = value[0]
                                        return (
                                            <Wrapper key={item.id} flexWrapper className={cx('row')}>
                                                <FlexWrapper className={cx('item')} xxl={8} xl={8} lg={8}>
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
                                                </FlexWrapper>

                                                <FlexWrapper className={cx('item', 'price')} xxl={4} xl={4} lg={4}>
                                                    <span>{formatMoney(item.price)} VND</span>
                                                </FlexWrapper>
                                            </Wrapper>
                                        )
                                    })}
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <Wrapper flexWrapper>
                            <FlexWrapper xxl={7} xl={7} lg={7}>
                                <span />
                            </FlexWrapper>
                            <FlexWrapper className={cx('footer', 'quantity')} xxl={2} xl={2} lg={2}>
                                <h3>Tổng cộng: </h3>
                            </FlexWrapper>
                            <FlexWrapper className={cx('footer', 'price')} xxl={3} xl={3} lg={3}>
                                <span style={{ fontSize: '2rem' }}>{formatMoney(getCarts().total)} VND</span>
                            </FlexWrapper>
                        </Wrapper>
                    </div>
                    <div className={cx('btn')}>
                        <Button
                            type="submit"
                            variant="outlined"
                            sx={{ fontSize: '16px', color: 'inherit', borderColor: 'inherit' }}
                        >
                            Xác nhận
                        </Button>
                    </div>
                </form>
            </div>
        </Box>
    )
}
