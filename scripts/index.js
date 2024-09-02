async function submitForm(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const notes = document.getElementById('notes').value;

    console.log('submitting now');
    const http_status = await storeResult(email, name, notes)

    if (http_status == 200) {
        positiveFeedback()
    } else {
        negativeFeedback()
    }
}

function positiveFeedback() {
    document.getElementById('form').classList.add('hidden');
    document.getElementById('success-message').classList.remove('hidden');
}

function negativeFeedback() {
    document.getElementById('form').classList.add('hidden');
    document.getElementById('error-message').classList.remove('hidden');
}

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

async function storeResult(email, name, notes) {

    const lambdaFunctionUrl = 'https://pbaf7nnsesl5paxyda34j4u5wm0bjjdx.lambda-url.us-east-1.on.aws/';

    const data = {
        email: email,
        name: name,
        notes: notes,
        date: getCurrentDate()
    };

    console.log('data packet is: ', data)

    try {
        // Use fetch to make a POST request
        const response = await fetch(lambdaFunctionUrl, {
            method: 'POST', // Set the method to POST
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify(data) // Convert the data object to a JSON string
        });

        if (!response.ok) {
            console.error("not a good response - got: ", response.status)
            return response.status
        }
        const result = await response.json();

        console.log('Success');
        return response.status
    } catch (error) {
        console.error(error)
        return 500
    }

}