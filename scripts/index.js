"use strict";

const locationSelectorEl = document.getElementById('locationSelector');
const parkTypeSelectorEl = document.getElementById('parkTypeSelector');
const informationSectionEl = document.getElementById('informationSection');
const searchBtnEl = document.getElementById('searchBtn');
const clearBtnEl = document.getElementById('clearBtn');


locationsArray.forEach((state) => {
    const locationDropdown = new Option(state, state)
    locationSelectorEl.appendChild(locationDropdown)
})

parkTypesArray.forEach((park) => {
    const parkTypeDropdown = new Option(park, park)
    parkTypeSelectorEl.appendChild(parkTypeDropdown)
})

searchBtnEl.addEventListener('click', () => {
    informationSectionEl.innerHTML = '';

    const selectedLocation = locationSelectorEl.value;

    const selectedParkByLocation = nationalParksArray.filter((nationalPark) => nationalPark.State === selectedLocation)

    selectedParkByLocation.forEach((selPark) => {

        if (selPark.Zip == 'undefined') {
            selPark.ZipCode
        } if (selPark.Phone == 0) {
            "No listed phone number"
        }
        
        const card = document.createElement('div');
        card.classList.add('card-body');

        const content = `
        <div class="card mt-4">
            <div class="card-header">
            <h5 class="mb-0">
            ${selPark.LocationName}
            </h5>
        </div>

        <div class="card-body py-2">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Address: ${selPark.Address}, ${selPark.City}, ${selPark.State}, ${selPark.Zip}</p>
        <p>Phone number: ${selPark.Phone}</p>
        <button class="btn btn-link">Read more</button>
        </div>

        `;
        informationSectionEl.innerHTML += content;
    })

})

clearBtnEl.addEventListener('click', () => {
    informationSectionEl.innerHTML = '';
})