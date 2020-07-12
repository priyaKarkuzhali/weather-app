const cityForm = document.querySelector('form');
const card = document.querySelector('#card');
const details = document.querySelector('.details');
const time = document.querySelector("#time");
const icon = document.querySelector('.icons img');
const samecities = document.querySelector('.autocomplete');
const submit = document.getElementById("submit")
let locationKey= null;
const forecastCard = document.querySelector('#forecastCard');
const forecastDetails = document.querySelector('.row');
const forecastTime = document.querySelector("#forecastTime");
const forecastIcon = document.querySelector('.forecast img');

function autocomplete(inp, arr) {
    console.log(arr[1].LocalizedName)
    /*the autocomplete function takes two arguments,
    the text field elent and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].LocalizedName.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].LocalizedName.substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].LocalizedName.substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i].LocalizedName + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

// updating 12 hours forecast to the UI
updateForecastUI = (forecastData) =>{
  forecastDetails.innerHTML='';
// update daytime with UI
console.log(forecastData);
console.log(forecastData[1].Temperature.Value)
let timeSrc = null;
  for (let i=0;i<forecastData.length;i++){
    if(forecastData[i].IsDaylight)
      {  
            timeSrc = 'img/day.png';

      }         
    else{
          timeSrc = 'img/night.png';
      }
//forecastTime.setAttribute('src',timeSrc);
let dateTime = '';
let date='';
for(let d=5;d<=9;d++){
  date+=forecastData[i].DateTime[d];
}
for (let t=11;t<=18;t++){
 dateTime+=forecastData[i].DateTime[t];
}
console.log(dateTime)
  forecastDetails.innerHTML += `
  <div class="column">
                <div id="forecastCard"  class="card">
                    <img src=${timeSrc} id ="forecastTime" class = "time card-img-top">
                
                <div class=" forecast icon bg-light mx-auto text-centre ">
                    <!--icon-->
                    <img src="img/icons/${forecastData[i].WeatherIcon}.svg" alt="">
        
                </div>
                <div class="text-muted text-centre text-uppercase forecastDetails ">
                  <h5 class="p-3">${date}</h5>
                  <h5 class="p-3">${dateTime}</h5>
                  <div class="p-3">${forecastData[i].IconPhrase}</div>
                  <div class="display-5 my-3">
                  <span> Feels Like ${forecastData[i].RealFeelTemperature.Value}</span>
                  <span>&deg;F</span>
                </div>
                  <div class="display-5 my-2">
                    <span>Temperature is ${forecastData[i].Temperature.Value}</span>
                    <span>&deg;F</span>
                  </div>
                </div>
            </div>
            </div>          `;


//remove display:none if present



};
}
// getting data from the request 

const updateForecast = (locationKey)=>{
  getForecast(locationKey)
  .then(forecastData=>updateForecastUI(forecastData))
  .catch(err=>console.log(err));
}






// update current weather to UI
const updateUI = (data) => {
    console.log(data);
    console.log(data.cityDets.Key);
    let locationKey=data.cityDets.Key;
   // const cityDets = data.cityDets;
    //const weatherDets = data.weatherDets;
    // destructure properties ---->const name should be same as pproperty name
     const {cityDets,weatherDets} = data;
    // update UI with details
    details.innerHTML = `
          <h5 class="p-3">${cityDets.EnglishName}</h5>
          <div class="p-3">${weatherDets.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${weatherDets.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
          </div>            
    `;
     // update icon with UI
     const iconSrc = `img/icons/${weatherDets.WeatherIcon}.svg`;
     icon.setAttribute('src', iconSrc);

    // update daytime with UI

    let timeSrc = null;
    if(weatherDets.IsDayTime)
    {
        timeSrc = 'img/day.png';

    }else{
         timeSrc = 'img/night.png';
    }
    time.setAttribute('src',timeSrc);

    //remove display:none if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

    updateForecast(locationKey);

};

const updateCity =async (city)=>{
    const cityDets = await getCity(city);
    const weatherDets = await getWeather(cityDets.Key);
      return {
         cityDets :  cityDets ,
         weatherDets : weatherDets
    };
};
//update the input bar with autocomplete search


//autocompletesearch
cityForm.addEventListener('keyup',e=>{
    //preventdefault action
   // console.log(1);
    // get city first letter
    const cityletter = cityForm.city.value.trim();
    console.log(cityletter);
    //autocomplete search
    autocom(cityletter).then(data1=>autocomplete(document.getElementById("myInput"),data1))
    .catch(err=>console.log(err));
});
submit.addEventListener('click',e=>{
    //prevent default action
    e.preventDefault();
   
    // get city name
    const city = cityForm.city.value.trim();
    console.log('update',city);
    cityForm.reset();
    // update ui with new city
    updateCity(city).then(data=> updateUI(data))
    .catch(err=>console.log(err)); 
    localStorage.setItem('city',city);

});
   if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data=>updateUI(data))
    .catch(err=>console.log(err));
   }
//console.log(locationKey,'outside');