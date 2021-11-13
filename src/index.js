import './css/styles.css';
var debounce = require('lodash.debounce');
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const countryRequest = document.querySelector("#search-box");
countryRequest.addEventListener("input", debounce(handlerInput, DEBOUNCE_DELAY));
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

function handlerInput(event) {
  event.preventDefault();  
  const countryName = countryRequest.value;  
  fetchCountries(countryName).then(renderMarkap)
  .catch(showError)
  // .finally(() => countryRequest.reset());
};
function showError () {
  Notify.failure("Oops, there is no country with that name", {width: "700px"});
}

function renderMarkap(countryUser){
const [{name,capital,population,flags,languages,}] = countryUser;  
  const numberOfCountries = countryUser.length
  
  if (numberOfCountries <= 10 && numberOfCountries >= 2) {
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
    const markup = countryUser.map(country => 
    `<img src="${country.flags.svg}" alt="flags" width="30" height="20" class="countryImg" /
    <p class="countryName">${country.name.official}<p>`).join("");
    countryList.innerHTML = markup;    
    
  } else if (numberOfCountries === 1) {
    countryInfo.innerHTML = "";
    countryList.innerHTML = "";
    const values = Object.values(languages);
          
    countryInfo.innerHTML = `
      <ul class="list">
      <li><img src="${flags.svg}" alt="flags" width="50" height="40" /><span class="countryName">${name.official}<span></li>
      <li class="item">Capital: <span class="itemS">${capital}<span></li>
      <li class="item">Population: <span class="itemS">${population}<span></li>
      <li class="item">Languages: <span class="itemS">${values}<span></li>
    </ul>`
  } else {Notify.info("Too many matches found. Please enter a more specific name.", {width: "700px"})}
} 