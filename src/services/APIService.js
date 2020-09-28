import { API_BASE_URL, ACCESS_TOKEN } from '../config/constants';
import axios from '../config/axios';

export async function uploadFileExcelAPI(fileRequest) {
  var formData = new FormData();
  formData.append('file', fileRequest, fileRequest.name);

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

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return axios.get("/user/me");
}