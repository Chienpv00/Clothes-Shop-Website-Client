import React, { Fragment } from 'react'
import classNames from 'classnames/bind'
import { Helmet } from 'react-helmet-async'

import styles from './About.module.scss'
import Image from '~/components/Image'
import images from '~/assets/images'
import { Wrapper } from '~/components/Popper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaughBeam, faLifeRing, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Card from '~/components/Card'
import HeaderImage from '~/components/HeaderImage'

const cx = classNames.bind(styles)

const supports = [
    {
        icon: <FontAwesomeIcon icon={faPaperPlane} />,
        title: 'fast support',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste, debitis!',
    },
    {
        icon: <FontAwesomeIcon icon={faLaughBeam} />,
        title: 'happy cusyomers',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste, debitis!',
    },
    {
        icon: <FontAwesomeIcon icon={faLifeRing} />,
        title: '24/7 support',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste, debitis!',
    },
]

const members = [
    { id: 1, name: 'đào đại dương' },
    { id: 2, name: 'phạm viết chiến' },
]

function About() {
    return (
        <Fragment>
            <Helmet>
                <title>Về Chúng Tôi</title>
            </Helmet>
            <div className={cx('wrapper')}>
                <HeaderImage image={images.aboutHeader} alt={'About Us'} />
                <div className={cx('our-story')}>
                    <div className={cx('our-story-left')}>
                        <Image className={cx('image')} src={images.aboutAside} alt="Our Story" ratio="ratio3x4" />
                    </div>
                    <div className={cx('our-story-right')}>
                        <h1>Our Story</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat consequat enim,
                            non auctor massa ultrices non. Morbi sed odio massa. Quisque at vehicula tellus, sed
                            tincidunt augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
                            ridiculus mus. Maecenas varius egestas diam, eu sodales metus scelerisque congue.
                            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
                            egestas. Maecenas gravida justo eu arcu egestas convallis.
                        </p>
                        <p>
                            Donec gravida lorem elit, quis condimentum ex semper sit amet. Fusce eget ligula magna.
                            Aliquam aliquam imperdiet sodales. Ut fringilla turpis in vehicula vehicula. Pellentesque
                            congue ac orci ut gravida. Aliquam erat volutpat. Donec iaculis lectus a arcu facilisis, eu
                            sodales lectus sagittis. Etiam pellentesque, magna vel dictum rutrum, neque justo eleifend
                            elit, vel tincidunt erat arcu ut sem. Sed rutrum, turpis ut commodo efficitur, quam velit
                            convallis ipsum, et maximus enim ligula ac ligula.
                        </p>
                    </div>
                </div>
                <Wrapper className={cx('support-container')} flexWrapper>
                    {supports.map((support, index) => (
                        <div key={index} className={cx('support-item')}>
                            <div className={cx('icon')}>{support.icon}</div>
                            <Card
                                title={support.title}
                                textStyle={'capitalize'}
                                textAlign={'text-center'}
                                className={cx('support-content')}
                            >
                                <p>{support.content}</p>
                            </Card>
                        </div>
                    ))}
                </Wrapper>
                <h1 className={cx('our-team-title')}>Our Team</h1>
                <Wrapper className={cx('our-team-container')} flexWrapper>
                    {members.map((member) => (
                        <div key={member.id} className={cx('member')}>
                            <Card
                                image={images.candytop}
                                ratio={'ratio1x1'}
                                title={member.name}
                                textStyle={'capitalize'}
                                textAlign={'text-center'}
                            >
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste, debitis! Lorem ipsum
                                    dolor sit amet, consectetur adipisicing elit. Iste, debitis!
                                </p>
                            </Card>
                        </div>
                    ))}
                </Wrapper>
            </div>
        </Fragment>
    )
}

export default About
