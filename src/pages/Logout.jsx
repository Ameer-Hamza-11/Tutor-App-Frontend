import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.user)
    const token = useSelector((state) => state.auth.token)
    useEffect(() => {
        if (user && token) {
            dispatch(logout());
            navigate('/login');
            toast.success("Logged out successfully");
        }
    }, [dispatch, navigate, user, token])
    return (
        <></>
    )
}

export default Logout
