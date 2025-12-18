// src/index.js
import "./styles.css";
import { APIKEY } from "../apikey";

const location = document.getElementById("location");
const submitFormBtn = document.getElementById("submitForm");

const content = document.getElementById("content");
const cityDisplay = document.getElementById("city");
const coordinatesDisplay = document.getElementById("coordinates");
const tempDisplay = document.getElementById("temp");
const conditionsDisplay = document.getElementById("conditions");

submitFormBtn.addEventListener("click", (event) => {
    event.preventDefault();
    callAsync(location.value);
});

async function callAsync(location) {
    let weatherInfo = await locationToAPI(location);
    // Display information in html
    cityDisplay.innerHTML = location;
    coordinatesDisplay.innerHTML = `${weatherInfo.latitude}, ${weatherInfo.longitude}`;
    tempDisplay.innerHTML = `Current Temperature: ${weatherInfo.temp}, Feels Like: ${weatherInfo.feelslike}`;
    conditionsDisplay.innerHTML = `Conditions: ${weatherInfo.conditions}, Precipitation: ${weatherInfo.precip}`;
}

async function locationToAPI(location) {
    let url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
    url += location + "?key=" + APIKEY;
    const response = await fetch(url);
    const JSONdata = await response.json();
    return processJSON(JSONdata);
}

function processJSON(JSONdata) {
    let weatherInfo = {
        conditions: JSONdata.currentConditions.conditions,
        feelslike: JSONdata.currentConditions.feelslike,
        precip: JSONdata.currentConditions.precip,
        temp: JSONdata.currentConditions.temp,
        latitude: JSONdata.latitude,
        longitude: JSONdata.longitude
    }
    return weatherInfo;
}