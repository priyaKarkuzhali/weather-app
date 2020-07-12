const key = 'JmOpzCCKrupaANLa2xTGH73ZG3pBiAbx';
//const key = 'aIJKv1gA4HYmRa7cv3a6vUItGnwIUKwL';
// get weather information

const getWeather = async (id)=> {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;
    const response = await fetch(base+query);
    const data = await response.json();
    return data[0];

};

// get city information
const getCity = async (city) =>{

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;
    const response = await fetch(base+query);
    const data = await response.json();
    return data[0];

} ;

// Autocomplete search
const autocom = async (letter) =>{

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
    const query = `?apikey=${key}&q=${letter}`;
    const response = await fetch(base+query);
    const autocomdata = await response.json();
    return autocomdata;
}
//autocom('k').then(data=>console.log(data)).catch(err=>console.log(err));
//to check the data is correct or not
/*
getCity('manchester').then(data=>{
    return getWeather(data.Key);
}).then(data=>console.log(data))
.catch(err=>console.log(err));
*/
const getForecast = async (locationKey) =>{

    const base = 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/';
    const query = `${locationKey}?details=true&apikey=${key}`;
    const response = await fetch(base+query);
    const data = await response.json();
    return data;

} ;