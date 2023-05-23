"use strict";

const mountainSelectorEl = document.getElementById('mountainSelector');
const mountainInfoDiv = document.getElementById('mountainInfo');
const mountainImagesDiv = document.getElementById('mountainImages');

mountainsArray.forEach((mountain) => {
    const mountainDropdown = new Option(mountain.name, mountain.name);
    mountainSelectorEl.appendChild(mountainDropdown)
});

mountainSelectorEl.addEventListener('change', () => {
    mountainInfoDiv.innerHTML = '';
    mountainImagesDiv.innerHTML = '';
    
    const selectedMountain = mountainSelectorEl.value;

    const displayMountainInfo = mountainsArray.filter((mountain) => mountain.name === selectedMountain);

    displayMountainInfo.forEach((mountain) => {
        const card = document.createElement('div');
        card.classList.add('card-body');

        const mountainContent = `
        <div class="card mt-4">
            <div class="card-header">
            <h5 class="mb-0">
            ${mountain.name} | Effort: ${mountain.effort}
            </h5>
        </div>

        <div class="card-body py-2">
        <p>${mountain.desc}</p>
        <p>Elevation: ${mountain.elevation}</p>
        <p>Coordinates: ${mountain.coords.lat}, ${mountain.coords.lng}</p>
        </div>
        `;
        mountainInfoDiv.innerHTML += mountainContent;

        const imgEl = document.createElement('img');
        imgEl.src = `./images/${mountain.img}`;
        imgEl.alt = mountain.name;
        
        mountainImagesDiv.appendChild(imgEl);
    })
    console.log(displayMountainInfo)
})