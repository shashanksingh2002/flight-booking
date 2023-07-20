const logout = document.querySelector('.logout');
const adminEmail = document.querySelector('.user-email');
const message = document.querySelector('.message');

const addFlightForm = document.querySelector('#addFlightForm');
const removeFlightForm = document.querySelector('#removeFlightForm');
const getCustomerDetailsForm = document.querySelector('#getFlightDetailsForm');
const addFlightButton = document.querySelector('.addbutton');
const removeFlightButton = document.querySelector('.removebutton');
const getCustomerButton = document.querySelector('.customerbutton');



addFlightForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(addFlightForm);
    const loginData = Object.fromEntries(formData.entries());
    const url = 'http://localhost:3000/admin/addflight';
    const data = {
      flightId: loginData.flightId,
      airlineName: loginData.airlineName,
      arrivalTime: loginData.arrivalTime,
      date: loginData.date,
      departureTime: loginData.departureTime,
      startDestination: loginData.startDestination,
      endDestination: loginData.endDestination,
      seats: loginData.seats,
      price: loginData.price,
      totalDuration: loginData.totalDuration,
      email: adminEmail.textContent
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
           message.textContent = data.message;
        })
        .catch(error => {
            console.error(error);
        });

})

removeFlightForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(removeFlightForm);
    const loginData = Object.fromEntries(formData.entries());
    const url = 'http://localhost:3000/admin/removeflight';
    const data = {
      flightId: loginData.flightIdToRemove,
      email: adminEmail.textContent
    }
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
           message.textContent = data.message;
        })
        .catch(error => {
            console.error(error);
        });
})


getCustomerDetailsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(getCustomerDetailsForm);
  const loginData = Object.fromEntries(formData.entries());
  const url = 'http://localhost:3000/admin/getflightdetails';
  const data = {
    flightId: loginData.flightIdToGetDetails,
    arrivalTime: loginData.arrivalTimeToGetDetails,
    email: adminEmail.textContent
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
    if(!data.length){
        message.textContent = "No customers for this flight";
    }
    else{
        let html = ``;
        data[0].forEach(d => {
            html += `<div>seats: ${d.seats}, email: ${d.email}</div>`
        })
        bookTickets.innerHTML = html;
    }
  })
  .catch(err => console.error(err))
});

logout.addEventListener('click', () =>{
    const url = 'http://localhost:3000/admin/logout'
        const data = {
            email: adminEmail.textContent
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
});