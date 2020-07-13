import axios from "axios";

export default function authHeader(refresh = false) {
  let user = JSON.parse(localStorage.getItem('user'));


  const API_URL = 'http://api.localhost/api/v1/user/';

  axios
    .post(
      API_URL + 'refresh',
      {},
      {headers: {Authorization: 'Bearer ' + user.refresh_token}}
    )
    .then(response => {
      if (response.data.access_token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
    });


  if (user && user.access_token) {
    if (refresh) {
      return {Authorization: 'Bearer ' + user.refresh_token};
    } else {
      return {Authorization: 'Bearer ' + user.access_token};
    }
  } else {
    return {};
  }
}
