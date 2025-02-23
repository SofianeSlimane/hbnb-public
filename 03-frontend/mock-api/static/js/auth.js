import {getCookie} from './http.js';

export function checkAuthentication() {

    const token = getCookie('token');
    if (!token) {
        return false
    } else {
        return true;
    }
         
    }



export async function loginUser(email, password) {
    console.log("hello")
  const response = await fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
  });
  if (response.ok) {
      const data = await response.json();
      document.cookie = `token=${data.access_token}; path=/`;
      window.location.href = '/';

  } else {
      alert('Login failed');
  }
}