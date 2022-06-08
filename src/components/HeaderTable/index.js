import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './HeaderTable.module.scss'
import { FlexWrapper, Wrapper } from '~/components/Popper'

const cx = classNames.bind(styles)

function HeaderTable({ tHeader }) {
    return (
        <div className={cx('wrapper')}>
            <Wrapper flexWrapper>
                {tHeader.map((item) => (
                    <FlexWrapper key={item.column} xxl={item.width} xl={item.width} lg={item.width} md={item.width}>
                        <strong>{item.title}</strong>
                    </FlexWrapper>
                ))}
            </Wrapper>
            <div className={cx('bottom-line')} />
        </div>
    )
}

HeaderTable.propTypes = {
    tHeader: PropTypes.array,
}

export default HeaderTable
