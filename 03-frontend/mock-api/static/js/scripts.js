import { checkAuthentication, loginUser } from './auth.js';
import {displayPlaceDetails, fetchPlaceDetails, getPlaceIdFromURL, setfilterPlacesEvent} from './places.js';
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
    setViewDetailsButtonEvent();
})


  if (window.location.href.startsWith("http://127.0.0.1:5000/")){
    checkAuthentication();
  }

  if (window.location.href.startsWith("http://127.0.0.1:5000/details/")){
    console.log("heyy")
    checkAuthentication();
    const id = getPlaceIdFromURL();
    const token = getCookie('token');
    if (token) {

        fetchPlaceDetails(token, id);
    } else {
        window.location.href = '/login';
    }
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
    }
}

