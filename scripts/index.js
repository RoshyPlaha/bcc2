function submitForm(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var name = document.getElementById('name').value;

    console.log('submitting now');
    console.log('Email:', email);
    console.log('Name:', name);

    userFeedback()
}

function userFeedback() {
    document.getElementById('form').classList.add('hidden');
    document.getElementById('success-message').classList.remove('hidden');

}