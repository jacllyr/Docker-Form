document.getElementById('myForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Extract form data
    const formData = new FormData(e.target);
    const jsonData = {};
    formData.forEach((value, key) => { jsonData[key] = value; });

    try {
        // Send a POST request to the server
        const response = await fetch('http://localhost:3001/submit-form', {
            method: 'POST', // Specify the HTTP method
            headers: {
                'Content-Type': 'application/json' // Specify the content type
            },
            body: JSON.stringify(jsonData) // Convert the data to JSON and send it in the request body
        });

        // Wait for the response and extract the text from it
        const data = await response.text();

        // Log the response from the server
        console.log(data);
    } catch (err) {
        // Handle any errors that occur during the request
        console.error(err);
    }
});
