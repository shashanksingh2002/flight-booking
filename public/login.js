const login = document.querySelector('.login');
const loginForm = document.querySelector('.loginform')
const message = document.querySelector('.message');
const signup = document.querySelector('.signupbutton');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const loginData = Object.fromEntries(formData.entries());
    
    const url = 'http://localhost:3000/user/login';
    const data = {
        email: loginData.email,
        password: loginData.password
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => { 
            if (data.data === 1) {
                // If login is successful, redirect to the index page
                const url = 'http://localhost:3000/?email=' + loginData.email;
                window.location.href = url;
            } else {
                message.textContent = data.Message;
            }
        })
        .catch(error => {
            console.error(error);
        });
});

signup.addEventListener('click', () => {
    const url = 'http://localhost:3000/signupuser';
    window.location.href = url;
});
