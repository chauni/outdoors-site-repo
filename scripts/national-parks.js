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
    } if (selectedLocation == 'Delaware') {
        alert("No parks found. See Pennsylvania")
    }

    const nationalParkLocation = nationalParksArray.filter((nationalPark) => nationalPark.State === selectedLocation)

    const tbody = informationTable.querySelector('tbody');
    tbody.innerHTML = '';

    nationalParkLocation.forEach((selPark) => {
        buildNationalParkRow(tbody, selPark)
    })

    const tableRows = document.querySelectorAll('tr:nth-child(even)');
    tableRows.forEach((tablerow) => {
     tablerow.classList.add('hide')
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

    const tableRows = document.querySelectorAll('tr:nth-child(even)');
    tableRows.forEach((tablerow) => {
     tablerow.classList.add('hide')
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
        const selectedRow = document.querySelectorAll('table tr:nth-child(even)');
        
        selectedRow.forEach((row) => {
            if (row === row2) {

            row.classList.toggle('hide');
            }
        });
    });

    // show/hide specific table rows: https://stackoverflow.com/questions/73434657/show-hide-html-table-rows-using-javascript && ben
    

    row.append(showMoreBtn)

    const row2 = table.insertRow();

    showMore(park, row2);

        

    if (park.Phone == 0) {
        phoneNumberCell.innerHTML = "No phone number listed"
    } if (park.Address == 0) {
        addressCell.innerHTML = 'Information unavailable'
    } if (park.ZipCode == 0) {
        addressCell.innerHTML = 'Information unavailable'
    };
}

function showMore(park, row) {
    const mapImg = document.createElement('img');
    mapImg.src = `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/static/pin-s+f44e4c(${park.Longitude},${park.Latitude})/${park.Longitude},${park.Latitude},8.96,0/340x399?access_token=pk.eyJ1IjoiY2hhdW5pIiwiYSI6ImNsaTIxMnBrMzFycWgzZ3A5NHNtNTJvdzIifQ.sqOQKGGQwdAV7uEgqoSlsw`
    mapImg.alt = park.LocationName
    mapImg.style.borderRadius = '10px';

    // static map view api (mapbox): https://docs.mapbox.com/playground/static/

    const showMoreInfoDiv = document.createElement('div');
    showMoreInfoDiv.classList.add('card')
    const content = `
    <div class="card-header">
    <h5>Additional Info</h5>
    </div>

    <div class="card-body">
    <p class="lead">${park.LocationName}
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>

    <p><b>Coordinates:</b> ${park.Location.coordinates}</p>
    <p><b>Website:</b> <a href="${park.Visit || 'No website listed'}">${park.Visit || 'No website found'}</a><p>
    </div>
    `;

    // "how to dynamically create cards in javascript": https://stackoverflow.com/questions/54706080/generating-dynamic-html-cards-from-a-javascript-array

    showMoreInfoDiv.innerHTML += content
    const showMoreDiv = document.createElement('div');
    showMoreDiv.classList.add('container')
   
    const showMoreRow = document.createElement('div');
    showMoreRow.classList.add('row');
    showMoreDiv.appendChild(showMoreRow);
    
    const showMoreCol1 = document.createElement('div');
    showMoreCol1.classList.add('col-md-6','col-xl-4', 'imagesContainer');
    showMoreRow.appendChild(showMoreCol1);

    showMoreCol1.appendChild(mapImg);

    const showMoreCol2 = document.createElement('div');
    showMoreCol2.classList.add('col-md-6','col-xl-8','contentContainer');
    showMoreRow.appendChild(showMoreCol2);

    showMoreCol2.appendChild(showMoreInfoDiv);

    const mapColspan = row.insertCell();
    mapColspan.setAttribute('colspan', '6');
    mapColspan.append(showMoreDiv);
}

clearBtnEl.addEventListener('click', () => {
    const tbody = informationTable.querySelector('tbody');
    tbody.innerHTML = '';

    parkTypeSelectorEl.value = '';
    locationSelectorEl.value = '';
})