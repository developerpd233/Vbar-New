import axios from 'axios';
import { BASE_URL } from '../../../config/WebServices';

const baseURL = BASE_URL;

export async function qrScan(qr_Code) {
  return await axios.post(`${baseURL}/qrScanner/scan`, {
    qr_Code,
  });
}

export async function createUser(
  name,
  identity,
  interest,
  age,
  relation,
  favDrink,
  favSong,
  hobbies,
  petPeeve,
  id,
  email,
  fcmToken
) {
  return await axios.post(`${baseURL}/users/addUser/${id}`, {
    name,
    identity,
    interest,
    age,
    relationPreference:relation,
    favDrink,
    favSong,
    hobbies,
    petPeeve,
    email,
    fcmToken
  });
}

export async function verifyOTP(
  name,
  identity,
  interest,
  age,
  relationPreference,
  favDrink,
  favSong,
  hobbies,
  petPeeve,
  id,
  email,
  otpCode,
  fcmToken,
  already_OTPverified = false
) {
  return await axios.post(`${baseURL}/users/verifyOtp`, {
    name,
    id,
    identity,
    interest,
    age,
    relationPreference,
    favDrink,
    favSong,
    hobbies,
    petPeeve,
    email,
    otpCode,
    fcmToken,
    already_OTPverified
  });
}
export async function UploadImage(file, token) {
  return await axios.post(
    `${baseURL}/users/uploadImage`,
    {
      file,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'x-amz-acl': 'public-read',
        ContentType: 'application/json',
      },
    },
  );
}

export async function Getlocation(token, id) {
 console.log("🚀 ~ file: auth.js:91 ~ Getlocation ~ token:", token , id)
 
  return await axios.get(`${baseURL}/location/getLocation/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


export async function AddAlluser(locationId, token) {
  return (
      await axios.post(
        `${baseURL}/users/addToLocation/${locationId}`,
        
        {
          headers: {
            Authorization: `Bearer ${token}`,
    
          },
        },
      )
  )
    
        
  
   
}
export async function StoreLogs(logText) {
  return (
      await axios.post(
        `${baseURL}/logs/store`,
        {
          logText,
        },
        
      )
  )
   
}


export async function getLocationUser(token, id) {
  var config = {
    method: 'get',
    url: `${baseURL}/users/location/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios(config);

  return await axios.get(`${baseURL}/users/location/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}



export async function Adduserlocation(token, id) {
  console.log("🚀 ~ file: auth.js ~ line 90 ~ Adduserlocation ~ token", token)
  return await axios.put(`${baseURL}/users/update-user-location/${id}`), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios(config);
}

export async function findOneuser(token, id) {
  return await axios.get(`${baseURL}/users/findUser/${id}`), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export async function getUserPayPalClientToken(token) {
  return await axios.get(`${baseURL}/paypal/client_token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

