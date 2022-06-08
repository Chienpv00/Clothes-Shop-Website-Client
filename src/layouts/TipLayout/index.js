import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './TipLayout.module.scss'
import images from '~/assets/images'
import HeaderImage from '~/components/HeaderImage'
import ToTop from '~/components/ToTop'
import SideContent from './SideContent'
import { FlexWrapper, Wrapper } from '~/components/Popper'

const cx = classNames.bind(styles)

function TipLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <HeaderImage className={cx('header-image')} image={images.tipBanner} alt={'Tip Banner'} />
            <Wrapper flexWrapper>
                <FlexWrapper className={cx('content')} xxl={9} xl={9} lg={9} md={8} sm={6}>
                    {children}
                </FlexWrapper>
                <FlexWrapper xxl={3} xl={3} lg={3} md={4} sm={6}>
                    <SideContent />
                </FlexWrapper>
            </Wrapper>
            <ToTop />
        </div>
    )
}

TipLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default TipLayout
