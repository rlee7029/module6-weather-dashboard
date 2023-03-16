
let city="";
let searchCity = $("#search-city");
let searchButton = $("#search-button");
let clearButton = $("#clear-history");
let currentCity = $("#current-city");
let currentTemperature = $("#temperature");
let currentHumidty= $("#humidity");
let currentWSpeed=$("#wind-speed");



let APIKey="78dd7399d393d2434ca694be6dd8192b";

function displayWeather(event){
    event.preventDefault();
    if(searchCity.val().trim()!==""){
        city=searchCity.val().trim();
        currentWeather(city);
    }
}

function currentWeather(city){
    const queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url:queryURL,
        method:"GET",
    }).then(function(response){
        console.log(response);
        const tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(currentTemperature).html((tempF).toFixed(2)+"&#8457");
        $(currentHumidty).html(response.main.humidity+"%");
        const ws=response.wind.speed;
        const windsmph=(ws*2.237).toFixed(1);
        $(currentWSpeed).html(windsmph+"MPH");
        forecast(response.id);
        if(response.cod==0){
            sCity=JSON.parse(localStorage.getItem("cityname"));
            console.log(sCity);
        }
    });
}


function index(ln,lt){
   const uvqURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ APIKey+"&lat="+lt+"&lon="+ln;
    }


function forecast(cityid){
    const dayover= false;
    const queryforcastURL="https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+APIKey;
    $.ajax({
        url:queryforcastURL,
        method:"GET"
    }).then(function(response){
        
        for (i=0;i<5;i++){
            const date= new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
            const tempK= response.list[((i+1)*8)-1].main.temp;
            const tempF=(((tempK-273.5)*1.80)+32).toFixed(2);
            const humidity= response.list[((i+1)*8)-1].main.humidity;
        
            $("#5DaysDate"+i).html(date);
            $("#5DaysTemp"+i).html(tempF+"&#8457");
            $("#5DaysHumidity"+i).html(humidity+"%");
        }
    });
}


function clearHistory(event){
    event.preventDefault();
    sCity=[];
    localStorage.removeItem("cityname");
    document.location.reload();

}

$("#search-button").on("click",displayWeather);
$("#clear-history").on("click",clearHistory);


















