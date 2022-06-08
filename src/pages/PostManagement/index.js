import React, { Fragment } from 'react'
import classNames from 'classnames/bind'

import styles from './PostManagement.module.scss'
import { FlexWrapper, Wrapper } from '~/components/Popper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import HeaderTable from '~/components/HeaderTable'
import NoItem from '~/components/NoItem'

const cx = classNames.bind(styles)

const headerTable = [
    { column: 1, width: 5, title: 'Tiêu đề' },
    { column: 2, width: 2, title: 'Ngày đăng' },
    { column: 3, width: 3, title: 'Tác giả' },
    { column: 4, width: 1, title: '' },
    { column: 5, width: 1, title: '' },
]

//When having API, remove it
const fakePosts = [
    { id: 1, name: 'Top 5 lý do nên mua đồ ở Vivo Shop', date: '6/6/2022', author: 'Admin' },
    { id: 2, name: 'Top 3 tip phối đồ cho nam', date: '6/6/2022', author: 'Admin' },
    { id: 3, name: 'Đi học nên mặc đồ gì?', date: '6/6/2022', author: 'Admin' },
    { id: 4, name: 'Top 3 tip phối đồ đẹp', date: '6/6/2022', author: 'Admin' },
]

function PostManagement() {
    return (
        <div className={cx('wrapper')}>
            {fakePosts.length > 0 && <HeaderTable tHeader={headerTable} />}
            {fakePosts.map((fakePost) => (
                <Fragment key={fakePost.id}>
                    <Wrapper flexWrapper>
                        <FlexWrapper
                            className={cx('col-item')}
                            xxl={headerTable[0].width}
                            xl={headerTable[0].width}
                            lg={headerTable[0].width}
                        >
                            {fakePost.name}
                        </FlexWrapper>
                        <FlexWrapper
                            className={cx('col-item')}
                            xxl={headerTable[1].width}
                            xl={headerTable[1].width}
                            lg={headerTable[1].width}
                        >
                            {fakePost.date}
                        </FlexWrapper>
                        <FlexWrapper
                            className={cx('col-item')}
                            xxl={headerTable[2].width}
                            xl={headerTable[2].width}
                            lg={headerTable[2].width}
                        >
                            {fakePost.author}
                        </FlexWrapper>
                        <FlexWrapper xxl={headerTable[3].width} xl={headerTable[3].width} lg={headerTable[3].width}>
                            <div className={cx('icon-btn', 'edit-icon')}>
                                <FontAwesomeIcon icon={faEdit} />
                            </div>
                        </FlexWrapper>
                        <FlexWrapper xxl={headerTable[4].width} xl={headerTable[4].width} lg={headerTable[4].width}>
                            <div className={cx('icon-btn', 'remove-icon')}>
                                <FontAwesomeIcon icon={faTrash} />
                            </div>
                        </FlexWrapper>
                    </Wrapper>
                    <div className={cx('bottom-line')} />
                </Fragment>
            ))}
            {fakePosts.length < 1 && <NoItem content={'bài viết'} />}
            <div className={cx('add-post')}>
                <div className={cx('add-icon')}>
                    <FontAwesomeIcon icon={faPlus} />
                </div>
                <h3>Thêm bài viết</h3>
            </div>
        </div>
    )
}

export default PostManagement
