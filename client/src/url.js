const baseUrl = "http://localhost:3001";

export const API_URLS = {
  LOGIN: `${baseUrl}/auth/login`,
  SIGNUP: `${baseUrl}/auth/signup`,
  CATEGORIES: `${baseUrl}/api/categories`,
  ADD_CATEGORY: `${baseUrl}/api/addCategory`,
  ADD_SCHEDULE: `${baseUrl}/api/addSchedule`,
  DELETE_CATEGORY: `${baseUrl}/api/deleteCategory`,
  GET_TIME_SLOT: `${baseUrl}/api/getTimeSlot`,
  GET_USER_SCHEDULE: `${baseUrl}/api/getUserSchedule`,
  GET_ALL_BOOKINGS: `${baseUrl}/api/getAllBookings`,
  UPDATE_BOOKING: `${baseUrl}/api/updateBooking`,
  DELETE_BOOKING: `${baseUrl}/api/deleteBooking`,
};
