const loginForm = document.querySelector('.loginform');
const loginButton = document.querySelector('.loginbutton');
const message = document.querySelector('.message');


loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const loginData = Object.fromEntries(formData.entries());
    
    const url = 'http://localhost:3000/admin/login';
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
            if(data.email){
                const url = 'http://localhost:3000/adminhomepage?email=' + loginData.email;
                window.location.href = url;
            }
            else{
                message.textContent = data.message;
            }
        })
        .catch(error => {
            console.error(error);
        });
})


