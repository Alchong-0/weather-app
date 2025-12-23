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
    setLoading();
    callAsync(location.value.trim());
    location.value = "";
});

function setLoading() {
    cityDisplay.innerHTML = "Loading...";
    coordinatesDisplay.innerHTML = "";
    tempDisplay.innerHTML = "";
    conditionsDisplay.innerHTML = "";
}

async function callAsync(location) {
    try {
        let weatherInfo = await locationToAPI(location);
        // Display information in html
        cityDisplay.innerHTML = weatherInfo.address;
        coordinatesDisplay.innerHTML = `${weatherInfo.latitude}, ${weatherInfo.longitude}`;
        tempDisplay.innerHTML = `Current Temperature: ${weatherInfo.temp}°F, Feels Like: ${weatherInfo.feelslike}°F`;
        conditionsDisplay.innerHTML = weatherInfo.conditions;
    } catch(err) {
        cityDisplay.innerHTML = "Location data could not be found.";
    }
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
        conditions: JSONdata.description,
        feelslike: JSONdata.currentConditions.feelslike,
        temp: JSONdata.currentConditions.temp,
        latitude: JSONdata.latitude,
        longitude: JSONdata.longitude,
        address: JSONdata.resolvedAddress
    }
    console.log(JSONdata);
    return weatherInfo;
}