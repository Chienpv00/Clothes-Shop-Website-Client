/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import styles from './Search.module.scss'
import { FlexWrapper, Wrapper as PopperWrapper, Wrapper } from '~/components/Popper'
import Image from '~/components/Image'
import images from '~/assets/images'
import { useDebounce } from '~/hooks'

const cx = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(true)

    const debounce = useDebounce(searchValue, 500)

    const inputRef = useRef()

    useEffect(() => {
        if (!searchValue.trim()) {
            return
        }

        //----Reaplce This by Call API-----//
        /**/ setSearchResult([1, 2, 3]) /**/
        //-------------------------------//
    }, [debounce])

    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus()
    }

    const handleHideResult = () => {
        setShowResult(false)
    }

    return (
        <div className={cx('wrapper')}>
            <Tippy
                visible={showResult && searchResult.length > 0}
                interactive
                placement="bottom"
                render={(attrs) => (
                    <div className={cx('search-result-wrapper')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <Wrapper flexWrapper className={cx('search-item')}>
                                <FlexWrapper xxl={2} xl={2} lg={2} md={2} xs={2}>
                                    <Image src={images.candytop} ratio={'ratio1x1'} />
                                </FlexWrapper>
                                <FlexWrapper className={cx('content')} xxl={10} xl={10} lg={10} md={10} xs={10}>
                                    <h4>Candy top</h4>
                                </FlexWrapper>
                            </Wrapper>
                            <Wrapper flexWrapper className={cx('search-item')}>
                                <FlexWrapper xxl={2} xl={2} lg={2} md={2} xs={2}>
                                    <Image src={images.candytop} ratio={'ratio1x1'} />
                                </FlexWrapper>
                                <FlexWrapper className={cx('content')} xxl={10} xl={10} lg={10} md={10} xs={10}>
                                    <h4>Candy top</h4>
                                </FlexWrapper>
                            </Wrapper>
                            <Wrapper flexWrapper className={cx('search-item')}>
                                <FlexWrapper xxl={2} xl={2} lg={2} md={2} xs={2}>
                                    <Image src={images.candytop} ratio={'ratio1x1'} />
                                </FlexWrapper>
                                <FlexWrapper className={cx('content')} xxl={10} xl={10} lg={10} md={10} xs={10}>
                                    <h4>Candy top</h4>
                                </FlexWrapper>
                            </Wrapper>
                            <Wrapper flexWrapper className={cx('search-item')}>
                                <FlexWrapper xxl={2} xl={2} lg={2} md={2} xs={2}>
                                    <Image src={images.candytop} ratio={'ratio1x1'} />
                                </FlexWrapper>
                                <FlexWrapper className={cx('content')} xxl={10} xl={10} lg={10} md={10} xs={10}>
                                    <h4>Candy top</h4>
                                </FlexWrapper>
                            </Wrapper>
                            <Wrapper flexWrapper className={cx('search-item')}>
                                <FlexWrapper xxl={2} xl={2} lg={2} md={2} xs={2}>
                                    <Image src={images.candytop} ratio={'ratio1x1'} />
                                </FlexWrapper>
                                <FlexWrapper className={cx('content')} xxl={10} xl={10} lg={10} md={10} xs={10}>
                                    <h4>Candy top</h4>
                                </FlexWrapper>
                            </Wrapper>
                            <Wrapper flexWrapper className={cx('search-item')}>
                                <FlexWrapper xxl={2} xl={2} lg={2} md={2} xs={2}>
                                    <Image src={images.candytop} ratio={'ratio1x1'} />
                                </FlexWrapper>
                                <FlexWrapper className={cx('content')} xxl={10} xl={10} lg={10} md={10} xs={10}>
                                    <h4>Candy top</h4>
                                </FlexWrapper>
                            </Wrapper>
                            <Wrapper flexWrapper className={cx('search-item')}>
                                <FlexWrapper xxl={2} xl={2} lg={2} md={2} xs={2}>
                                    <Image src={images.candytop} ratio={'ratio1x1'} />
                                </FlexWrapper>
                                <FlexWrapper className={cx('content')} xxl={10} xl={10} lg={10} md={10} xs={10}>
                                    <h4>Candy top</h4>
                                </FlexWrapper>
                            </Wrapper>
                            <Wrapper flexWrapper className={cx('search-item')}>
                                <FlexWrapper xxl={2} xl={2} lg={2} md={2} xs={2}>
                                    <Image src={images.candytop} ratio={'ratio1x1'} />
                                </FlexWrapper>
                                <FlexWrapper className={cx('content')} xxl={10} xl={10} lg={10} md={10} xs={10}>
                                    <h4>Candy top</h4>
                                </FlexWrapper>
                            </Wrapper>
                            <Wrapper flexWrapper className={cx('search-item')}>
                                <FlexWrapper xxl={2} xl={2} lg={2} md={2} xs={2}>
                                    <Image src={images.candytop} ratio={'ratio1x1'} />
                                </FlexWrapper>
                                <FlexWrapper className={cx('content')} xxl={10} xl={10} lg={10} md={10} xs={10}>
                                    <h4>Candy top</h4>
                                </FlexWrapper>
                            </Wrapper>
                            <Wrapper flexWrapper className={cx('search-item')}>
                                <FlexWrapper xxl={2} xl={2} lg={2} md={2} xs={2}>
                                    <Image src={images.candytop} ratio={'ratio1x1'} />
                                </FlexWrapper>
                                <FlexWrapper className={cx('content')} xxl={10} xl={10} lg={10} md={10} xs={10}>
                                    <h4>Candy top</h4>
                                </FlexWrapper>
                            </Wrapper>
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        type="text"
                        placeholder="Tìm kiếm sản phẩm"
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue ? (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    ) : (
                        <button>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    )}
                </div>
            </Tippy>
        </div>
    )
}

export default Search
