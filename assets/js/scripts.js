var apikey="791b6fcc8fd8a9bee714ad60b0b4cef7"

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

function gocode(data) {
    var url=`http://api.openweathermap.org/geo/1.0/direct?q=${data}&limit=1&appid=${apikey}`
    fetch (url) .then (function(response){
        if (response.ok){
        response.json().then(function(data){
            getweather(data)
        })
    }else{
        console.log("error")
    }})
    .catch(function(error){
        alert ("could not connect")
    })

}
function getweather(data) {
    displaycity(data)
    var url=`https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${apikey}`
    fetch (url) .then (function(response){
        if (response.ok){
        response.json().then(function(data){
           
            currentweather(data)
            forecastweather(data)
        })
    }else{
        console.log("error")
    }})
    .catch(function(error){
        alert ("could not connect")
    })

}
gocode("toronto")

function currentweather(data){

    var tempTitle=$('<span>')
    .text('temperature')
    var temDisplay=$('<span>')
    .text(`${data.current.temp} °C`)
    var tempDiv=$('<div>')
    .addClass('line')
    .append(tempTitle)
    .append(temDisplay)

    var windTitle=$('<span>')
    .text('wind')
    var windDisplay=$('<span>')
    .text(`${data.current.wind_speed} km/h`)
    var windDiv=$('<div>')
    .addClass('line')
    .append(windTitle)
    .append(windDisplay)

    var humidityTitle=$('<span>')
    .text('Humidity')
    var humidityDisplay=$('<span>')
    .text(`${data.current.humidity} %`)
    var humidityDiv=$('<div>')
    .addClass('line')
    .append(humidityTitle)
    .append(humidityDisplay)

    var uvTitle=$('<span>')
    .text('UV index')
    var uvDisplay=$('<span>')
    .text(data.current.uvi)
    var uvDiv=$('<div>')
    .addClass('line')
    .append(uvTitle)
    .append(uvDisplay)

    var icon=$('<img>')
        .attr('src',`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`)
    var iconDiv = $('<div>')
        .addClass('line')
        .append(icon)
    var currentText = $('#current')
        .find('h2')
        .text()

    $("#current")
    .append(iconDiv)
    .append(tempDiv)
    .append(windDiv)
    .append(humidityDiv)
    .append(uvDiv)
    .find('h2')
    .text(`${currentText} - ${date( data.current.dt )}`)

    
}

function displaycity (data){
    
    var title=$('<h2>')
    .text(data[0].name)
    $('#current')
    .html('')
    .append(title)
}

function date(date){
   
    var date = new Date(date*1000);
    var year = date.getFullYear()
    var month = date.getMonth() + 1;
    var day  = date.getDate();

    var string=`${month}/${day}/${year}`
    return string
}

function forecastweather(data){
    console.log(data)
    $('.forecast-cards')
    .html('')
    for(var i=0; i<5; i++){
        
    
    var tempTitle=$('<span>')
    .text('temperature')
    var temDisplay=$('<span>')
    .text(`${data.daily[i+1].temp.max} °C`)
    var tempDiv=$('<div>')
    .addClass('line')
    .append(tempTitle)
    .append(temDisplay)

   

    var humidityTitle=$('<span>')
    .text('Humidity')
    var humidityDisplay=$('<span>')
    .text(`${data.daily[i+1].humidity} %`)
    var humidityDiv=$('<div>')
    .addClass('line')
    .append(humidityTitle)
    .append(humidityDisplay)

    
    var icon=$('<img>')
        .attr('src',`https://openweathermap.org/img/wn/${data.daily[i+1].weather[0].icon}@2x.png`)
    var iconDiv = $('<div>')
        .addClass('line')
        .append(icon)

    var dateH3 = $('<h3>')
        .text(`${ date( data.daily[i+1].dt)}`)
    var cardDiv = $('<div>')
        .addClass('card')
        .append(dateH3)
        .append(iconDiv)
        .append(tempDiv)
        .append(humidityDiv)


    $(".forecast-cards")
    .append(cardDiv)
      
    
    }


}