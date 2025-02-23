export function handleResponse(response) {
    if (response.ok) {
        window.location.href = "/";
        alert('Review submitted successfully!');
        
    } else {
        alert('Failed to submit review');
    }
}



export function getCookie(name) {
    // Function to get a cookie value by its name
    // Your code here
    const cookieArray = document.cookie.split(";");

    let i = 0;
    const myObj = {}
    while (i < cookieArray.length){
        myObj[cookieArray[i].split("=")[0].trim()] = cookieArray[i].split("=")[1];
        i++;
    }
    if (myObj.token) {
        return myObj.token;
    }
    return null; 
    
}

export function deleteJWT(){
    
}