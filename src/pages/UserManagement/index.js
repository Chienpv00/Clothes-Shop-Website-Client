import React, { Fragment, useState } from 'react'
import classNames from 'classnames/bind'

import styles from './UserManagement.module.scss'
import { FlexWrapper, Wrapper } from '~/components/Popper'
import Button from '~/components/Button'
import NoItem from '~/components/NoItem'
import HeaderTable from '~/components/HeaderTable'

const cx = classNames.bind(styles)

const headerTable = [
    { column: 1, width: 4, title: 'Tên người dùng' },
    { column: 2, width: 5, title: 'Thông tin người dùng' },
    { column: 3, width: 2, title: 'Quyền' },
    { column: 4, width: 1, title: '' },
]
//When having API, remove it
const fakeUsers = [
    { id: 1, name: 'Đào Đại Dương', role: 'Admin', email: 'daodaiduong2000@gmail.com', phone: '084 634 6869' },
    { id: 2, name: 'Phạm Viết Chiến', role: 'User', email: 'phamvietchien2000@gmail.com', phone: '012 345 6789' },
    { id: 3, name: 'Phạm Minh Nhi', role: 'User', email: 'daodaiduong2000@gmail.com', phone: '098 765 4321' },
]

function UserManagenment() {
    // When haing API, remove it
    const [listUser, setListUser] = useState([...fakeUsers])

    const handleRemoveUser = (userId) => {
        let currentUsers = listUser.filter((user) => user.id !== userId)
        setListUser([...currentUsers])
    }

    return (
        <div className={cx('wrapper')}>
            {listUser.length > 0 && <HeaderTable tHeader={headerTable} />}
            {listUser.map((user) => (
                <Fragment key={user.id}>
                    <Wrapper flexWrapper>
                        <FlexWrapper
                            className={cx('user-col-info')}
                            xxl={headerTable[0].width}
                            xl={headerTable[0].width}
                            lg={headerTable[0].width}
                            md={headerTable[0].width}
                        >
                            {user.name}
                        </FlexWrapper>
                        <FlexWrapper
                            className={cx('user-col-info')}
                            xxl={headerTable[1].width}
                            xl={headerTable[1].width}
                            lg={headerTable[1].width}
                            md={headerTable[1].width}
                        >
                            <div>{user.phone}</div>
                            <div>{user.email}</div>
                        </FlexWrapper>
                        <FlexWrapper
                            className={cx('user-col-info')}
                            xxl={headerTable[2].width}
                            xl={headerTable[2].width}
                            lg={headerTable[2].width}
                            md={headerTable[2].width}
                        >
                            {user.role}
                        </FlexWrapper>
                        <FlexWrapper
                            className={cx('user-col-info')}
                            xxl={headerTable[3].width}
                            xl={headerTable[3].width}
                            lg={headerTable[3].width}
                            md={headerTable[3].width}
                        >
                            <Button primary className={cx('remove-btn')} onClick={() => handleRemoveUser(user.id)}>
                                Xóa
                            </Button>
                        </FlexWrapper>
                    </Wrapper>
                    <div className={cx('bottom-line')} />
                </Fragment>
            ))}
            {!listUser.length && <NoItem content={'người dùng'} />}
        </div>
    )
}

export default UserManagenment
