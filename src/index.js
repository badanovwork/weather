import {HttpRequester} from "./module/HttpRequester";
import {LocalStorage} from "./module/LocalStorage";
import {Render} from "./module/Render";
import {CityList} from "./module/CityList";


window.onload = function () {

    let rainyDay = new RainyDay({
        image: 'background'
    });


    let req  = new HttpRequester;
    let render = new Render;
    let list = new CityList;
    let storage = new LocalStorage('key');

    const geolocation = ymaps.geolocation.city;
    const key = `d7b17c7965a90a1eff53c849143986bc`;

    if (localStorage.getItem('key') !== null) {
        let temp = storage.localStorage;
        render.renderer(temp);
        new SimpleBar(document.getElementById('weather-hours'), {});
        new SimpleBar(document.getElementById('weather-week'), {});
        console.log(`из localstorage`);
    }else{
        req.httpGet(`http://api.openweathermap.org/data/2.5/forecast?q=${geolocation}&units=metric&APPID=${key}`)
            .then(
                response =>{
                    let data = JSON.parse(response);
                    render.renderer(data);
                    storage.localStorage = response;
                    storage.localStorage;
                    new SimpleBar(document.getElementById('weather-hours'), {});
                    new SimpleBar(document.getElementById('weather-week'), {});
                    console.log(`из запроса`);
                },
                error => console.log(`Rejected: ${error}`)
            );
    }

    /*let reset = document.querySelector(".reboot");
    reset.addEventListener('click', function() {
        rainyDay.pause();
    });*/

    new SimpleBar(document.getElementById('sidebar'), {});

    req.httpGet(`./city.list.min.json`)
        .then(
            response =>{
                list.renderer(response);
            },
            error => console.log(`Rejected: ${error}`)
        );

};