import React, { Fragment, useState } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

import styles from './ProductManagement.module.scss'
import { FlexWrapper, Wrapper } from '~/components/Popper'
import Image from '~/components/Image'
import images from '~/assets/images'
import HeaderTable from '~/components/HeaderTable'
import NoItem from '~/components/NoItem'

const cx = classNames.bind(styles)

const headerTable = [
    { column: 1, width: 1, title: '' },
    { column: 2, width: 3, title: 'Tên' },
    { column: 3, width: 2, title: 'Thể loại' },
    { column: 4, width: 2, title: 'Giá' },
    { column: 5, width: 2, title: 'Trạng thái' },
    { column: 6, width: 1, title: '' },
    { column: 7, width: 1, title: '' },
]

//When having APIs, remove it
const fakeProducts = [
    { id: 1, image: images.candytop, name: 'Candy Top 1', type: 'Áo kiểu', price: '190000 VND', status: 'Hàng mới về' },
    { id: 2, image: images.candytop, name: 'Candy Top 2', type: 'Áo kiểu', price: '190000 VND', status: 'Hàng mới về' },
    { id: 3, image: images.candytop, name: 'Candy Top 3', type: 'Áo kiểu', price: '190000 VND', status: 'Hàng mới về' },
    { id: 4, image: images.candytop, name: 'Candy Top 4', type: 'Áo kiểu', price: '190000 VND', status: 'Hàng mới về' },
    { id: 5, image: images.candytop, name: 'Candy Top 5', type: 'Áo kiểu', price: '190000 VND', status: 'Hàng mới về' },
    { id: 6, image: images.candytop, name: 'Candy Top 6', type: 'Áo kiểu', price: '190000 VND', status: 'Hàng mới về' },
    { id: 7, image: images.candytop, name: 'Candy Top 7', type: 'Áo kiểu', price: '190000 VND', status: 'Hàng mới về' },
]

function ProductManagement() {
    //When having APIs, remove it
    const [products, setProducts] = useState([...fakeProducts])

    const handleRemoveProduct = (productId) => {
        const cloneArr = products.filter((product) => product.id !== productId)
        setProducts([...cloneArr])
    }

    return (
        <div className={cx('wrapper')}>
            {products.length > 0 && <HeaderTable tHeader={headerTable} />}
            {products.map((product) => (
                <Fragment key={product.id}>
                    <Wrapper flexWrapper>
                        <FlexWrapper xxl={headerTable[0].width} xl={headerTable[0].width} lg={headerTable[0].width}>
                            <div className={cx('image-container')}>
                                <Image src={product.image} alt="candy top" ratio="ratio3x4" />
                            </div>
                        </FlexWrapper>
                        <FlexWrapper
                            className={cx('col-item')}
                            xxl={headerTable[1].width}
                            xl={headerTable[1].width}
                            lg={headerTable[1].width}
                        >
                            {product.name}
                        </FlexWrapper>
                        <FlexWrapper
                            className={cx('col-item')}
                            xxl={headerTable[2].width}
                            xl={headerTable[2].width}
                            lg={headerTable[2].width}
                        >
                            {product.type}
                        </FlexWrapper>
                        <FlexWrapper
                            className={cx('col-item')}
                            xxl={headerTable[3].width}
                            xl={headerTable[3].width}
                            lg={headerTable[3].width}
                        >
                            {product.price}
                        </FlexWrapper>
                        <FlexWrapper
                            className={cx('col-item')}
                            xxl={headerTable[4].width}
                            xl={headerTable[4].width}
                            lg={headerTable[4].width}
                        >
                            {product.status}
                        </FlexWrapper>
                        <FlexWrapper xxl={headerTable[5].width} xl={headerTable[5].width} lg={headerTable[5].width}>
                            <div className={cx('icon-btn', 'edit-icon')}>
                                <FontAwesomeIcon icon={faEdit} />
                            </div>
                        </FlexWrapper>
                        <FlexWrapper xxl={headerTable[6].width} xl={headerTable[6].width} lg={headerTable[6].width}>
                            <div className={cx('icon-btn', 'remove-icon')}>
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleRemoveProduct(product.id)} />
                            </div>
                        </FlexWrapper>
                    </Wrapper>
                    <div className={cx('bottom-line')} />
                </Fragment>
            ))}
            {products.length < 1 && <NoItem content={'sản phẩm'} />}
            <div className={cx('add-product')}>
                <div className={cx('add-icon')}>
                    <FontAwesomeIcon icon={faPlus} />
                </div>
                <h3>Thêm sản phẩm</h3>
            </div>
        </div>
    )
}

export default ProductManagement
