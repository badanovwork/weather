let moment = require('moment');

export class Render{

    renderer(data){

        let arrAllWeather = [];
        let arrWeekWeather = [];

        let tempArr = [];
        let tempArrMax = [];
        let tempArrMin = [];

        let ind = 0;
        let reall;
        let arrDays = [];
        let weatherIcon = [];

        function toArray(data){ return [].slice.call(data) }

        toArray(data.list).forEach((value, index) => {
            //console.log(value);
            let cityName = data.city.name;
            let descriptionWeatherToday = data.list[0].weather[0].description;
            let tempToday = data.list[0].main.temp;

            let weatherNow =`
                    <h1 class="weather-now_title">${cityName}</h1>
                    <p>${descriptionWeatherToday}</p>
                    <div class="weather-now_degrees">${Math.round(tempToday)}°</div>
                    <p>${moment().format('dddd')} today</p>
                    `;
            document.getElementById("weather-now").innerHTML = weatherNow;

            let daysFromApi = `${(value.dt_txt.charAt(8) + value.dt_txt.charAt(9))}.${(value.dt_txt.charAt(5) + value.dt_txt.charAt(6))}`;
            let timeAllDays = `${(value.dt_txt.charAt(11) + value.dt_txt.charAt(12))}:${(value.dt_txt.charAt(14) + value.dt_txt.charAt(15))}`;
            let tempAllDays  = Math.round(data.list[index].main.temp);
            let weatherHours= `
                    <div>
                        <p>${daysFromApi}</p>
                        <img src="/img/${data.list[index].weather[0].icon}.svg"/>
                        <div>${tempAllDays}°</div>
                        <p>${timeAllDays}</p>
                    </div>`;
            arrAllWeather.push(weatherHours);

            let arrToStr = arrAllWeather.join('');
            document.getElementById("weather-hours").innerHTML = arrToStr;

            let real = moment().add(ind, 'days').format('DD.MM');
            reall = moment().add(ind, 'days').format('dddd');

            if(daysFromApi === real){
                tempArr.push( Math.round(value.main.temp));
             }else {
                arrDays.push(reall);
                ind++;
                let maxTemp = Math.max.apply(null, tempArr);
                tempArrMax.push(maxTemp);
                let minTemp = Math.min.apply(null, tempArr);
                tempArrMin.push(minTemp);
                tempArr = [];
                tempArr.push( Math.round(value.main.temp));
            }

            if(timeAllDays === `15:00`){
                weatherIcon.push(value.weather[0].icon)
            }
        });

        arrDays.push(reall);
        tempArrMax.push(Math.max.apply(null, tempArr));
        tempArrMin.push(Math.min.apply(null, tempArr));

        arrDays.slice(1).forEach(function (value,index) {

            let weatherWeek= `
                    <div class="weather-week-box">
                       <p>${value}</p>
                       <img src="/img/${weatherIcon[index]}.svg"/>
                       <p>${tempArrMax[index+1]}</p>
                       <p>${tempArrMin[index+1]}</p>
                    </div>`;

            arrWeekWeather.push(weatherWeek);
            let arrToStr2 = arrWeekWeather.join('');
            document.getElementById("weather-week").innerHTML = arrToStr2;
        });

    }
}