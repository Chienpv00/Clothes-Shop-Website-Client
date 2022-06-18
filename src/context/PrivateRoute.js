/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'

import config from '~/config'

function PrivateRoute({ children, role }) {
    const location = useLocation()

    return role === 'ADMIN' ? children : <Navigate to={config.routes.login} replace state={{ from: location }} />
}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default PrivateRoute
