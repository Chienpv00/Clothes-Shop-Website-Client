/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'

import config from '~/config'
import useAuth from '~/hooks/useAuth'
import { useUser } from '~/utils/utils'

function ProtectedRoute({ children, role }) {
    console.log("🚀 ~ file: ProtectedRoute.js ~ line 11 ~ ProtectedRoute ~ role", role)
    const location = useLocation()

    return !role ? children : <Navigate to={config.routes.home} replace state={{ from: location }} />
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ProtectedRoute
