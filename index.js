//fetch weather api
const weatherByCity ={
  search: function(cityName, days){
    return fetch(`https://api.apixu.com/v1/forecast.json?key=3df685222c92419bb0f00001182102&q=${cityName}&days=${days}`)

    .then(response => response.json())
    //.then(data => data.current.map(data => data))
    .then(data => data)
    .catch(err => console.log(err));
  }
};
//get button
const searchButtonCity = document.getElementById('searchBtnCity');
//city button event listener
searchButtonCity.addEventListener('click', e =>{
  //get city city name
  const cityName = cityInput.value;
  //days value from form
  let days = document.getElementById('foreCastDays').value;
  //check input
  if(cityName == ''){
    alertMessage('Please enter a city', 'alert-danger text-center');
  }
  cityName.value='';
  //get weather data
  weatherByCity.search(cityName, days)
  .then(response => {
    // console.log(response);
    //current weather marquee
    let currentWeather = `<div class="alert alert-secondary" role="alert"><p id="currentWeatherText">Current Weather for ${response.location.name},
    ${response.location.region} <img src="${response.current.condition.icon}">
    ${response.current.condition.text} skies, temperature: ${response.current.temp_f}&#176F,
  Local Time: ${localTime(response.location.localtime)} </p></div>`;
    document.getElementById('scrollCurrentWeather').innerHTML = currentWeather;

    //date formatting
    function getDate(date){
      date = moment(date).format('ddd '+'ll');
      console.log(date);
      return date;
    };
    function localTime(time){
      currentTime = moment(time).format('HH:mm');
      return currentTime;
    };
    //start div for cards
    let output = `<div class="row mx-auto">`;
    //for each loop, fill in weather for each
    response.forecast.forecastday.forEach(post => {

      output += `

      <div class="card bg-light border-primary mx-3 mb-3" style="width: 13rem;">
        <img src="${post.day.condition.icon}" style="width:5em;height:5em;margin-left:3em;margin-top:.8em;">
          <div class="card-body">
            <h5 class="card-title">${getDate(post.date)}</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item list-group-item-action list-group-item-secondary">${post.day.condition.text}</li>
              <li class="list-group-item list-group-item-action list-group-item-secondary">High: ${post.day.maxtemp_f}&#176 F</li>
              <li class="list-group-item list-group-item-action list-group-item-secondary">Low: ${post.day.mintemp_f}&#176 F</li>
            </ul>
          </div>
        </div>
      `;
    });
    output += `</div>`;
    document.getElementById('results').innerHTML = output;
  });

  e.preventDefault();
});

//alert message function
function alertMessage(message, className){

    // Create div
    const div = document.createElement('div');
    // Add class
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.getElementById('formContainer');
    // Get form
    const formSection = document.getElementById('formdiv');
    // Insert alert
    container.insertBefore(div, formSection);
    // Timeout after 3 sec
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 3000);
  };
