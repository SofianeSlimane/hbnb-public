import { checkAuthentication, loginUser, setLogOutButtonEvent } from './auth.js';
import {setReviewFormEvent, submitReview} from './review.js';
import {getCookie} from './http.js';
import {fetchPlaces, setFilterPlacesEvent, fetchPlaceDetails, getPlaceIdFromURL} from './places.js';

const fullPath = window.location.pathname + window.location.search;

document.addEventListener('DOMContentLoaded', () => {
    
    setLoginFormEvent();
    setLogOutButtonEvent();
    if (window.location.pathname.startsWith("/add-review") || fullPath.startsWith("/details?place=")) {
        setReviewFormEvent();
    }
    if (window.location.pathname === "/") {
        
        
        setFilterPlacesEvent();
    }
})

const loggedIn = checkAuthentication();
setVisibleElements(!loggedIn, "login-link");
setVisibleElements(loggedIn, "logout-button");



if (window.location.pathname === "/") {
    fetchPlaces(getCookie('token'));
}

if (fullPath.startsWith("/details?place=")){
    const id = getPlaceIdFromURL();
    fetchPlaceDetails(getCookie("token"), id);

    setVisibleElements(loggedIn, "add-review");
}

if (fullPath.startsWith("/add-review")) {
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
    if (element) {


        if (loggedIn) {
            element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }


    }
}
