import {getCookie} from './http.js';
import {fetchPlaces} from './places.js';

export function checkAuthentication() {
    const token = getCookie('token');
    const loginButton = document.getElementById('login-link');

    if (!token) {
        loginButton.style.display = 'block';
       
    } else {
        loginButton.style.display = 'none';
        // Fetch places data if the user is authenticated
  
        fetchPlaces(token);
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