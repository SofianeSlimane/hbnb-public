import { checkAuthentication, loginUser } from './auth.js';
import {setReviewFormEvent, submitReview} from './review.js';
import {getCookie, handleResponse} from './http.js';
import {fetchPlaces, setViewDetailsButtonEvent, setFilterPlacesEvent, fetchPlaceDetails, getPlaceIdFromURL} from './places.js';


document.addEventListener('DOMContentLoaded', () => {

    setLoginFormEvent();
    if (window.location.href.startsWith("http://127.0.0.1:5000/add-review")) {

        setReviewFormEvent();
    }
    if (window.location.href === "http://127.0.0.1:5000/") {
        
        setViewDetailsButtonEvent();
        setFilterPlacesEvent();
    }
})


const loggedIn = checkAuthentication();
setVisibleElements(!loggedIn, "login-link");

if (window.location.href === "http://127.0.0.1:5000/") {
fetchPlaces(getCookie('token'));
}

if (window.location.href.startsWith("http://127.0.0.1:5000/details")){
    const id = getPlaceIdFromURL();
    
    fetchPlaceDetails(getCookie("token"), id);

    setVisibleElements(loggedIn, "add-review");
}

if (window.location.href.startsWith("http://127.0.0.1:5000/add-review")) {
    if (!getCookie('token')) {
        window.location.href = '/login';
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

function setVisibleElements(loggedIn, id) {
    const element = document.getElementById(id);
    console.log(element)
    if (loggedIn) {
        console.log(getCookie('token'));
        element.style.display = 'block';
} else {
    element.style.display = 'none';
}
}
