// class event every event is a new instance of this class    
class Event {
    constructor(id, date, day, title, body, type, done) {
        this.id = id;
        this.date = date;
        this.day = day;
        this.title = title;
        this.body = id;
        this.type = type;
        this.done = done;
    }
} 


class Week {
    constructor(date) {
        this.days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        this.customDate = date;
        this.weekIndex = 0;
        this.weekDates = []; 
        this.events = [];
        
        // get first day of this week
        this.setCalendar();   
        this.getWeekEvents();
    }
    
    // get dates
    setCalendar() {
        let date = new Date();
        if (this.customDate != 0) {
            date = new Date('February 13, 2020 11:13:00');
        }
        date.setDate(date.getDate() + this.weekIndex);
        
        let day = date.getDay();
        if (day == 0) day = 7;
        
        // get first day of this week
        date.setDate(date.getDate() - day + 1);
        this.monday = date;
        
        // get date for all days in this week
        for (let i = 0; i <= 6; i++) {
            this.weekDates[i] = this.getCurrentDate(this.monday, i);
        }
        
        // show dates on website
        this.showDates();
        
        // get events

    }
    
    // get date of each day
    getCurrentDate(mon, day) {
        let full_date = new Date(mon);
        full_date.setDate(full_date.getDate() + day);
        let date = this.getShortDate(full_date);
        return date[0];
    }
    
    // get date in foramt dd-mm-yyy
    getShortDate(d) {
        let date = new Date(d);
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0'); //Jan is 0!
        let yyyy = date.getFullYear();
        let day = date.getDay();
        if (day == 0) day = 7;

        let current_date = [`${dd}-${mm}-${yyyy}`, day];
        return current_date;
    }
    
        // set date for each day
    showDates() {
        let headers = [];
        for (let i=0; i<=6; i++) {
            let day_name = this.days[i];
            let header = document.querySelector('#'+day_name + ' .wc_date');
            header.innerHTML = this.weekDates[i];
            
            // check if current date is today 
            if(this.weekDates[i] == this.getShortDate(new Date())[0]) {
                document.querySelector('#'+day_name + ' .day_header').classList.add('today');
            }
        }
    }
    
    // go to previous/ next week
    changeWeek(pn) {
        // clean up 
        const headers = document.querySelectorAll('.day_header');
        for (let i = 0; i < headers.length; i++){ 
            headers[i].classList.remove('today');
        }
        
        const days = document.querySelectorAll('.day_body');
        for (let i = 0; i < days.length; i++){ 
            days[i].innerHTML = '';
        }
        this.events.forEach((event) => {
            this.events.splice(event);
        });
        
        let index;
        if(pn == 'p') {
            this.weekIndex -= 7;
        } else if (pn == 'n') {
            this.weekIndex += 7;
        }
        this.setCalendar();
        this.getWeekEvents();
        console.log(this.events);
    } 
    
    // show current week events
    showEvents() {
        this.events.forEach((ev) => {
            this.showEvent(ev);
        });
    }
    
    // show one event
    showEvent(event) {
        let dayName = this.days[event['day'] - 1];
        let curDay = document.querySelector('#'+dayName + ' .day_body');
        let event_item = document.createElement('div');
        event_item.classList.add('event');
        event_item.id = event['id'];
        event_item.innerHTML = event['title'];

        curDay.appendChild(event_item);
    }
    
    
    getWeekEvents() {
        const url = '/webgate/calendar/getevents';

        let xhr = new XMLHttpRequest();

        // OPEN - type ,url, async
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        
        self = this
        xhr.onload = function() {  
            if(xhr.status == 200) {
                //let data = xhr.responseText;
                try {
                    let data = JSON.parse(xhr.responseText);
                    for(let i in data) { 
                        let date = self.getShortDate(data[i].date)[0];
                        let day = self.getShortDate(data[i].date)[1];
                        self.events[i] = new Event(data[i].id, date, day, data[i].title, data[i].body, data[i].type, data[i].done);
                    }
                } catch (e) {
                    console.log('Empty');
                }
                self.showEvents();
            } else {
                console.log('Error');
            }
        }

        // Change to array obj or sth!!!! -----
        xhr.send(
            'mon=' + this.weekDates[0] +
            '&sun=' + this.weekDates[6]
        );
        console.log(this.weekDates[0]);
    }
    
    
    // add event function
    addEvent(data, action) {
        let color = 'green';
        
        const url = `/webgate/calendar/addevent`;
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        const self = this;
        
        xhr.onload = function() {
            if(xhr.status == 200) {
             document.getElementById('event_form_cont').classList.remove('d-block');
                let response = xhr.responseText;

                if( response != 0) {
                    let ev = ['day', 'title'];
                    ev['day'] = new Date(data['date']).getDay();
                    ev['title'] = data['title'];
                    ev['id'] = response;

                    console.log(response);
                    self.showEvent(ev);
                }
                else if(response == 0) {
                    color = 'red';
                    showAlert(response, color);
                    console.log('null');
                }
            } else {
                console.log('error');
            }
        }
        xhr.send(
            'title=' + data['title'] +
            '&body=' + data['body'] +
            '&date=' + data['date']
        );
    }
    
    // delete event 
    deleteEvent(id) {
        console.log('event ' + id + ' deleted.');
        // delete obj
        this.events.forEach((event, index) => {
            if(event.id == id) {
                this.events.splice(index, 1);
            }
        });
        
        document.getElementById(id).remove();
        
        const url = `/webgate/calendar/deleteevent`;
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        
        xhr.onload = function() {
            if(xhr.status == 200) {
                //document.getElementById('event_form_cont').classList.remove('d-block');
                let response = xhr.responseText;
                console.log(response);
            } else {
                console.log('error');
            }
        }
        xhr.send(
            'id=' + id
        );
        console.log(this.events);
    }
}
    

    
  

class UI {
    constructor(){
        this.event_id = 0;
        
        let week = new Week(0);

        // set previus next button event listeners ----
        const prevBtn = document.getElementById('prev');
        const nextBtn = document.getElementById('next');

        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            week.changeWeek('p');
        });
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            week.changeWeek('n');
        });
    
        //event: click on day column - show add event window
        const days = document.querySelectorAll('.day_body');
        const form = document.getElementById('event_form_cont');
        for (let i = 0; i < days.length; i++){
            days[i].addEventListener('click', (e) => {
                let date = week.weekDates[i];
                // get position
                var rect = days[i].getBoundingClientRect();
                let yPos = Math.round( e.clientY - rect.top );

                if(!e.target.matches('.event')) {
                    form.classList.add('d-block');
                    let form_date = document.getElementById('add_date');
                    let event_date = date.split("-").reverse().join("-");
                    form_date.value = event_date;

                    console.log(date + ' ' + event_date);
                    //console.log(date + ' ' + yPos);
                }
            });                       
        }

        //event: add event - cancel
        const cancel_btn = document.getElementById('add_cancel');
        cancel_btn.addEventListener('click', () => {
            form.classList.remove('d-block');
        });

        // event: add event - submit
        document.getElementById('event_form').addEventListener('submit', (e) => {
            e.preventDefault();
            let event_form = [];
            event_form['title'] = document.getElementById('add_title').value;
            event_form['body'] = document.getElementById('add_body').value;
            event_form['date'] = document.getElementById('add_date').value;
            // validation
            if (event_form['title'] == '') {
                alert('Event title can not be empty!');
            } else {
                week.addEvent(event_form);
            }
        });
        
    
        let self = this;    
        // event: click on event - show event window ------------------
        document.addEventListener('click',function(e){
            if(e.target && (e.target.matches('.event'))) {
                self.event_id = e.target.id;
                console.log(self.event_id);
                event_window.classList.add('d-block');
            }
        });

        // event: hide event window
        const hide_event_window_btn = document.getElementById('hide_event_window');
            hide_event_window_btn.addEventListener('click', () => {
                event_window.classList.remove('d-block');
            });

        // event: delete event
        const delete_btn = document.getElementById('delete_btn');
            delete_btn.addEventListener('click', () => {
            week.deleteEvent(self.event_id);
        });

    }
    // alerts
}
    


const initWeek = () => {
    let view = new UI;
    
}
document.addEventListener('DOMContentLoaded', initWeek, false);