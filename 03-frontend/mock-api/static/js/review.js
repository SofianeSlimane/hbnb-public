export function setReviewFormEvent(){
    const reviewForm = document.getElementById('review-form');
        
        
  
        if (reviewForm) {
                const token = checkAuthentication3();
                reviewForm.addEventListener('submit', async (event) => {
                const placeId = getPlaceIdFromURL();
                event.preventDefault();
                // Get review text from form
                // Make AJAX request to submit review
                // Handle the response
                const reviewText = document.getElementById("review").value;
                
                submitReview(token, placeId, reviewText);
            })
            reviewForm.innerHTML = "";
    }
        }

export async function submitReview(token, placeId, reviewText) {
            // Make a POST request to submit review data
            // Include the token in the Authorization header
            // Send placeId and reviewText in the request body
            // Handle the response
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