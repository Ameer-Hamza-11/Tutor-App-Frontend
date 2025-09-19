import api from './client'

export const registerApi = async (formData) => {
    try {
        const response = await api.post('/api/auth/register', formData)
        return response.data
    } catch (error) {
        throw new Error(error?.response?.data?.message || "Registration failed");
    }
}

export const loginApi = async (formData) => {
    try {
        const responce = await api.post('/api/auth/login', formData)
        console.log(responce.data);
        return responce.data
    } catch (error) {
        throw new Error(error?.response?.data?.message || "Login failed");
    }
}


export const verifyOtpApi = async (otp) => {
    try {
        const response = await api.post('/api/auth/verify-otp', { otp })
        return response.data
    } catch (error) {
        throw new Error(error?.response?.data?.message || "Verification failed");
    }
}

export const forgotPasswordApi = async (Email) => {
    try {
        const response = await api.post('/api/auth/forgot-password', { Email })
        return response.data
    } catch (error) {
        throw new Error(error?.response?.data?.message || "Request failed");
    }
}

export const resetPasswordApi = async (otp, newPassword) => {
    try {
        const response = await api.post('/api/auth/reset-password', { otp, newPassword })
        return response.data
    } catch (error) {
        throw new Error(error?.response?.data?.message || "Reset password failed");
    }
}

export const resendEmailApi = async (Email) => {
    try {
        const response = await api.post('/api/auth/resend-email', { Email })
        return response.data
    } catch (error) {
        throw new Error(error?.response?.data?.message || "Resend email failed");
    }
}