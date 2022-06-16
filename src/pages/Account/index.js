import React, { Fragment, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import styles from './Account.module.scss'
import Input from '~/components/Input'
import Button from '~/components/Button'
import config from '~/config'
import useAuth from '~/hooks/useAuth'
import { LOGIN } from '~/config/mutations/auth'
import { saveTokens } from '~/utils/manageTokens'

const cx = classNames.bind(styles)
function Account() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const [nameErr, setNameErr] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const [confirmPasswordErr, setConfirmPasswordErr] = useState('')
    const [loginStatus, setLoginStatus] = useState(false)

    // call api
    const [callLogin, {data}] = useMutation(LOGIN)    

    const location = useLocation()
    const navigate = useNavigate()
    const { login, register } = useAuth()
    const err = 'Vui lòng không bỏ trống!'

    const handleFocus = (inp) => {
        switch (inp) {
            case 'name':
                setNameErr('')
                setLoginStatus(false)
                break
            case 'email':
                setEmailErr('')
                setLoginStatus(false)
                break
            case 'password':
                setPasswordErr('')
                setLoginStatus(false)
                break
            case 'confirm':
                setConfirmPasswordErr('')
                break
            default:
                break
        }
    }

    const handleBlur = (inp) => {
        switch (inp) {
            case 'name':
                name ? setNameErr('') : setNameErr(err)
                break
            case 'email':
                email ? setEmailErr('') : setEmailErr(err)
                break
            case 'password':
                password ? setPasswordErr('') : setPasswordErr(err)
                break
            case 'confirm':
                confirmPassword ? setConfirmPasswordErr('') : setConfirmPasswordErr(err)
                break
            default:
                break
        }
    }

    const handleResetValue = () => {
        setName('')
        setPassword('')
        setEmail('')
        setConfirmPassword('')
        setNameErr('')
        setPasswordErr('')
        setEmailErr('')
        setConfirmPasswordErr('')
    }

    // Login or Sign up account
    const handleSubmit = async () => {
        
        if (location.pathname === config.routes.login) {
            
            if (email && password) {
                console.log("🚀 ~ file: index.js ~ line 87 ~ handleSubmit ~ password", password)
                console.log("🚀 ~ file: index.js ~ line 87 ~ handleSubmit ~ email", email)
                setLoading(true)
                const {data} = await callLogin({variables: {email: email, password: password}})
                console.log("🚀 ~ file: index.js ~ line 97 ~ handleSubmit ~ data", data)
                if (data && data.login){
                    handleResetValue()
                    saveTokens(data.login)
                    navigate('/')
                } else{
                    setLoginStatus(true)
                }
                setLoading(false)
            }
        } else if (location.pathname === config.routes.signup) {
            if (name && email && password && confirmPassword) {
                setLoading(true)
                register(email, password, name)
                    .then((res) => {
                        setLoading(false)
                        if (res) {
                            handleResetValue()
                            navigate('/login')
                        }
                    })
                    .catch(() => {
                        setLoading(false)
                    })
            }
        }
    }
    return (
        <Fragment>
            <Helmet>
                <title>{location.pathname === config.routes.login ? 'Đăng Nhập' : 'Đăng Ký'}</title>
            </Helmet>
            <div className={cx('wrapper')}>
                <div className={location.pathname === config.routes.login ? cx('login-container') : cx('container')}>
                    <div className={cx('box')}>
                        <h1>{location.pathname === config.routes.login ? 'Đăng nhập' : 'Đăng ký'}</h1>
                        <form onSubmit={(e) => e.preventDefault} className={cx('account-form')}>
                            {location.pathname === config.routes.signup && (
                                <div className={cx('form-group')}>
                                    <Input
                                        value={name}
                                        className={cx('account-input')}
                                        placeholder="Tên"
                                        size="xl-size"
                                        primary
                                        onFocus={() => handleFocus('name')}
                                        onBlur={() => handleBlur('name')}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    {nameErr && <span>{nameErr}</span>}
                                </div>
                            )}
                            <div className={cx('form-group')}>
                                <Input
                                    value={email}
                                    className={cx('account-input')}
                                    placeholder="Email"
                                    type="email"
                                    size="xl-size"
                                    primary
                                    onFocus={() => handleFocus('email')}
                                    onBlur={() => handleBlur('email')}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {emailErr && <span>{emailErr}</span>}
                            </div>
                            <div className={cx('form-group')}>
                                <Input
                                    value={password}
                                    className={cx('account-input')}
                                    type="password"
                                    placeholder="Mật khẩu"
                                    size="xl-size"
                                    primary
                                    onFocus={() => handleFocus('password')}
                                    onBlur={() => handleBlur('password')}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {passwordErr && <span>{passwordErr}</span>}
                            </div>
                            {location.pathname === config.routes.signup && (
                                <div className={cx('form-group')}>
                                    <Input
                                        value={confirmPassword}
                                        className={cx('account-input')}
                                        type="password"
                                        placeholder="Xác nhận mật khẩu"
                                        size="xl-size"
                                        primary
                                        onFocus={() => handleFocus('confirm')}
                                        onBlur={() => handleBlur('confirm')}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    {confirmPasswordErr && <span>{confirmPasswordErr}</span>}
                                </div>
                            )}
                        </form>
                        <Button primary className={cx('account-btn')} disabled={loading} onClick={handleSubmit}>
                            {location.pathname === config.routes.login ? 'Đăng nhập' : 'Đăng ký'}
                        </Button>
                        {loginStatus && <div style={{color: 'red', marginTop: '5px'}}>Tài khoản và mật khẩu không đúng, Vui lòng kiểm tra và đăng nhập lại!</div>}
                        <div className={cx('other-login')}>
                            <span className={cx('title-or')}>OR</span>
                            <Button
                                primary
                                className={cx('account-btn', 'facebook')}
                                leftIcon={<FontAwesomeIcon icon={faFacebook} />}
                            >
                                Tiếp tục với Facebook
                            </Button>
                            <Button
                                primary
                                className={cx('account-btn', 'google')}
                                leftIcon={<FontAwesomeIcon icon={faGoogle} />}
                            >
                                Tiếp tục với Google
                            </Button>
                        </div>
                        {location.pathname === config.routes.login && (
                            <Button text className={cx('account-btn', 'account-txt-btn')}>
                                Quên mật khẩu?
                            </Button>
                        )}
                        <Button
                            onClick={handleResetValue}
                            to={location.pathname === config.routes.login ? config.routes.signup : config.routes.login}
                            className={cx('account-btn', 'account-txt-btn')}
                        >
                            {location.pathname === config.routes.login
                                ? 'Bạn chưa có tài khoản? Đăng ký ngay!'
                                : 'Bạn đã có tài khoản? Đăng nhập ngay!'}
                        </Button>
                        <Button to={config.routes.home} className={cx('account-btn', 'account-txt-btn')}>
                            Về trang chủ
                        </Button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Account
