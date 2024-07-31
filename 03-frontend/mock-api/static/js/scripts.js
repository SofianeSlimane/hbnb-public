document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  checkAuthentication();

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

function checkAuthentication() {
    const token = getCookie('token');
    const loginLink = document.getElementById('login-link');

    if (!token) {
        loginLink.style.display = 'block';
    } else {
        loginLink.style.display = 'none';
        // Fetch places data if the user is authenticated
        fetchPlaces(token);
    }
}
function getCookie(name) {
    // Function to get a cookie value by its name
    // Your code here
    const cookieArray = document.cookie.split("=");
    let i = 0;
    while (i < cookieArray.length){
        if (cookieArray[i] === name && (i + 1) < cookieArray.length) {
            return cookieArray[i + 1];
        }
        i++;
    }
    return null; 
    

}
async function fetchPlaces(token) {
    // Make a GET request to fetch places data
    // Include the token in the Authorization header
    // Handle the response and pass the data to displayPlaces function
    fetch(" http://127.0.0.1:5000/places", {headers: {Authorization: `Bearer ${token}}`}})
        .then(response => response.json())
        .then(jso => {
            for (const obj of jso){
            console.log(obj);
            }
})
        .catch(console.log('Could not retrieve data'))
}
