import React from 'react'
import classNames from 'classnames/bind'
import { useForm } from 'react-hook-form'
import styles from './Payment.module.scss'
import Input from '~/components/Input'
import { Button, MenuItem, Select } from '@mui/material'
const cx = classNames.bind(styles)
const Pick = ({sendAdrr}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors
    } = useForm()

    const [age, setAge] = React.useState(0)
    const handleChange = (event) => {
        setAge(event.target.value)
    }

    const onSubmit = handleSubmit((value)=>{
    console.log("🚀 ~ file: Pick.js ~ line 21 ~ onSubmit ~ value", value)
      sendAdrr(value);
      
    })
    return (
        <>
        </>
    )
}

export default Pick
