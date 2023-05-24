"use strict";

const locationSelectorEl = document.getElementById('locationSelector');
const parkTypeSelectorEl = document.getElementById('parkTypeSelector');
const informationSectionEl = document.getElementById('informationSection');

const btnDivEl = document.getElementById('btnDiv');

const tbody = document.querySelector('#informationTable tbody');

const searchBtnEl = document.getElementById('searchBtn');
const clearBtnEl = document.getElementById('clearBtn');

const searchByLocationRadio = document.getElementById('searchByLocation');
const searchByParkTypeRadio = document.getElementById('searchByParkType');


locationsArray.forEach((state) => {
    const locationDropdown = new Option(state, state)
    locationSelectorEl.appendChild(locationDropdown)
})

parkTypesArray.forEach((park) => {
    const parkTypeDropdown = new Option(park, park)
    parkTypeSelectorEl.appendChild(parkTypeDropdown)
})

locationSelectorEl.addEventListener('change', () => {

    const selectedLocation = locationSelectorEl.value;
    if(!selectedLocation) {
        informationSectionEl.innerHTML = '';
        return;
    } if (parkTypeSelectorEl) {
        parkTypeSelectorEl.value = '';
    }

    const nationalParkLocation = nationalParksArray.filter((nationalPark) => nationalPark.State === selectedLocation)

    const tbody = informationTable.querySelector('tbody');
    tbody.innerHTML = '';

    nationalParkLocation.forEach((selPark) => {
        buildNationalParkRow(tbody, selPark)
    })

})

parkTypeSelectorEl.addEventListener('change', () => {

    const selectedParkType = parkTypeSelectorEl.value;
    if(!selectedParkType) {
        informationSectionEl.innerHTML = '';
        return;
    } if (locationSelectorEl) {
        locationSelectorEl.value = '';
    }

    const nationalParkType = nationalParksArray.filter((nationalPark) => nationalPark.LocationName.includes(selectedParkType));

    const tbody = informationTable.querySelector('tbody');
    tbody.innerHTML = '';

    nationalParkType.forEach((selPark) => {
        buildNationalParkRow(tbody, selPark)
    })

})

function buildNationalParkRow(table, park) {

    const row = table.insertRow();

    const locationNameCell = row.insertCell();
    locationNameCell.innerHTML = park.LocationName;

    const addressCell = row.insertCell();
    addressCell.innerHTML = `${park.Address}, ${park.City}, ${park.State}, ${park.ZipCode}`

    const phoneNumberCell = row.insertCell();
    phoneNumberCell.innerHTML = park.Phone;

    const showMoreBtn = document.createElement('button');
    showMoreBtn.classList.add('btn', 'btn-outline-dark', 'showBtn');
    showMoreBtn.innerText = "Show More"
    showMoreBtn.addEventListener('click', () => {

        const row2 = table.insertRow(row.rowIndex);

        const mapImg = document.createElement('img');
        mapImg.src = `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/static/pin-s+f44e4c(${park.Longitude},${park.Latitude})/${park.Longitude},${park.Latitude},8.96,0/300x200?access_token=pk.eyJ1IjoiY2hhdW5pIiwiYSI6ImNsaTIxMnBrMzFycWgzZ3A5NHNtNTJvdzIifQ.sqOQKGGQwdAV7uEgqoSlsw`
        mapImg.alt = park.LocationName

        const mapColspan = row2.insertCell();
        mapColspan.setAttribute('colspan', '5');
        mapColspan.appendChild(mapImg);
        
    })

    row.append(showMoreBtn)

    if (park.Phone == 0) {
        phoneNumberCell.innerHTML = "No phone number listed"
    } if (park.Address == 0) {
        addressCell.innerHTML = 'Information unavailable'
    } if (park.ZipCode == 0) {
        addressCell.innerHTML = 'Information unavailable'
    };
}


// clearBtnEl.addEventListener('click', () => {
//     informationSectionEl.innerHTML = '';
    //doesn't allow you to re-select a diff option after clicking
// })