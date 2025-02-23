import { checkAuthentication } from "./auth.js";
import { getCookie } from "./http.js";
import { getPlaceIdFromURL } from "./places.js";
export function setReviewFormEvent(){
    const reviewForm = document.getElementById('review-form');
        console.log("reviewForm", reviewForm);
        
  
        if (reviewForm) {
            console.log("yes", reviewForm);
                checkAuthentication();
                reviewForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const placeId = getPlaceIdFromURL();
                // Get review text from form
                // Make AJAX request to submit review
                // Handle the response
                const reviewText = document.getElementById("review-text").value;
                
                submitReview(getCookie("token"), placeId, reviewText);
            })
            document.getElementById("review-text").value = "";
    }
        }

export async function submitReview(token, placeId, reviewText) {
            // Make a POST request to submit review data
            // Include the token in the Authorization header
            // Send placeId and reviewText in the request body
            // Handle the response
            console.log("submitReview", token, placeId, reviewText);
            const response = await fetch(`http://127.0.0.1:5000/places/${placeId}/reviews`, {
                method: 'POST',
                headers: {
                  "Content-Type": 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ review: reviewText, rating: document.getElementById("rating").value[0]})
            });
            console.log(response.body);
           if (response.ok) {
               window.location.href = "/details?place=" + placeId;
               
           }
           else {
               alert('Failed to submit review');
           }
            
        }