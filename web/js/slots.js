/* 
* make another file only with functions used in week and slots.js 
* use Calendar.php module
* use new db table: slots
* 15 slots per day, different hours
* make slot in db for every possible hour max 1 month forward
* id, date, time (as string), available: true/ false, hidden info
* owner define time for every slot e.g. 10 slots 15min timestep, form-to
* user can book it
*
* TO DO: change in js time to h (change min to  0.25, 0.5 ...)
* next for loop 0.25 interval in php save each 
*/
(function(){

let week_slots = [];    
let days_with_slots = [];    
let weekDates = {};
let current_usr;

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
    let form_cont = document.getElementById('slot_form_cont');
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



// fetch events function
function getSlots(mon, sun) {
    const url = `/webgate/calendar/getslots`;
    
    // create XMR Obj
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    xhr.onload = function() {  
        if(xhr.status == 200) {
                    let data = JSON.parse(xhr.responseText);
                    data.forEach((slot, i) => {
                        week_slots.push(slot);
                        let date = getShortDate(data[i].date)
                        week_slots[i].date = date[0];
                        week_slots[i].day = date[1];
                });
                    showSlots();
            } else {
                console.log('Error');
            }
        }
    // console.log(`mon=${dates['mon']}&sun=${dates['sun']}&usr=${user}`);
    xhr.send(`mon=${mon}&sun=${sun}&usr=${current_usr}`);
    }

  

// show event on page    
function showSlots() {
    let first = 20;
    week_slots.forEach((slot, i) => {
        
        let day_name = getDayName(slot['day'] - 1);
        let cur_day = document.querySelector('#'+day_name + ' .day_body');
        let slot_div = document.createElement('div');
        slot_div.classList.add('event');
        slot_div.id = slot['id'];
        
        days_with_slots[slot['day']] = true;
        
        let time = numToTime(slot['start']);
        if(slot.booked_by == null) {
            slot_div.innerHTML = time; 
        } else {
            if(current_usr == SESSION_USR) {
                slot_div.innerHTML = `Booked by ${slot.booked_by}`;
            } else {
                slot_div.innerHTML = 'Booked';
            }
            slot_div.classList.add('bg_marked');
        }
        if(slot.start < first) first = slot.start;
        cur_day.appendChild(slot_div);
    });
    console.log(`first ${first}`);
}
    

function sendSlotSet(slots) {
    let url = `/webgate/calendar/setslots`;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    xhr.onload = function() {
        if(xhr.status == 200) {
            let res = xhr.responseText;
            console.log(res);
            //addEvent(data);
            // alert
            showAlert('success', 'Slots added');
            clearCalendar();
            createWeekCalendar(weekDates['mon'].split("-").reverse().join("-"), 0);
        } else {
            console.log('error');
        }       
    }
 xhr.send(`start=${slots.start}&stop=${slots.stop}&date=${slots.date}&range=${slots.range}&d1=${slots.d1}&d2=${slots.d2}&d3=${slots.d3}&d4=${slots.d4}&d5=${slots.d5}&week=${slots.week}`);
} 
    
    
// delete slots    
function deleteSlots(date) {
    let url = `/webgate/calendar/deleteslots`;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    xhr.onload = function() {
        if(xhr.status == 200) {
            let res = xhr.responseText;
            showAlert('success', 'Slot deleted');
            clearCalendar();
            createWeekCalendar(weekDates['mon'].split("-").reverse().join("-"), 0);
            
            console.log(res);
        } else {
            console.log('error');
        }       
    }
    xhr.send(`date=${date}`);
}   
    
    
// book slot 
function bookSlot(id) {
    let url = `/webgate/calendar/bookslot`;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    xhr.onload = function() {
        if(xhr.status == 200) {
            let res = xhr.responseText;
            showAlert('success', `You have booked time at ${current_usr}`);
            clearCalendar();
            createWeekCalendar(weekDates['mon'].split("-").reverse().join("-"), 0);
        } else {
            console.log('error');
        }       
    }
    xhr.send(`id=${id}`);
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
    document.getElementById('form_title').innerHTML = 'Edit Event';
}   
    
function getFormData() {
    let date = document.getElementById('ev_form_date');
    let title = document.getElementById('ev_form_title');
    let body = document.getElementById('ev_form_body');
    let data = [];
    data['date'] = date.value;
    data['title'] = title.value;
    data['body'] = body.value;
    
    console.log(data['title']);
    return data;
}  
    
function clearEventForm(){
    let title = document.getElementById('ev_form_title').value='';
    let body = document.getElementById('ev_form_body').value='';
}    
    
function timeToNum(t) {
    let h1 = t.substr(0, 2);
    let h = ('0' + h1).slice(-2);
    let min = t.substr(3, 2);
    let m = min / 60 *100;
    let num = `${h}.${m}`;
    return num;
}
    
function numToTime(n) {
    num = n.split('.');
    let h = ('0' + num[0]).slice(-2);
    let min = (num[1]/100*60 + '0').substr(0,2);
    let time = `${h}:${min}`;
    return time;
}    
   

function setEventListeners() {
    let data = [];
    let id, date;
    let day_name;
    let delete_slot_date;
    const form_container = document.getElementById('slot_form_cont');
    const form_title = document.getElementById('ev_form_title');
    const cancel_form = document.getElementById('cancel_form');
    const event_view = document.getElementById('event_details');
    
    let del_alert = document.querySelector('#confirm_del_alert');
    
    current_usr = document.querySelector('#cur_usr').innerHTML;
    
    // change user
    let users_list = document.querySelectorAll('.user_list_item');
     users_list.forEach((usr) => {
            usr.addEventListener('click', (e) => {
                e.preventDefault();
                current_usr = usr.innerHTML;
                document.querySelector('#cur_usr').innerHTML = current_usr;
                
                // get & show slots
                clearCalendar();
                let mon = weekDates['mon'].split("-").reverse().join("-");
                let sun = weekDates['sun'].split("-").reverse().join("-");
                //getSlots(mon, sun); 
                createWeekCalendar(mon, 0);
            });
     });
    
    
    // Event listener: click on day
        let days = document.querySelectorAll('.day_body');
        days.forEach((day) => {
            day.addEventListener('click', (e) => {
                console.log(current_usr);
                
                if(current_usr == SESSION_USR) {
                    day_name = day.parentElement.id;
                    let d = weekDates[day_name];
                    date = d.split("-").reverse().join("-");
                    document.getElementById('form_date').value = date;
                    
                    let day_num = getShortDate(date)[1];
                    if(days_with_slots[day_num]) {
                        document.querySelector('#confirm_del_alert').classList.add('d-block');
                        delete_slots_date = date;
                    } else {
                        console.log('no slots!');
                        form_container.classList.add('slide');
                    }
                } else {
                    // book slot
                    if(e.target.classList.contains('day_body') || e.target.classList.contains('bg_marked') || 
                       SESSION_USR == ''){ 
                        // do nothiing
                        if(SESSION_USR == '') showAlert('danger', 'You have to log in to book time!');
                    } else {
                        
                        bookSlot(e.target.id);
                    }
                    
                }
            });    
        });
        
    
    // Event listener: confirm delete slot
    document.querySelector('#conf_del').addEventListener('click',(e) => {
        deleteSlots(delete_slots_date);
        del_alert.classList.remove('d-block');
        delete_slot_date = '';
    });
    
    document.querySelector('#cancel_del').addEventListener('click', (e) => {
       del_alert.classList.remove('d-block'); 
    });
    
    // submit slot form
    document.getElementById('slot_form').addEventListener('submit', (e) => {
        e.preventDefault();
        let slot = [];
        let start = document.getElementById('start_time').value;
        let stop = document.getElementById('end_time').value;
        slot.date = document.getElementById('form_date').value;
        //change below if want to add slots for multiple days
        slot.week = 'false';
        
        if(start < stop) {
            form_container.classList.remove('slide');
            slot.start = timeToNum(start);
            slot.stop = timeToNum(stop);
            sendSlotSet(slot);
            console.log(slot); 
        } else {
            showFormAlert('danger', 'Set corect time range');
        }
    });
    
    
    // cancel buttons
    cancel_form.addEventListener('click', (e) => {
        form_container.classList.remove('slide');
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
    week_slots = [];
    days_with_slots = [];

    const headers = document.querySelectorAll('.day_header');
    for (let i = 0; i < headers.length; i++){ 
        headers[i].classList.remove('today');
    }

    let del_alert = document.querySelector('#confirm_del_alert');
    if (del_alert.classList.contains('d-block')) {
        del_alert.classList.remove('d-block');
    }
    
    // set current calendar user name
    if(current_usr != undefined) {              document.querySelector('#cal_title').innerHTML = `Book time at ${current_usr}`;
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
    current_usr = document.querySelector('#cur_usr').innerHTML;
    
    let mon = weekDates['mon'].split("-").reverse().join("-");
    let sun = weekDates['sun'].split("-").reverse().join("-");
    getSlots(mon, sun); 
}


// init function
function weekCalendarInit(date) {
    createWeekCalendar(date, 0);
    showAlert('success', 'Select user to book a time');

    // event listeners: previous/ next button
    let weekIndex = 0;
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    
    prevBtn.addEventListener('click', (e) => {
        clearCalendar();
        weekIndex -= 7;
        createWeekCalendar(date, weekIndex);
    });
    nextBtn.addEventListener('click', (e) => {
        clearCalendar();
        weekIndex += 7;
        createWeekCalendar(date, weekIndex);
    });
    
    setEventListeners();    // must be here can not add new when change week
}
document.addEventListener('DOMContentLoaded', weekCalendarInit(current_date), false);
}());
