import { API_BASE_URL, ACCESS_TOKEN } from '../config/constants';
import axios from '../config/axios';

export async function uploadFileExcelAPI(fileRequest) {
  var formData = new FormData();
  formData.append('file', fileRequest, fileRequest.name);

  let status = null;

  await fetch(API_BASE_URL + "/uploadFile", {
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) },
    method: 'POST',
    body: formData
  }).then((response) => {
    return "success"
  }).catch((error) => {
    return "fail"
  });
}

export function login(loginRequest) {
  return axios.post("/auth/signin", loginRequest);
}

export function signup(signupRequest) {
  return axios.post("/auth/signup", signupRequest);
}

// export function checkUsernameAvailability(username) {
//     return request({
//         url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
//         method: 'GET'
//     });
// }

// export function checkEmailAvailability(email) {
//     return request({
//         url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
//         method: 'GET'
//     });
// }


export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return axios.get("/user/me");
}