import React, { Fragment, useState } from 'react'
import classNames from 'classnames/bind'

import styles from './UserManagement.module.scss'
import { FlexWrapper, Wrapper } from '~/components/Popper'
import NoItem from '~/components/NoItem'
import HeaderTable from '~/components/HeaderTable'
import api from '~/config/api'
import { useQuery } from '@apollo/client'
import LoadingSpinner from '~/components/Loading'
import { Button, Dialog } from '@mui/material'

const cx = classNames.bind(styles)
const headerTable = [
    { column: 0, width: 3, title: 'Id người dùng' },
    { column: 1, width: 3, title: 'Tên người dùng' },
    { column: 2, width: 3, title: 'Thông tin người dùng' },
    { column: 3, width: 2, title: 'Quyền' },
    { column: 4, width: 1, title: '' },
]
//When having API, remove it
const fakeUsers = [
    { id: 1, name: 'Đào Đại Dương', role: 'Admin', email: 'daodaiduong2000@gmail.com', phone: '084 634 6869' },
    { id: 2, name: 'Phạm Viết Chiến', role: 'User', email: 'phamvietchien2000@gmail.com', phone: '012 345 6789' },
]

function UserManagenment() {
    // When haing API, remove it
    const [listUser, setListUser] = useState([...fakeUsers])

    const { data, loading } = useQuery(api.queries.user.GET_ALL_USERS)
    const handleRemoveUser = (userId) => {
        let currentUsers = listUser.filter((user) => user.id !== userId)
        setListUser([...currentUsers])
    }

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <div className={cx('wrapper')}>
            {data.getAllUsers.length > 0 && <HeaderTable tHeader={headerTable} />}
            {data.getAllUsers.map((user) => (
                <Fragment key={user.id}>
                    <Dialog>
                        
                    </Dialog>
                    <Wrapper flexWrapper>
                        <FlexWrapper className={cx('user-col-info')} xxl={3} xl={3} lg={3} md={3}>
                            {user.id}
                        </FlexWrapper>
                        <FlexWrapper
                            className={cx('user-col-info')}
                            xxl={headerTable[1].width}
                            xl={headerTable[1].width}
                            lg={headerTable[1].width}
                            md={headerTable[1].width}
                        >
                            {user.fullName}
                        </FlexWrapper>
                        <FlexWrapper
                            className={cx('user-col-info')}
                            xxl={headerTable[2].width}
                            xl={headerTable[2].width}
                            lg={headerTable[2].width}
                            md={headerTable[2].width}
                        >
                            <div>{user.phone || 'Chưa có sđt'}</div>
                            <div>{user.email}</div>
                        </FlexWrapper>
                        <FlexWrapper
                            className={cx('user-col-info')}
                            xxl={headerTable[3].width}
                            xl={headerTable[3].width}
                            lg={headerTable[3].width}
                            md={headerTable[3].width}
                        >
                            {user.role}
                        </FlexWrapper>
                        <FlexWrapper
                            className={cx('user-col-info')}
                            xxl={headerTable[4].width}
                            xl={headerTable[4].width}
                            lg={headerTable[4].width}
                            md={headerTable[4].width}
                        >
                            <Button sx={{fontSize: '12px', marginBottom: '5px'}} variant="contained" onClick={() => handleRemoveUser(user.id)}>
                                Sửa
                            </Button>
                            <Button sx={{fontSize: '12px'}} variant="contained" color="error" onClick={() => handleRemoveUser(user.id)}>
                                Xóa
                            </Button>
                        </FlexWrapper>
                    </Wrapper>
                    <div className={cx('bottom-line')} />
                </Fragment>
            ))}
            {!data?.getAllUsers.length && <NoItem content={'người dùng'} />}
        </div>
    )
}

export default UserManagenment
