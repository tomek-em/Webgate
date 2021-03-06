/*
Week calendar js file
*/
(function(){

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

//get single event
function getSingleEvent(id, type) {
  const url = '/webgate/calendar/getsingleevent';

  getApi(url, `id=${id}`)
  .then((res) => res.json())
  .then((json) =>  {
    setEventData(json);
    if(type == 'form') {
        document.getElementById('event_view').classList.add('d-block');
        document.querySelector('.event_window').classList.add('slide');
    }
  })
  .catch(function() {
      console.log("error");
  });
}

// get week events
function getWeekEvents(id, dates) {
  let events = {};
  let url = '/webgate/calendar/getevents';

  getApi(url, `first=${dates[0]}&last=${dates[6]}`)
  .then((res) => res.json())
  .then((json) => {
    const days = document.querySelectorAll('.day_body');
    for (let i = 0; i < days.length; i++){
        days[i].innerHTML = '';
    }

    json.forEach((ev, i) =>  {
      if(ev.type != 'Wait') {
        events[i] = ev;
        events[i].day = getShortDate(ev.date)[1];
        events[i].date = getShortDate(ev.date)[0];
        showEvent(events[i]);
      }
    });
  });
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
  // add
  if(action == 'add'){
    getApi(url, `title=${data.title}&body=${data.body}&date=${data.date}&type=${data.type}`)
    .then((res) => res.json())
    .then((json) => {
      data['id'] = json;
      addEvent(data);
      showAlert('success', 'Event added');
    })
    .catch(function() {
        console.log("error");
    });
  }
  // edit
  if(action == 'update'){
    getApi(url, `title=${data.title}&body=${data.body}&date=${data.date}&type=${data.type}&id=${data.id}`)
    .then((res) => {
      deleteEvent(data['id']);
      addEvent(data);
      showAlert('success', 'Event changed');
    });
  }
  // delete
  if(action == 'delete'){
    deleteReq(`${url}/${data.id}`)
    .then((res) => {
      deleteEvent(data['id']);
      showAlert('success', 'Event deleted');
    });
  }

  // mark done
  if(action == 'done'){
    getApi(url, `id=${data.id}`)
    .then((res) => {
      document.getElementById(data.id).classList.add('done');
    });
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
}




// Create week calendar
function createWeekCalendar(customDate, weekIndex) {
    let dates = [];
    let date = new Date();

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
