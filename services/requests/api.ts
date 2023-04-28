import axios from 'axios';
import { HOST_API_KEY } from 'src/config';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
import { useAuthContext } from 'src/auth/useAuthContext';


// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });


axiosInstance.interceptors.request.use(function (config) {
  const token = Cookies.get('token');
  if(token !== undefined && config.headers !== undefined){
    config.headers['Authorization'] =  `Bearer ${token}`;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if(error.response.status == 401 || error.response.status == 403){
    Cookies.remove('token');
    location.href = '/login'
  }
  return Promise.reject(error);
});


export default axiosInstance;
