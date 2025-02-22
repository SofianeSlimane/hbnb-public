import { checkAuthentication, loginUser } from './auth.js';
import {displayPlaceDetails, fetchPlaceDetails, getPlaceIdFromURL} from './places.js';
import {setReviewFormEvent, submitReview} from './review.js';
import {getCookie, handleResponse} from './http.js';

document.addEventListener('DOMContentLoaded', () => {

   
    const placeDetails = document.getElementById("place-details");
    const queryString = getPlaceIdFromURL();

    if (placeDetails){
        console.log("I am in place details !")
        if (queryString) {
            console.log("I am in query string");
            checkAuthentication2();
            
        }
    }
    setLoginFormEvent();
    setReviewFormEvent();
})


  if (window.location.href === "http://127.0.0.1:5000/"){
    console.log("I am about to check auth before displaying places");
    checkAuthentication();
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






function setLoginFormEvent() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
    
        loginForm.addEventListener('submit', async (event) => {
            
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            await loginUser(email, password);
          
        });
    }  else if (windows.location.pathname === "/login" && !loginForm) {
        alert("Login form not found");
    }
}

