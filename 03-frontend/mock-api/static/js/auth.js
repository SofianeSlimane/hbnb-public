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
  const response = await fetch(window.location.origin + '/login', {
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

export function setLogOutButtonEvent(){
    const logoutButton = checkAuthentication() ? document.getElementById('logout-button') : null;
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            const response = await fetch(window.location.origin + '/log-out', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                headers: {Authorization: `Bearer ${getCookie('token')}`}
            });
            if (response.ok) {
                window.location.href = '/';
          
            } else {
                alert('Login failed');
            }
        })
    }
}