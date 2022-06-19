import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './TipLayout.module.scss'
import Header from './Header'
import SideContent from './SideContent'
import ToTop from '~/components/ToTop'
import { FlexWrapper, Wrapper } from '~/components/Popper'

const cx = classNames.bind(styles)

function TipLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <Wrapper flexWrapper>
                <FlexWrapper className={cx('content')} xxl={11} xl={9} lg={9} md={8} sm={6}>
                    {children}
                </FlexWrapper>
                {/* <FlexWrapper className={cx('side-content')} xxl={3} xl={3} lg={3} md={4} sm={6}>
                    <SideContent />
                </FlexWrapper> */}
            </Wrapper>
            <ToTop />
        </div>
    )
}

TipLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default TipLayout