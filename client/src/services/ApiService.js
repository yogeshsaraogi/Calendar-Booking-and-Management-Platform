import axios from "axios";
import { API_URLS } from "../url";

const get = async (url, params = null) => {
  console.log(params);
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const post = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const put = async (url, data) => {
  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const del = async (url, id) => {
  try {
    const response = await axios.delete(url, { params: { id } });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const handleApiError = (error) => {
  if (error.response && error.response.status === 401) {
    alert("Token expired or unauthorized");
  } else {
    alert("API Error:", error.message);
  }
};

//api calls

export const getCategories = async () => {
  return await get(API_URLS.CATEGORIES);
};

export const addCategory = async (name) => {
  return await post(API_URLS.ADD_CATEGORY, { name });
};

export const addSchedule = async (data) => {
  return await post(API_URLS.ADD_SCHEDULE, data);
};

export const getTimeSlot = async (date) => {
  return await post(API_URLS.GET_TIME_SLOT, date);
};

export const getUserSchedule = async (userId) => {
  return await post(API_URLS.GET_USER_SCHEDULE, userId);
};

export const getAllBookings = async (date) => {
  return await get(API_URLS.GET_ALL_BOOKINGS, { date });
};

export const updateBooking = async (booking) => {
  return await put(API_URLS.UPDATE_BOOKING, booking);
};

export const deleteBooking = async (id) => {
  return await del(API_URLS.DELETE_BOOKING, id);
};

export const deleteCategory = async (id) => {
  return await del(API_URLS.DELETE_CATEGORY, id);
};
