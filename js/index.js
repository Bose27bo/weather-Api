const searchInput = document.getElementById('searchInput')
// card 1
const dayNmae = document.getElementById('dayNmae');
const dayNumber = document.getElementById('dayNumber');
const dayMonth = document.getElementById('dayMonth');
const locationName = document.getElementById('locationName');
const todayTemp = document.getElementById('todayTemp');
const todaypicIcon = document.getElementById('todaypicIcon');
const todayText = document.getElementById('todayText');

// card 2
const nextDayName = document.getElementById('nextDayName');
const nextDayPicIcon = document.getElementById('nextDayPicIcon');
const nextDayHighTemp = document.getElementById('nextDayHighTemp');
const nextDayLowTemp = document.getElementById('nextDayLowTemp');
const nextDayText = document.getElementById('nextDayText');

// card 3
const afterTomorrowName = document.getElementById('afterTomorrowName');
const afterTomorrowPicIcon = document.getElementById('afterTomorrowPicIcon');
const afterTomorrowHighTemp = document.getElementById('afterTomorrowHighTemp');
const afterTomorrowLowTemp = document.getElementById('afterTomorrowLowTemp');
const afterTomorrowText = document.getElementById('afterTomorrowText');


getWeather();
async function getWeather(weather = 'cairo'){
    try{
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${weather}&days=3&key=b4fc6d8f0c6a4e13a1d113143240712`);
        let data = await response.json();
        // console.log(data);
        displayAllData(data);
    }catch(err){
        console.log(err);
        console.log("errrr");
        // alert('not found')
        
    }finally{
        console.log('done');
        
    };  
};

function displayAllData(data){
    //card 1
    let todayData = data.current.last_updated;
    let myDateName = new Date(todayData);
    let todayName = myDateName.toLocaleString('en-us' , {weekday:'long'});
    dayNmae.innerHTML = todayName;

    let todaymonth = myDateName.toLocaleString('en-us' , {month: 'long'});
    let todayDay = myDateName.getDate();
    dayNumber.innerHTML = todayDay;
    dayMonth.innerHTML = todaymonth;

    locationName.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;

    let todayIcon = data.current.condition.icon;
    let todaysrc = `https:${todayIcon}`
    todaypicIcon.setAttribute('src', todaysrc);

    todayText.innerHTML = data.current.condition.text;


    //card 2
    let tomorrowData = data.forecast.forecastday[1];
    let myTomorrowdate = new Date(tomorrowData.date);
    let tomorrowName = myTomorrowdate.toLocaleString('en-us' , {weekday:'long'});
    nextDayName.innerHTML = tomorrowName;

    let tomorowoIcon = tomorrowData.day.condition.icon;
    let tomorrowsrc = `https:${tomorowoIcon}`
    nextDayPicIcon.setAttribute('src', tomorrowsrc);

    nextDayHighTemp.innerHTML = tomorrowData.day.maxtemp_c;
    nextDayLowTemp.innerHTML = tomorrowData.day.mintemp_c;

    nextDayText.innerHTML = tomorrowData.day.condition.text; 


    //card 3
    let nextTomorowData = data.forecast.forecastday[2];
    let mynextTomorrowdate = new Date(nextTomorowData.date);
    let nextTomorrowName = mynextTomorrowdate.toLocaleString('en-us' , {weekday:'long'});
    afterTomorrowName.innerHTML = nextTomorrowName;

    let nextTomorrowIcon = nextTomorowData.day.condition.icon;
    let nextTomorrowsrc = `https:${nextTomorrowIcon}`
    afterTomorrowPicIcon.setAttribute('src', nextTomorrowsrc);

    afterTomorrowHighTemp.innerHTML = nextTomorowData.day.maxtemp_c;
    afterTomorrowLowTemp.innerHTML = nextTomorowData.day.mintemp_c;

    afterTomorrowText.innerHTML = nextTomorowData.day.condition.text;  
};

searchInput.addEventListener('input',function(){
    // let inputValue = e.target.value;
    getWeather(searchInput.value);
});

