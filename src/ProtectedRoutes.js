import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { loginStatus } from './Features/LoginSlice'




const ProtectedRoutes = ({ allowedRoles }) => {
    const location = useLocation()
    const userIn = useSelector(loginStatus)
    const test = Number(localStorage.getItem('role'))
    // console.log('admin role ==>', userIn.adminRole.includes(allowedRoles))

    return (
        allowedRoles.includes(test) ? <Outlet /> : userIn.userAuth ? <Navigate to='/restriction' replace state={{ from: location }} /> :
            < Navigate to='/login' replace state={{ from: location }
            } />)

}

export default ProtectedRoutes









// const ProtectedRoutes = () => {
//     const location = useLocation()
//     const userIn = useSelector(loginStatus)

//     // console.log(userIn.userAuth)

//     return userIn.userAuth ? <Outlet/>: <Navigate to='/login' replace state={{ from: location }} />

// }

// export default ProtectedRoutes