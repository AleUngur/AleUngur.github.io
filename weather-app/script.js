const key = '2cd5da4979f6089fd6a424bdb85d11b7';

const select = document.querySelector(".form-select");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const icon = document.querySelector(".icon");
const weather_type = document.querySelector(".weather_type");
const time = document.querySelector(".time");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const atmp = document.querySelector(".atmp");

const kelvinToCelsius = (degrees) => {
    const celsius = degrees - 273.15;
    return celsius.toFixed(1);
}


//functie pt a accesa orasele dorite
const getCities = () => {
  fetch('cities.json', {  
    method: 'GET',
  })
  .then(response => response.json())
    .then(data => {
      data.forEach(city => {
        const option = document.createElement("option");
        option.value = city.id;
        option.text = city.name;

        //Gataia is the default city chosen
        if(city.id == 677581){
          option.setAttribute("selected", true);
        }

        select.appendChild(option);
      });
    })
  .catch((error) => {
    console.log('Error', error);
  });
}

//functie pt a downloada informatia despre vreme cu ajutorul API, orasul default este 'Gataia'
const getWeather = (cityId = 677581) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${key}`, {  //api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2cd5da4979f6089fd6a424bdb85d11b7
  method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    const date = new Date();

    city.innerHTML = data.name;
    temp.innerHTML = kelvinToCelsius(data.main.temp) + '\xB0C';
    icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weather_type.innerHTML = data.weather[0].description;  
    time.innerHTML = `${date.toLocaleTimeString()}, ${date.toLocaleDateString()}`;
    wind.innerHTML = `Wind: ${data.wind.speed} m/s`;
    humidity.innerHTML = `Humidity: ${data.main.humidity} %`;
    atmp.innerHTML = `Pressure: ${data.main.pressure} hpa`;
  })
  .catch((error) => {
  console.log('Error', error);
  });
}

getCities();
getWeather();

//cand alegem alt oras se schimba cityId si se preiau date diferite
select.addEventListener("change", function(e){ 
  const cityId = e.target.value;
  getWeather(cityId);
});

//data (ora) ar trebui sa se schimbe in functie de oras, folosind un alt api sau o formula pt a calcula data si ora in functie de locatia mea