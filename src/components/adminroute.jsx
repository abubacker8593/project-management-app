import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

function AdminRoutes() {
    let {user} = useSelector((state) => state.auth)
    let isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    if(user == null){
        toast.error("You are not authorized to access this page")
        return <Navigate to="/" replace />  
    }
 if(user?.role !== "admin"){
    toast.error("You are not authorized to access this page")
        return <Navigate to="/" replace />  
    }
  return isAuthenticated ? (
   <>
   <Outlet />
   </>
  ) : (
    toast.error("You are not authorized to access this page"),
    <Navigate to="/" replace />
  )
}

export default AdminRoutes
