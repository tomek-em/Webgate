/*
* what next?
* use data atributes data like event body: (data-body)
* oop
* return ok for methods checked
* alert div created in js
* for() to forEach ??
*/
(function(){

//let events = {};
let weekDates = {};

function setNewDates(dates) {
    weekDates['mon'] = dates[0];
    weekDates['tue'] = dates[1];
    weekDates['wed'] = dates[2];
    weekDates['thu'] = dates[3];
    weekDates['fri'] = dates[4];
    weekDates['sat'] = dates[5];
    weekDates['sun'] = dates[6];
}


function showFormAlert(type, text) {
    let form_cont = document.getElementById('event_form_cont');
    let alert = document.createElement('div');
    alert.id = "alert";
    alert.className = `alert alert-${type}`;
    alert.appendChild(document.createTextNode(text));
    form_cont.insertBefore(alert, form_cont.firstChild);
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

function showAlert(type, text) {
    let container = document.getElementById('calendar_wrapper');
    let alert = document.createElement('div');
    alert.id = "alert";
    alert.className = `alert alert-${type} fixed_alert`;
    alert.appendChild(document.createTextNode(text));
    container.insertBefore(alert, container.firstChild);
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}



// EVENTS --------
// show day event

//fetch single event
function getSingleEvent(id, type) {
    const url = '/webgate/calendar/getsingleevent';

    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {
        if(xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            setEventData(data);
            if(type == 'form') {
                document.getElementById('event_view').classList.add('d-block');
                document.querySelector('.event_window').classList.add('slide');
            }
        }
    }
    xhr.send(`id=${id}`);
}

// fetch events function
function getWeekEvents1(id, dates) {
    const url = '/webgate/calendar/getevents';

    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {
        if(xhr.status == 200) {
            let events = {};
            let data = JSON.parse(xhr.responseText);
            for(let i in data) {
              if(data[i].type != 'Wait') {
                events[i] = ({
                    id: data[i].id,
                    date: getShortDate(data[i].date)[0],
                    day: getShortDate(data[i].date)[1],
                    title: data[i].title,
                    body: data[i].body,
                    type: data[i].type,
                    done: data[i].done
                });
                showEvent(events[i]);
              }
            }
        } else {
            console.log('Error');
        }
    }
    xhr.send(`first=${dates[0]}&last=${dates[6]}`);
}


function getWeekEvents(id, dates) {
  const url = '/webgate/calendar/getevents';

  fetch(url, {
    method: 'post',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: `first=${dates[0]}&last=${dates[6]}`
  })
  .then(res => res.json())
  .then(json => prepearEvents(json))
}

function prepearEvents(data) {
  console.log(data);
  let events = {};

  for(let i in data) {
    if(data[i].type != 'Wait') {
      events[i] = ({
          id: data[i].id,
          date: getShortDate(data[i].date)[0],
          day: getShortDate(data[i].date)[1],
          title: data[i].title,
          body: data[i].body,
          type: data[i].type,
          done: data[i].done
      });
      showEvent(events[i]);
    }
  }
}



// show event on page
function showEvent(event) {
    let day_name = getDayName(event['day'] - 1);
    let cur_day = document.querySelector('#'+day_name + ' .day_body');
    let event_div = document.createElement('div');
    event_div.classList.add('event');
    event_div.id = event['id'];

    let ev_title = document.createElement('h5');
    let ev_body = document.createElement('p');
    ev_title.innerHTML = event.title;
    ev_body.innerHTML = event.body;
    event_div.appendChild(ev_title);
    event_div.appendChild(ev_body);
    let type = event.type.toLowerCase();
    event_div.classList.add(type);

    if(event.type != 'Wait') cur_day.appendChild(event_div);

    // done event
    if(event.done == 1) {
        event_div.classList.add('done');
    }
}

function addEvent(data) {
    // check if event date is in this week
    let day = getDayName(data['day'] -1);
    let day_date = weekDates[day].split("-").reverse().join("-");
    if (data['date'] == day_date) {
        let d = new Date(data['date']);
        data['date'] = getShortDate(d)[0];
        //events.push(data);
        showEvent(data);
    }

}

function deleteEvent(id) {
    document.getElementById(id).remove();
}


function sendData(action, data) {
    let url = `/webgate/calendar/${action}event`;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    if(action == 'add'){
        xhr.onload = function() {
            if(xhr.status == 200) {
                let res = xhr.responseText;
                data['id'] = res;
                addEvent(data);
                // alert
                showAlert('success', 'Event added');
            } else {
                console.log('error');
            }
        }
   console.log(data.type); xhr.send(`title=${data.title}&body=${data.body}&date=${data.date}&type=${data.type}`);
    }

    if(action == 'update'){
        xhr.onload = function() {
            if(xhr.status == 200) {
                let res = xhr.responseText;
                deleteEvent(data['id']);
                addEvent(data);
                showAlert('success', 'Event changed');
            } else {
                console.log('error');
            }
        }
        xhr.send(`title=${data.title}&body=${data.body}&date=${data.date}&type=${data.type}&id=${data.id}`);
    }

    if(action == 'delete'){
        xhr.onload = function() {
            if(xhr.status == 200) {
                let res = xhr.responseText;
                deleteEvent(data['id']);
                showAlert('success', 'Event deleted');
            } else {
                console.log('error');
            }
        }
    xhr.send(`id=${data.id}`);
    }

    if(action == 'done'){
        xhr.onload = function() {
            if(xhr.status == 200) {
                let res = xhr.responseText;
                document.getElementById(data.id).classList.add('done');
                //showAlert('success', 'Ok');
            } else {
                console.log('error');
            }
        }
    xhr.send(`id=${data.id}`);
    }
}


// edit event form
function setEventData(data){
    //console.log(data);
    let d = getShortDate(data.date)[0].split("-").reverse().join("-");
    document.getElementById('ev_title').innerHTML = data.title;;
    document.getElementById('ev_body').innerHTML = data.body;
    document.getElementById('ev_form_date').value = d;
    document.getElementById('ev_form_title').value = data.title;
    document.getElementById('ev_form_body').value = data.body;
    document.getElementById('ev_type').value = data.type;
    document.getElementById('form_title').innerHTML = 'Edit Event';
}

function getFormData() {
    let date = document.getElementById('ev_form_date');
    let title = document.getElementById('ev_form_title');
    let body = document.getElementById('ev_form_body');
    let type = document.getElementById('ev_type');
    let data = [];
    data['date'] = date.value;
    data['title'] = title.value;
    data['body'] = body.value;
    data['type'] = type.value;

    console.log(data['title']);
    return data;
}

function clearEventForm(){
    let title = document.getElementById('ev_form_title').value='';
    let body = document.getElementById('ev_form_body').value='';
}


function setEventListeners() {
    let data = [];
    let id, date;
    const form_container = document.getElementById('event_form_cont');
    const form = document.getElementById('event_form');
    const form_title = document.getElementById('ev_form_title');
    const cancel_form = document.getElementById('cancel_form_btn');
    const event_view = document.getElementById('event_view');
    const done_btn = document.getElementById('done_btn');
    const edit_btn = document.getElementById('edit_btn');
    const delete_btn = document.getElementById('delete_btn');
    const hide_view_btn = document.getElementById('cancel_view_btn');

    // Event listener: click on event or day body
    document.querySelector('.week_cal').addEventListener('click', (e) => {
        if(e.target.classList.contains('day_body')) {

            if(SESSION_USR == '') {
                showAlert('danger', 'You have to log in to add new event!');
            } else {
                let day_name = e.target.parentElement.id;
                let d = weekDates[day_name];
                date = d.split("-").reverse().join("-");
                document.getElementById('ev_form_date').value = date;

                document.getElementById('form_title').innerHTML = 'Add Event';
                form_container.setAttribute('data-action', 'add');
                event_view.classList.remove('d-block');
                document.querySelector('.event_window').classList.add('slide');
                form_container.classList.add('d-block');
                clearEventForm();

                // get position
                var rect = e.target.getBoundingClientRect();
                let y_pos = Math.round( e.clientY - rect.top );
            }
        }
        // click on event
        else if (e.target.classList.contains('event') || e.target.parentElement.classList.contains('event')) {
            if (e.target.classList.contains('event') ) id = e.target.id;
                else id = e.target.parentElement.id;
            form_container.classList.remove('d-block');

            // check if event is not done
            if (e.target.classList.contains('done') || e.target.parentElement.classList.contains('done')) {
                // has class done
            } else {
                // has not class done
            }
            getSingleEvent(id, 'form');
        }
    });

    // event: form submit
    event_form.addEventListener('submit', (e) => {
        e.preventDefault();
        let data = getFormData();
        let day_no = new Date(data['date']).getDay();
        if(day_no == 0) day_no = 7;
        data['day'] = day_no;

        let atr = form_container.getAttribute('data-action');
        const t = document.getElementById('ev_form_title').value;
        if (t == '' ) {
            // alert
            let type = 'danger';
            let info = 'Event title can not be empty';
            showFormAlert(type, info);
        } else {
            form_container.classList.remove('d-block');
            document.querySelector('.event_window').classList.remove('slide');
            if (atr == 'add') {
                sendData('add', data);
            }
            else {
                data['id'] = id;
                sendData('update', data);
            }
        }
    });

    // cancel buttons
    cancel_form.addEventListener('click', (e) => {
        form_container.classList.remove('d-block');
        document.querySelector('.event_window').classList.remove('slide');
        document.getElementById('ev_form_title').value='';
        document.getElementById('ev_form_body').value='';
    });
    hide_view_btn.addEventListener('click', (e) => {
        event_view.classList.remove('d-block');
        document.querySelector('.event_window').classList.remove('slide');
    });

    // mark done button
    done_btn.addEventListener('click', (e) => {
        event_view.classList.remove('d-block');
        document.querySelector('.event_window').classList.remove('slide');
        data['id'] = id;
        sendData('done', data);
    })

    // edit button
    edit_btn.addEventListener('click', (e) => {
        event_view.classList.remove('d-block');
        form_container.classList.add('d-block');
        form_container.setAttribute('data-action', 'edt');
        getSingleEvent(id);
        });

    // delete button
    delete_btn.addEventListener('click', (e) => {
        event_view.classList.remove('d-block');
        document.querySelector('.event_window').classList.remove('slide');
        data['id'] = id;
        sendData('delete', data);
    });
}



// set date ------
// get day name
function getDayName(dayOfWeek) {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    return days[dayOfWeek];
}

// get date - returns array: [dd-mm-yyyy, day_number ]
function getShortDate(d) {
    date = new Date(d);
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //Jan is 0!
    let yyyy = date.getFullYear();
    let day = date.getDay();
    if (day == 0) day = 7;

    let current_date = [`${dd}-${mm}-${yyyy}`, day];
    return current_date;
}

// get date of each day
function getCurrentDate (mon, day) {
    let full_date = new Date(mon);
    full_date.setDate(full_date.getDate() + day);
    let date = getShortDate(full_date);
    return date[0];
}

// set date for each day
function showWeekDates(date) {
    let header;
    for (let i=0; i<=6; i++) {
        let day_name = getDayName(i);
        header = document.querySelector('#'+day_name + ' .wc_date');
        header.innerHTML = date[i];
        // check if current date is today
        if(date[i] == getShortDate(new Date())[0]) {
            document.querySelector('#'+day_name + ' .day_header').classList.add('today');
        }
    }
}


//clean up
function clearCalendar() {
    const days = document.querySelectorAll('.day_body');
    for (let i = 0; i < days.length; i++){
        days[i].innerHTML = '';
    }

    const headers = document.querySelectorAll('.day_header');
    for (let i = 0; i < headers.length; i++){
        headers[i].classList.remove('today');
    }

    events = [];
}




// Create week calendar
function createWeekCalendar(customDate, weekIndex) {
    let dates = [];
    let date = new Date();

//    setTimeout(() => {
//        document.getElementById('spinner').remove();
//    }, 500);

    if (customDate != 0) {
        date = new Date(customDate);
    }
    date.setDate(date.getDate() + weekIndex);
    let day = date.getDay();
    if (day == 0) day = 7;
    let monday =  date.setDate(date.getDate() - day + 1);

    //set date for each day in current week
    for (let i = 0; i <= 6; i++) {
        dates[i] = getCurrentDate(monday, i);
    }
    setNewDates(dates); // assign dates to object for event listeners
    showWeekDates(dates);
    if(SESSION_USR) getWeekEvents( 0, dates);
}


// init function
function weekCalendarInit() {
  const cur_date = current_date;
    createWeekCalendar(cur_date, 0);
    //showAlert('success', 'Click on calendar to add new event');

    // event listeners: previous/ next button
    let weekIndex = 0;
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    prevBtn.addEventListener('click', (e) => {
        clearCalendar();
        weekIndex -= 7;
        createWeekCalendar(cur_date, weekIndex);
    });
    nextBtn.addEventListener('click', (e) => {
        clearCalendar();
        weekIndex += 7;
        createWeekCalendar(cur_date, weekIndex);
    });

    setEventListeners();
}
document.addEventListener('DOMContentLoaded', weekCalendarInit, false);
}());
