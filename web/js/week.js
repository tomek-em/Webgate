class Week {
    constructor(date) {
        this.date = date;
        this.add_form_cont = document.getElementById('event_form_cont');
        
        // event listeners
    }
    
    showDate = function() {
        console.log(this.date);
    } 
    
//    get about() {
//        return `${this._name} ma ${this._age} lat.`;
//    }   
//    set giveName(name) {
//        this._name = name;
//    }
//    
//    hunt = () => {
//        return console.log(`${this._name} is huntung.`);
//    }
}

//let kot = new Cat(2);
//
//kot.giveName = ('Flafik');
//let info = kot.about;   // we do not all kot.about() in case of get and set functions
//
//console.log(info);
//kot.hunt();
//


const weekCalendar = () => {
    let week = new Week(0);
    week.showDate();
}
document.addEventListener('DOMContentLoaded', weekCalendar, false);