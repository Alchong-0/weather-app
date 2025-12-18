// src/index.js
import "./styles.css";
import { APIKEY } from "../apikey";

const location = document.getElementById("location");
const submitFormBtn = document.getElementById("submitForm");

submitFormBtn.addEventListener("click", (event) => {
    event.preventDefault();
    callAsync(location.value);
});

async function callAsync(location) {
    console.log(await locationToAPI(location));
    // Display information in html
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