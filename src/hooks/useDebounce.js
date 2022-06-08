/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => setDebounceValue(value), delay)

        return () => clearTimeout(handler)
    }, [value])

    return debounceValue
}

useDebounce.proTypes = {
    value: PropTypes.any,
    deday: PropTypes.number,
}

export default useDebounce
