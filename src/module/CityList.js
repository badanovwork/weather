import {Render} from "./Render";
import {HttpRequester} from "./HttpRequester";
import {LocalStorage} from "./LocalStorage";

export class CityList{

    renderer(data){

        let arr = JSON.parse(data);

            arr.forEach(function (value) {
                if(value.country === 'BY'){
                    let newLi = document.createElement('li');
                    list.appendChild(newLi);
                    let newA = document.createElement('a');
                    newA.innerHTML = `${value.name}`;
                    newLi.appendChild(newA);
                    newLi.classList.add('target');
                }
            });
        this.link();
    }

    link (){
        let storage = new LocalStorage('key');
        list.onclick = function(event) {
            let a = event.path[0].innerText;
            reqest(a);
        };
        function reqest(city){
            const key = `d7b17c7965a90a1eff53c849143986bc`;
            let req  = new HttpRequester;
            let render = new Render;
            req.httpGet(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${key}`)
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
    }


}