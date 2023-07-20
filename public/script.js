const getFlight = document.querySelector('.getflight');
const getFlightSubmit = document.querySelector('.getflightsubmit');
const fetchGetFlightData = document.querySelector('.bookticket');
const loginButton = document.querySelector('.loginbutton');
const signupButton = document.querySelector('.signupbutton');
const adminLoginButton = document.querySelector('.adminbutton');
const userEmail = document.querySelector('.user-email')
const logoutButton = document.querySelector('.logoutbutton');

getFlightSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const formData = new FormData(getFlight);
    const flightData = Object.fromEntries(formData.entries());
    
    const url = 'http://localhost:3000/user/searchflight';

    let email = '';

    if(userEmail){
        email = userEmail.textContent;
    }

    const data = {
        date:flightData.date,
        startDestination:flightData.startDestination,
        endDestination:flightData.endDestination,
        email: email
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
            let html = ``;
            data.data.forEach(d => {
                html += `<div>
                flightId: ${d.flightId}<br>
                airlineName: ${d.airlineName}<br>
                arrivalTime: ${d.arrivalTime}<br>
                date: ${d.date}<br>
                departureTime: ${d.departureTime}<br>
                startDestination: ${d.startDestination}<br>
                endDestination: ${d.endDestination}<br>
                seats: ${d.seats}<br>
                price: ${d.price}<br>
                totalDuration: ${d.totalDuration}<br>
                
                <button class="bookTicket">Book Tickets</button>
                </div>`
            })
            fetchGetFlightData.innerHTML = html;
        }
        else fetchGetFlightData.textContent = data.message;
    })
    .catch(error => {
        // Handle any errors
        console.error(error);
    });
});

if(loginButton){
    loginButton.addEventListener('click', () => {
        const url = 'http://localhost:3000/loginuser';
        window.location.href = url;
    });
}

if(signupButton){
    signupButton.addEventListener('click' ,() => {
        const url = 'http://localhost:3000/signupuser';
        window.location.href = url;
    });
}

if(adminLoginButton){
    adminLoginButton.addEventListener('click' ,() => {
        const url = 'http://localhost:3000/loginadmin';
        window.location.href = url;
    });
}


if(logoutButton){
    logoutButton.addEventListener('click', () => {
        const url = 'http://localhost:3000/user/logout'
        const data = {
            email: userEmail.textContent
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                const url = 'http://localhost:3000/';
                window.location.href = url;
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    })
}

