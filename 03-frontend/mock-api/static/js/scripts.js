import { checkAuthentication, loginUser, setLogOutButtonEvent } from './auth.js';
import {setReviewFormEvent, submitReview} from './review.js';
import {getCookie} from './http.js';
import {fetchPlaces, setFilterPlacesEvent, fetchPlaceDetails, getPlaceIdFromURL} from './places.js';


document.addEventListener('DOMContentLoaded', () => {

    setLoginFormEvent();
    setLogOutButtonEvent();
    if (window.location.href.startsWith("http://127.0.0.1:5000/add-review") || window.location.href.startsWith("http://127.0.0.1:5000/details?place=")) {
        console.log("add-review or details page")
        setReviewFormEvent();
    }
    if (window.location.href === "http://127.0.0.1:5000/") {
        
        
        setFilterPlacesEvent();
    }
})


const loggedIn = checkAuthentication();
setVisibleElements(!loggedIn, "login-link");
setVisibleElements(loggedIn, "logout-button");



if (window.location.href === "http://127.0.0.1:5000/") {
    console.log("fetching places");
    fetchPlaces(getCookie('token'));
}

if (window.location.href.startsWith("http://127.0.0.1:5000/details?place=")){
    console.log("fetching place details");
    const id = getPlaceIdFromURL();
    fetchPlaceDetails(getCookie("token"), id);

    setVisibleElements(loggedIn, "add-review");
}

if (window.location.href.startsWith("http://127.0.0.1:5000/add-review")) {
    console.log("add-review page");
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
    if (element) {


        if (loggedIn) {
            console.log(id + " is visible");
            element.style.display = 'block';
    } else {
        console.log(id + " is hidden");
        element.style.display = 'none';
    }


    }
}
