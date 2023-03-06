import debounce from 'lodash.debounce';
import './css/styles.css';
import API from './fetchCountries.js'
import Notiflix, { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector("#search-box");
const cardContainer = document.querySelector(".country-info");
const cardList = document.querySelector(".country-list");

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    const countriesName = e.target.value.trim();
    if (countriesName !== '') {
        API.fetchCountries(countriesName).then(searchResult).catch(() => {
            Notify.warning(`Oops, there is no country with that name`);
            cardList.innerHTML = ``;
            cardContainer.innerHTML = ``;
        });
    }
    else {cardList.innerHTML = ``;
    cardContainer.innerHTML = ``;}
}

function searchResult(array) {
    if (array.length === 1) {
        renderCountriesCard(array);
    }
    else if (array.length <= 10 && array.length >= 2) {
        renderCountriesList(array);
    }
    else {
        Notify.info(`Too many matches found. Please enter a more specific name.`);
    }
} 

function renderCountriesList(countriesArray) {
        cardContainer.innerHTML = '';
        const murkup = countriesArray.map(({flags, name}) => {
            return `<li class="country-item">
            <img class="country-flag country-flag__small" src="${flags.svg}" alt="${flags.alt}"/>
            <p>${name}</p>
            </li>`
            }).join("");
            cardList.innerHTML = murkup;
}

function renderCountriesCard(country) {
    cardList.innerHTML = '';
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



