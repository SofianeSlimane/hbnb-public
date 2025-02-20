document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const placeDetails = document.getElementById("place-details");
    const queryString = getPlaceIdFromURL();
    const buttonLogin = document.getElementById("login-link")
    const countryFilter = document.getElementById('country-filter');
    if (placeDetails){
        console.log("I am in place details !")
        if (queryString) {
            console.log("I am in query string");
            checkAuthentication2();
            
        }
    }
  if (loginForm) {
    console.log("I am in login form");
      loginForm.addEventListener('submit', async (event) => {
          event.preventDefault();
          // Your code to handle form submission
          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;
          console.log(email);
          console.log(password);
          await loginUser(email, password);
        
          

      });
  }

  })
  if (window.location.href === "http://127.0.0.1:5000/"){
    console.log("I am about to check auth before displaying places");
    checkAuthentication();
  }

  if (window.location.href === "http://127.0.0.1:5000/add-review"){
    console.log("The url is add-review");
    document.addEventListener('DOMContentLoaded', () => {
        const reviewForm = document.getElementById('review-form');
        
        
  
        if (reviewForm) {
                const token = checkAuthentication3();
                console.log("Entering if reviewform")
                reviewForm.addEventListener('submit', async (event) => {
                const placeId = getPlaceIdFromURL();
                event.preventDefault();
                console.log("Entering review form event")
                // Get review text from form
                // Make AJAX request to submit review
                // Handle the response
                const reviewText = document.getElementById("review").value;
                
                submitReview(token, placeId, reviewText);
                

            });
        }
    });

  }
  console.log("I am here");
  
  document.getElementById('country-filter').addEventListener('change', (event) => {
    
    // Get the selected country value
    // Iterate over the places and show/hide them based on the selected country
    const selected = document.getElementById("country-filter").value
    console.log(selected);
    const placesList = document.querySelectorAll(".place-card");
    console.log(placesList)
    console.log(Array.isArray(placesList[0]));
    placesList.forEach(elem => {
        if (selected != elem.id) {
            elem.style.display = "none"; 
        }
        else {
            elem.style.display = "block";
        }
    });
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
      window.location.href = '/';
      console.log("Login successful");
      console.log(data.access_token)
  } else {
      alert('Login failed: ' + response.statusText);
  }
}

function checkAuthentication() {
    const token = getCookie('token');
    const loginButton = document.getElementById('login-link');

    if (!token) {
        loginButton.style.display = 'block';
        console.log("No token");
    } else {
        loginButton.style.display = 'none';
        // Fetch places data if the user is authenticated
        console.log("I have a token");
        fetchPlaces(token);
    }
}
function getCookie(name) {
    // Function to get a cookie value by its name
    // Your code here
    console.log(document.cookie)
    const cookieArray = document.cookie.split(";");

    let i = 0;
    const myObj = {}
    while (i < cookieArray.length){
        // if (cookieArray[i] === name && (i + 1) < cookieArray.length) {
        //     return cookieArray[i + 1];
        // }
        // i++;
        myObj[cookieArray[i].split("=")[0].trim()] = cookieArray[i].split("=")[1];
        i++;
    }
    console.log(myObj.token)
    if (myObj.token) {
        return myObj.token;
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
    console.log("I am about to display places")
    document.getElementById("places-list").innerHTML = "";
    for (let i = 0; i < places.length; i++){
        const article = document.createElement("article");
        article.classList.add("place-card");
        article.id = places[i].country_name.toLowerCase();
        article.innerHTML = `<h1>${places[i].description}</h1>
                             <dl>
                                <dt>Price per night:</dt>
                                <dd>${places[i].price_per_night}</dd>

                                <dt>Location:</dt>
                                <dd> ${places[i].city_name}, ${places[i].country_name}</dd>
                            </dl>
                            <button class="details-button">View Details</button>`;
       

        document.getElementById("places-list").append(article);
    }

    let myArray = [];
    for (let i = 0; i < places.length; i++) {
        
        
        if (!myArray.includes(places[i].country_name)){
            const option = document.createElement("option")
            option.value = places[i].country_name.toLowerCase();
            option.innerText = places[i].country_name;
            document.getElementById("country-filter").append(option);
            myArray.push(places[i].country_name);
        }
    }
}



function getPlaceIdFromURL() {
    // Extract the place ID from window.location.search
    // Your code here
    const urlParameters = new URLSearchParams(window.location.search);
    console.log(urlParameters.get('place'));
    return urlParameters.get('place');
}


function checkAuthentication2() {
    console.log("Checking authentification");
    const token = getCookie('token');
    const addReviewSection = document.getElementById('add-review');
    const loginLink = document.getElementById('login-link');
    const placeId = getPlaceIdFromURL();
    const placeDetails = document.getElementById("place-details");

    if (!token) {
        console.log("I don't have a token");
        addReviewSection.style.display = 'none';
        loginLink.style.display = 'block';
        placeDetails.style.display = 'block';
        fetchPlaceDetails(token, placeId);
    } else {
        console.log("I have a token")
        addReviewSection.style.display = 'block';
        loginLink.style.display = 'none';
        placeDetails.style.display = 'block';
        // Store the token for later use
        fetchPlaceDetails(token, placeId);
    }
}



async function fetchPlaceDetails(token, placeId) {
    // Make a GET request to fetch place details
    // Include the token in the Authorization header
    // Handle the response and pass the data to displayPlaceDetails function
    const place_id = getPlaceIdFromURL();
    await fetch(`http://127.0.0.1:5000/places/${placeId}`, {headers: {Authorization: `Bearer ${token}}`}})
    .then(response => response.json())
    .then(data => displayPlaceDetails(data))
    .catch("Could not retrive place details");
}

function displayPlaceDetails(place) {
    // Clear the current content of the place details section
    // Create elements to display the place details (name, description, location, images)
    // Append the created elements to the place details section
    document.getElementById("place-details").innerHTML = "";
    console.log(place);
    const article = document.createElement("article");
        article.id = place.country_name.toLowerCase();
        article.innerHTML = `<h1>${place.description}</h1>
                             <dl>

                                <dt>Host:</dt>
                                <dd>${place.host_name}</dd>
                                
                                <dt>Price per night:</dt>
                                <dd>${place.price_per_night}</dd>

                                <dt>Location:</dt>
                                <dd> ${place.city_name}, ${place.country_name}</dd>
                                
                                <dt>Amenities:</dt>
                                <dd> ${place.amenities.join()}</dd>
                            </dl>
                            <button class="details-button">View Details</button>`;
       

                            document.getElementById("place-details").append(article);
    

}


function checkAuthentication3() {
    const token = getCookie('token');
    const loginLink = document.getElementById('login-link');
      if (!token) {
          console.log("No token");
          window.location.href = '/';
          loginLink.style.display = 'block';
          
      }
      else {
        console.log("Token present");
        loginLink.style.display = 'none';
      return token;
      }
}

async function submitReview(token, placeId, reviewText) {
    // Make a POST request to submit review data
    // Include the token in the Authorization header
    // Send placeId and reviewText in the request body
    // Handle the response
    console.log(reviewText);
    response = await fetch(`http://127.0.0.1:5000/places/${placeId}/reviews`, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ review: reviewText, rating: document.getElementById("review").value})
  });
    handleResponse(response);

}


function handleResponse(response) {
    if (response.ok) {
        alert('Review submitted successfully!');
        document.getElementById('review-form').innerHTML = "";
    } else {
        alert('Failed to submit review');
    }
}