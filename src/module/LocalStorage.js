export class LocalStorage{

    constructor(key) {
        this.key = key;
    }

    get localStorage(){
        const localValue = localStorage.getItem('key');

        let data = JSON.parse(localValue);
        return data;
    }

    set localStorage(value){
        localStorage.setItem(this.key, value);
    }
}