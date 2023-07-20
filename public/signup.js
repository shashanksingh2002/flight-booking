const signupButton = document.querySelector('.signupbutton');
const signupForm = document.querySelector('.signupform');
const messageBox = document.querySelector('.message');

signupButton.addEventListener('click' ,(e) => {
    e.preventDefault();
    const formData = new FormData(signupForm);
    const loginData = Object.fromEntries(formData.entries());
    
    const url = 'http://localhost:3000/user/signup';
    const data = {
        email: loginData.email,
        password: loginData.password,
        fName: loginData.firstName,
        lName: loginData.lastName
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
            if(data.data){
                const url = 'http://localhost:3000/loginuser';
                window.location.href = url;
            }
            else{
                messageBox.textContent = data.message;
            }
        })
        .catch(error => {
            console.error(error);
        });
});