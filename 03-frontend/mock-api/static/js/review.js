import { checkAuthentication } from "./auth.js";
import { getCookie } from "./http.js";
import { getPlaceIdFromURL, getPlaceIdFromForm } from "./places.js";
export function setReviewFormEvent(){
    const reviewForm = document.getElementById('review-form');
        
  
        if (reviewForm) {
                checkAuthentication();
                reviewForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const placeId = window.location.href.startsWith(window.location.origin + "/details?place=") ? getPlaceIdFromURL() : getPlaceIdFromForm();
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
            const response = await fetch(`${window.location.origin}/places/${placeId}/reviews`, {
                method: 'POST',
                headers: {
                  "Content-Type": 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ review: reviewText, rating: document.getElementById("rating").value[0]})
            });
           if (response.ok) {
               window.location.href = "/details?place=" + placeId;
               
           }
           else {
               alert('Failed to submit review');
           }
            
        }