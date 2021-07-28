/* Global Variables */
const geoNameApi_key = 'sanskriti';
const weatherbitApi_key = '1613a45182184f6789fb10b35db62e04';
const pixabayApi_key = '22470635-1ba3c76934d3d6f03ec806aaf';

const performAction = async (e) => {
    e.preventDefault();
    const query = document.getElementById('city').value;
    const warning = document.querySelector('.warning');
    const departureDate = document.querySelector('.depart').value;
    const returnDate = document.querySelector('.return').value; 

    let d = new Date();
    const daysTilldepart = Math.floor(
    (new Date(departureDate).getTime() - d.getTime()) / (1000 * 3600 * 24) );

    const lengthOfTrip = Math.ceil(
    (new Date(returnDate).getTime() - new Date(departureDate).getTime()) / (1000 * 3600 * 24));  
     
     document.querySelector('.tripInfo').innerHTML = `Your trip is ${daysTilldepart} days away and will be for a period of ${lengthOfTrip} days`;

            if (!query) {
                warning.classList.add("show");
                warning.innerHTML = "Please enter a City";
            }else{
            console.log(`city name: ${query}`);
            getDatafromGeonames(query)
                .then((data) => {
                    return postData('http://localhost:8081/geonames', { 
                        latitude: data.geonames[0].lat,
                        longitude: data.geonames[0].lng,
                        country: data.geonames[0].countryName,
                        city: data.geonames[0].name,
                    })
                    .then((response) =>{
                        let lat = response[response.length - 1].latitude;
                        let lng = response[response.length - 1].longitude;
                        return { lat, lng };
                 })
                .then(({lat, lng}) => {
                    return getDatafromWeatherbit(lat, lng)
                })
                .then((weatherData) => {
                    return postData('http://localhost:8081/weatherbit', {
                        high: weatherData.data[0].high_temp,
                        low: weatherData.data[0].low_temp,
                        description: weatherData.data[0].weather.description,
                    })
                 })
              })
              .then(() => {
                  return getDatafromPixabay(query)
              })
              .then((imagedata) => {
                  return postData('http://localhost:8081/pixabay', {
                        image: imagedata.hits[0].webformatURL,
                  })
              })
              .then(
                  updateUI()
              )
              .then(
                  document.getElementById('generate').addEventListener('click', changeUI)
              )
              warning.classList.remove('show');
            }
        };
    
//get data from geonames
const getDatafromGeonames = async (query) => {
    const url = `http://api.geonames.org/searchJSON?q=${query}&maxRows=1&username=${geoNameApi_key}`
    const response = await fetch(url)
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error, 'Geonames error');
    }
}

//get weather data
const getDatafromWeatherbit  = async (lat, lng) => {
    const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${weatherbitApi_key}&lat=${lat}&lon=${lng}`;
    const res = await fetch(url)
    try {
        const data = await res.json();
        return data;
    } catch (error){
        console.log(error, 'weatherbit error');
    }
};

//get image from pixabay
const getDatafromPixabay  = async (query) => {
    const url = `https://pixabay.com/api/?q=${query}&key=${pixabayApi_key}`;
    const res = await fetch(url)
    try {
        const data = await res.json();
        return data;
    } catch (error){
        console.log(error, 'weatherbit error');
    }
};

//Async POST
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

const updateUI = async () => {
    const request = await fetch('http://localhost:8081/data');
    try {
        const allData = await request.json();
        console.log(allData);
        document.querySelector('.place').innerHTML = `Your beautiful destination is ${allData[allData.length - 5].city},
        ${allData[allData.length - 5].country}.`;
        document.querySelector('.tripDetails').innerHTML = `The Weather Forecast: <br> ${allData[allData.length - 2].description} <br>
                                               High: ${allData[allData.length - 2].high} °C 
                                               Low: ${allData[allData.length - 2].low} °C`;
          document.querySelector('.image').src = allData[allData.length - 1].image;
    } catch (error) {
        console.log("error", error);
    }
}

const changeUI = () => {
    document.getElementById('city').value = '';
    document.getElementById('dep').value = '';
    document.getElementById('ret').value = ''
}

document.addEventListener("DOMContentLoaded", () => {
    const button_submit = document.getElementById("generate");
    button_submit.addEventListener("click", performAction);
  });
//document.getElementById('generate').addEventListener('click', performAction);

export{getDatafromGeonames}
export{getDatafromWeatherbit}
export{getDatafromPixabay}
export{performAction}
export{postData}
export{updateUI}
export{changeUI}
