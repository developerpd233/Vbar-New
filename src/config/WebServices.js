export const BASE_URL = `http://134.122.30.185:8000/api`;
export const BASE_URL_ONLY = `http://134.122.30.185:8000`; //BASE URL without API endpoint for sockets

export const UPDATE_LOCATION =  (id) => `${BASE_URL}/users/update-user-location/${id}` 
export const CONTENT_MANAGMENT =  (id) => `${BASE_URL}/cms/${id}` 
export const AutoFillForm = (email) => `${BASE_URL}/users/userDetailsByEmail/${email}`
