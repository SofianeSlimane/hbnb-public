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
  checkAuthentication();
  
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
        .then(jso =>  displayPlaces(jso))
        .catch((error) => {
            throw new Error(`${error.message}`);

        })
}

function displayPlaces(places) {
    // Clear the current content of the places list
    // Iterate over the places data
    // For each place, create a div element and set its content
    // Append the created element to the places list
    
    document.getElementById("places-list").innerHTML = "";
    for (let i = 0; i < places.length; i++){
        const article = document.createElement("article");
        article.classList.add("place-card");
        article.innerHTML = `<h1>${places[i].description}</h1>
                             <dl>
                                <dt>Price per night:</dt>
                                <dd>${places[i].price_per_night}</dd>

                                <dt>Location:</dt>
                                <dd> ${places[i].city_name}, ${places[i].country_name} ></dico></dd>
                            </dl>
                            <button class="details-button">View Details</button>`;
        if (i % 2 === 0) {
            article.innerHTML += '<br>';
        }

        document.getElementById("places-list").append(article);
    }
}