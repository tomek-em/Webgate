const showAlert = function(text, color) {
    const alert = document.getElementById('alert');
    alert.classList.add('d-block');
    alert.classList.add(color);
    alert.innerHTML = text;
    const hideAlert = function() {
        alert.classList.remove('d-block');
        alert.classList.remove(color);
    }
    var cancel = setInterval(hideAlert, 2000);
}


const getDayName = function(dayOfWeek) {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const day = days[dayOfWeek];
    return day;
}

const getShortDate = function(d) {
    date = new Date(d);
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //Jan is 0!
    let yyyy = date.getFullYear();
    let day = date.getDay();
    if (day == 0) day = 7;
    
    let current_date = [`${dd}-${mm}-${yyyy}`, day];
    return current_date;
}

    // get first day of current week
const getMonday = function(w = 0) {
    let date = new Date();
    
    if (w == 10) {
        date = new Date('January 5, 2020 11:13:00');
    }
    date.setDate(date.getDate() + w);
    
    let day = date.getDay();
    if (day == 0) day = 7;
    date.setDate(date.getDate() - day + 1);
    
    return date;
}

    // get date of each day
const getCurrentDate = function(mon, day) {
    let full_date = new Date(mon);
    full_date.setDate(full_date.getDate() + day);
    let date = getShortDate(full_date);
    return date[0];
}


    // set date for each day
const setWeekDates = function(date) {
    let headers = [];
    for (let i=0; i<=6; i++) {
        let day_name = getDayName(i);
        let header = document.querySelector('#'+day_name + ' .wc_date');
        header.innerHTML = date[i];
        if(date[i] == getShortDate(new Date())[0]) {
            document.querySelector('#'+day_name + ' .day_header').classList.add('today');
        }
    }
}

    //clean up
const cleanWeekCal = function() {
    const days = document.querySelectorAll('.day_body');
    for (let i = 0; i < days.length; i++){ 
        days[i].innerHTML = '';
    }
    
    const headers = document.querySelectorAll('.day_header');
    for (let i = 0; i < headers.length; i++){ 
        headers[i].classList.remove('today');
    }
}



    // show day event
const showEvent = function(event) {
    let day_name = getDayName(event['day'] - 1);
    let cur_day = document.querySelector('#'+day_name + ' .day_body');
    let event_div = document.createElement('div');
    event_div.classList.add('event');
    event_div.id = event['id'];
    event_div.innerHTML = event['title'];
    
    cur_day.appendChild(event_div);

}



    // fetch events function
const getWeekEvents = function(dates) {
    const url = '/webgate/calendar/fetchweekevents';
    let events = [];

    // create XMR Obj
    let xhr = new XMLHttpRequest();

    // OPEN - type ,url, async
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {  
        if(xhr.status == 200) {
            //let data = xhr.responseText;
            try {
                let data = JSON.parse(xhr.responseText);
                for(let i in data) { 
                    events[i] = ({
                        id: data[i].id,
                        php_date: data[i].date,
                        date: getShortDate(data[i].date)[0],
                        day: getShortDate(data[i].date)[1],
                        user_id: data[i].user_id,
                        title: data[i].title,
                        body: data[i].body,
                        type: data[i].type,
                        done: data[i].done
                    });
                    showEvent(events[i]);
                }
            } catch (e) {
                console.log('Empty');
            }

        } else {
            console.log('Error');
        }
    }

    // Change to array obj or sth!!!! -----
    xhr.send(
        'mon=' + dates[0] +
        '&sun=' + dates[6]
    );
}

    // add event
const addEvent = function(data) {
    const url = '/webgate/calendar/add';
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    xhr.onload = function() {
        if(xhr.status == 200) {
            document.getElementById('event_form_cont').classList.remove('d-block');
            let response = xhr.responseText;
            let color = 'green';
            if(response != 'Event added') color = 'red';
            showAlert(response, color);
            
            let event = ['day', 'title'];
            event['day'] = new Date(data['date']).getDay();
            event['title'] = data['title'];
            showEvent(event);
            
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

const deleteEvent = function(id) {
    console.log('delete ' +id);
    
}



// ---- Create week calendar ---
const getWeekCalendar = function (weekIndex = 0) {
    let monday = getMonday(weekIndex);
    let week = [];
    for (let i = 0; i <= 6; i++) {
        week[i] = getCurrentDate(monday, i);
    }
    setWeekDates(week);
    // get events
    getWeekEvents(week);
    
    return week;
}



// ---- Event listeners
const setEventListeners = function(week) {
    let id = 0;
    const event_window = document.getElementById('event_window');
    
    // set previus next button event listeners ----
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    let weekIndex = 0;
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cleanWeekCal();
        weekIndex -= 7;
        week = getWeekCalendar(weekIndex);
    });
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cleanWeekCal();
        weekIndex += 7;
        week = getWeekCalendar(weekIndex);
    });
    
    
    // events - event listener ------
    const days = document.querySelectorAll('.day_body');
    const form = document.getElementById('event_form_cont');
    for (let i = 0; i < days.length; i++){
        days[i].addEventListener('click', (e) => {
            let date = week[i];
            // get position
            var rect = days[i].getBoundingClientRect();
            let yPos = Math.round( e.clientY - rect.top );
            
            if(!e.target.matches('.event')) {
                form.classList.add('d-block');
                let form_date = document.getElementById('add_date');
                event_date = date.split("-").reverse().join("-");
                form_date.value = event_date;
                
                console.log(date + ' ' + event_date);
                //console.log(date + ' ' + yPos);
            }
        });                       
    }
    
    // add event - cancel
    const cancel_btn = document.getElementById('add_cancel');
    cancel_btn.addEventListener('click', () => {
        form.classList.remove('d-block');
    });
    
    
    // add event - submit
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
            addEvent(event_form);
        }
    })
    
    
    
    
// click on event - event listener
    document.addEventListener('click',function(e){
        if(event.target && (event.target.matches('.event'))) {
            id = event.target.id;
            console.log(id);
            event_window.classList.add('d-block');
        }
    });
}

    const hide_event_window_btn = document.getElementById('hide_event_window');
        hide_event_window_btn.addEventListener('click', () => {
            event_window.classList.remove('d-block');
        });

    // delete event buton listener
    const delete_btn = document.getElementById('delete_btn');
        delete_btn.addEventListener('click', () => {
            console.log('del');
            //deleteEvent(id);
            // cant get id here. 
            // use HTML data atribut data-id or OOP  
            //In worst case ad id to window as hiden <p>
        
        });


const weekCalendar = () => {
    let week = getWeekCalendar();
    // set event listeners
    setEventListeners(week);
    
}
document.addEventListener('DOMContentLoaded', weekCalendar, false);
