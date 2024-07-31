document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
          event.preventDefault();
          // Your code to handle form submission
          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;
          // console.log(email);
          // console.log(password);
          await loginUser(email, password);
          

      });
  }
});

async function loginUser(email, password) {
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
      window.location.href = '/places';
      console.log(document.cookie);
  } else {
      alert('Login failed: ' + response.statusText);
  }
}

