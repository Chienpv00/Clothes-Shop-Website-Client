import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import config from '~/config'

function ScrollTopTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        if (pathname.includes(config.routes.detailed))
            if (window.innerWidth > 992) window.scrollTo(0, 350)
            else window.scrollTo(0, 527)
        else window.scrollTo(0, 0)
    }, [pathname])

    return null
}

export default ScrollTopTop
