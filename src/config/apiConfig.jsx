// src/config/apiConfig.js
// This file centralizes all API endpoints

const isDevelopment = import.meta.env.MODE === 'development';

// Base API URL - automatically switches between dev and production
const API_BASE_URL = isDevelopment 
  ? 'http://localhost:8080/api'
  : 'https://recoverprobackend.onrender.com/api';

// Auth Endpoints
export const AUTH_API = {
  SIGNIN: `${API_BASE_URL}/auth/signin`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  SEND_OTP: `${API_BASE_URL}/auth/password/send-otp`,
  VERIFY_OTP: `${API_BASE_URL}/auth/password/verify-otp`,
  RESET_PASSWORD: `${API_BASE_URL}/auth/password/reset`,
};

// Field Executive Endpoints
export const FE_API = {
  DASHBOARD_STATS: `${API_BASE_URL}/fe/dashboard/stats`,
  DASHBOARD_CASES: `${API_BASE_URL}/fe/dashboard/cases`,
  CASES: `${API_BASE_URL}/fe/cases`,
  VISIT_ADDRESSES: (loanNumber) => `${API_BASE_URL}/fe/cases/${loanNumber}/addresses`,
};

// Vendor Endpoints
export const VENDOR_API = {
  DASHBOARD_STATS: `${API_BASE_URL}/vendor/dashboard/stats`,
  DASHBOARD_CASES: `${API_BASE_URL}/vendor/dashboard/cases`,
  MY_CASES: `${API_BASE_URL}/vendor/dashboard/my-cases`,
  VISIT_ADDRESSES: (loanNumber) => `${API_BASE_URL}/vendor/dashboard/cases/${loanNumber}/addresses`,
  FIELD_OFFICERS: `${API_BASE_URL}/vendor/dashboard/field-officers`,
};

// Profile Endpoints
export const PROFILE_API = {
  GET_PROFILE: `${API_BASE_URL}/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/profile`,
  GET_ALL_USERS: `${API_BASE_URL}/users`,
};

// Visit Log Endpoints
export const VISIT_LOG_API = {
  CREATE: `${API_BASE_URL}/visit-logs`,
  GET_BY_ALLOCATION: (allocationId) => `${API_BASE_URL}/visit-logs/allocation/${allocationId}`,
  GET_MY_VISITS: `${API_BASE_URL}/visit-logs/my-visits`,
  GET_ALL: `${API_BASE_URL}/visit-logs/allocation/get-all`,
};

// Notification Endpoints
export const NOTIFICATION_API = {
  BROADCAST: `${API_BASE_URL}/notifications/broadcast`,
  GET_MY_NOTIFICATIONS: `${API_BASE_URL}/notifications/me`,
  UNREAD_COUNT: `${API_BASE_URL}/notifications/me/unread-count`,
  MARK_AS_READ: (notificationId) => `${API_BASE_URL}/notifications/me/read/${notificationId}`,
  MARK_ALL_AS_READ: `${API_BASE_URL}/notifications/me/read-all`,
};

export default API_BASE_URL;