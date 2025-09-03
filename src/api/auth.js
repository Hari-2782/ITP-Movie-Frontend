import apiClient from './client';

export async function sendOTP(email) {
  return apiClient.post('/user/sendOTP', { email });
}

export async function loginWithOtp(email, otp) {
  return apiClient.post('/user/login', { email, otp });
}
