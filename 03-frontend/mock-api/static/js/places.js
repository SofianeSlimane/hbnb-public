export async function fetchPlaces(token) {
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

export function displayPlaces(places) {
    // Clear the current content of the places list
    // Iterate over the places data
    // For each place, create a div element and set its content
    // Append the created element to the places list

    document.getElementById("places-list").innerHTML = "";
    for (let i = 0; i < places.length; i++){
        const article = document.createElement("article");
        article.classList.add("place-card");
        article.id = places[i].country_name.toLowerCase();
        article.innerHTML = `<h1>${places[i].description}</h1>
                             <dl>
                                <dt>Price per night:</dt>
                                <dd>$${places[i].price_per_night}</dd>

                                <dt>Location:</dt>
                                <dd> ${places[i].city_name}, ${places[i].country_name}</dd>
                            </dl>
                            <a class="details-button" href="http://127.0.0.1:5000/details?place=${places[i].id}">View Details</a>`;
       

        document.getElementById("places-list").append(article);
    }

    populateDropdownFilterMenu(places);
}



function populateDropdownFilterMenu(places) {
    let myArray = [];
    for (let i = 0; i < places.length; i++) {


        if (!myArray.includes(places[i].country_name)) {
            const option = document.createElement("option");
            option.value = places[i].country_name.toLowerCase();
            option.innerText = places[i].country_name;
            document.getElementById("country-filter").append(option);
            myArray.push(places[i].country_name);
        }
    }
}

export function getPlaceIdFromURL() {
    // Extract the place ID from window.location.search
    // Your code here
    const urlParameters = new URLSearchParams(window.location.search);
    return urlParameters.get('place');
}

export async function fetchPlaceDetails(token, placeId) {
    // Make a GET request to fetch place details
    // Include the token in the Authorization header
    // Handle the response and pass the data to displayPlaceDetails function
    await fetch(`http://127.0.0.1:5000/places/${placeId}`, {headers: {Authorization: `Bearer ${token}}`}})
    .then(response => response.json())
    .then(data => displayPlaceDetails(data))
    .catch("Could not retrive place details");
}

export function displayPlaceDetails(place) {
// Clear the current content of the place details section
// Create elements to display the place details (name, description, location, images)
// Append the created elements to the place details section
console.log(typeof place.country_name);
document.getElementById("place-details").innerHTML = "";

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
</dl>`;


document.getElementById("place-details").append(article);
displayReviews(place.reviews)


}


export function setFilterPlacesEvent() {
    document.getElementById('country-filter').addEventListener('change', (event) => {

        // Get the selected country value
        // Iterate over the places and show/hide them based on the selected country
        event.preventDefault();
        const selected = document.getElementById("country-filter").value;
        const placesList = document.querySelectorAll(".place-card");
        placesList.forEach(elem => {
            if (selected != elem.id) {
                elem.style.display = "none";
            }
            else {
                elem.style.display = "block";
            }
        });
    });
}

export function displayReviews(reviews) {
    const reviewsSection = document.getElementById("reviews");
    reviewsSection.innerHTML = "";
    reviews.forEach(review => {
        const article = document.createElement("article");
        article.innerHTML = `<h2>${review.user_name}</h2>
        <footer>
            <span>${review.comment}</span>
            <br>
            <span>Rating: ${review.rating}</span>
        </footer>`;
        reviewsSection.append(article);
    });
}




export function getPlaceIdFromForm() {
    // Extract the place ID from the form
    // Your code here
    return document.getElementById("place").value;
}