
var apiKey = "4e5dbe7db2b5e9c8b47fa40b691443d5"
var currentWeather = "https://api.openweathermap.org/data/2.5/weather?appid="
var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?4e5dbe7db2b5e9c8b47fa40b691443d5q={city name},{country code}"
var pastSearch = JSON.parse(localStorage.getItem("searchedItems")) || [];


$(document).ready(function() {
  $("#searchPlace-input").on("click", function(event) {
    var userInput = $("#differentCity").val()
    console.log(userInput)
    getWeather(userInput)
  
  })
})

function getWeather(cityLocation) {
  var apiURL = ""

  if (cityLocation !== "") {
    apiURL = currentWeather + apiKey + "&q=" + cityLocation
  } else {
    apiURL = currentWeather + apiKey + "&q=" + city
  }

  $.ajax({
    url: apiURL,
    method: "GET"
  }).then(function(response) {
    console.log(response)
    var nowTemp = response.main.temp
    nowTemp = Math.floor(nowTemp)
    city = response.name
    fiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`

     $.ajax({
      url: fiveDay,
      method: "GET"
    }).then(function(response) {
      console.log(response)

      var aveTemp,count,results = 0
      var dayBefore = ""
      dayBefore = moment().format("MM/DD/YYYY")
      for (let index = 0; index < response.list.length; index++) {
        var currentDate = moment(response.list[index].dt, "X").format(
          "MM/DD/YYYY"
        )
        var temp = response.list[index].main.temp
        temp = Math.floor(temp)
        console.log(currentDate)
        console.log(temp)

        if (dayBefore === currentDate) {
          aveTemp = aveTemp + temp
          count++
          dayBefore = currentDate
        } else {
          results = aveTemp / count
          results = Math.floor(results)
          console.log("results:", results)

  


         
        }
      }
    })
  })
}