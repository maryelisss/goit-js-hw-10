import './css/styles.css';
import API from './fetchCountries.js'

// const _ = require('lodash'); 

const DEBOUNCE_DELAY = 300;

const input = document.querySelector("#search-box");

// input.addEventListener("input", _.debounce(onSearch, DEBOUNCE_DELAY));
input.addEventListener("input", onSearch);

const cardContainer = document.querySelector(".country-info");
const cardList = document.querySelector(".country-list");


function onSearch(e) {
    const contriesName = e.currentTarget.value;
    API.fetchCountries(contriesName).then(searchResult).catch(clearScrin());
}

function searchResult(array) {
    if (array.length === 1) {
        renderCountriesCard(array);
    }
    else if (array.length <= 10 && array.length >= 2) {
        renderCountriesList(array);
    }
    else {
        console.log(`Too many matches found. Please enter a more specific name.`);
    }

} 

function renderCountriesList(countriesArray) {
        const murkup = countriesArray.map(({flags, name}) => {
            return `<li class="country-item">
            <img class="country-flag country-flag__small" src="${flags.svg}" alt="${flags.alt}"/>
            <p>${name}</p>
            </li>`
            }).join("");
            cardList.innerHTML = murkup;
}

function renderCountriesCard(country) {
    const murkup = country.map(({ flags, name, capital, population, languages }) => {
            const languageArray = [];
            for (const language of languages) {
                languageArray.push(language.name)
            };
            return `<div>
        <img class="country-flag" width=200 src="${flags.svg}" alt="${flags.alt}">
        <h1>${name}</h1>
        </div>
        <div><p><b>Capital:</b> ${capital}</p>
        <p><b>Population:</b> ${population}</p>
        <p><b>Languages:</b> ${languageArray.join(', ')}</p>
        </div>`
        }).join("");
        cardContainer.innerHTML = murkup;
};

function clearScrin() {
    cardList.innerHTML = ``;
    cardContainer.innerHTML = ``;
    console.log(`Oops, there is no country with that name`)
}