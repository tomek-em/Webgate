(function () {
let events = [];    

function setMonthPicture(month) {
    const month_name = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    let pic_cont = document.querySelector('#right_col');
    pic_cont.classList.add(month_name[month -1]);
}
    
    
function getMonthEvents( last, month, year ) {
    const url = `/webgate/calendar/getevents`;
    let xhr = new XMLHttpRequest();

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    xhr.onload = function() {  
        if(xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            let full_date;
            let date;
            for(let i in data) {
                full_date = data[i].date;
                date = new Date(full_date).getDate();
                let titles = [];
                events[i] = {
                    id: data[i].id,
                    title: data[i].title,
                    date: date
                };
            }
            events.forEach((ev) => {
                event_dot = document.createElement("div");
                event_dot.classList.add('circle');
                let date = ev.date;

                document.getElementById(date).appendChild(event_dot);
            })
        } else {
            console.log('Error');
        }
    }
    let first_date = `${year}-${month}-1`;
    let last_date = `${year}-${month}-${last}`;
    
    xhr.send(`first=${first_date}&last=${last_date}`);
}


function redirectToWeek(date) {
    let f = document.createElement('form');
    f.action ='week';
    f.method = 'POST';

    let i=document.createElement('input');
    i.type = 'hidden';
    i.name = 'date';
    i.value = date;
    f.appendChild(i);

    document.body.appendChild(f);
    f.submit();
}


function showMonthCalendar(last, month, year) {
    let today = new Date();
    let today_day = today.getDate();
    let today_month = today.getMonth() + 1;
    let today_year = today.getFullYear();
    
    let month_names = [];
    let cal_body = document.querySelector('#month_body');
    let month_header = document.querySelector('#month_name');
    month_header.innerHTML = `${month}. ${year}`;
    
    let event_dot;
    
    // get first day of month
    let first_day = new Date(year, month-1, 1).getDay();
    if (first_day == 0) first_day = 7;
    let first = 1 - first_day + 1;
    let date = first;
    
    
    for(let i = 1; i<=6; i++ ) {
        let row = document.createElement("tr");
        
        for (let j = 1; j <= 7; j++) {
            let cell = document.createElement("td");
            let day = document.createElement("a");
            day.setAttribute("href", "#");
            day.setAttribute("class", "day_link");
            cell.setAttribute("class", "month_cal_cell");
            cell.id = date;
            if(j == 7) day.classList.add('sunday');
            
            // show day nr
            if((date > 0)&&(date <= last )) {
                day.innerHTML = date;
                
                //check if it is today
                if(date == today_day && month == today_month && year == today_year) cell.classList.add('today');
                
                cell.addEventListener('click', (e) => {
                    if (e.target.classList.contains('circle')) {
                    } else {
                        let day = e.target.innerHTML;
                        redirectToWeek(`${year}-${month}-${day}`);
                    }
                });
            }
            
            cell.appendChild(day);
            row.appendChild(cell);
            cal_body.appendChild(row);
            row.classList.add('month_cal_week');
            date ++;
        }
    }
    
    setMonthPicture(month);
    
}

function clearMonthCal() {
    document.querySelector('#month_name').innerHTML = '';
    document.querySelector('#month_body').innerHTML = '';
    events = [];
    
    document.querySelector('#right_col').removeAttribute("class");
    document.querySelector('#right_col').classList.add("month_col");
}


function createCalendar(month_index) {
    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let month_diff;
    let year_diff;
    
    // calculate date if not actual month
    if(month + month_index <= 0)  {
        month_diff = 12 - ((month + month_index) %12) * -1;
        year_diff = Math.ceil((month + month_index) /12) -1;
        year = year + year_diff;
        month = month_diff;
    } else if(month + month_index > 12) {
        month_diff = ((month + month_index) %12);
        if(month_diff == 0) month_diff = 12;
        year_diff = Math.floor((month + month_index -1) /12);
        year = year + year_diff;
        month = month_diff;
    } else {
        month += month_index;
    }
    
    let last = 32 - new Date(year, month-1, 32).getDate();
    if (SESSION_USR){
        showMonthCalendar(last, month, year);
        getMonthEvents(last, month, year);
    } else {
        showMonthCalendar(last, month, year);
    }
}


function initMonthCalendar() {
    let m_index = 0
    
    createCalendar(m_index);
    
    // prev/ next btn event listeners
    document.querySelector("#prev_month_btn").addEventListener('click', () => {
        clearMonthCal();
        m_index --;
        createCalendar(m_index);
    });
    
    document.querySelector("#next_month_btn").addEventListener('click', () => {
        clearMonthCal();
        m_index ++;
        createCalendar(m_index);
    });
    
    
    // picture in right col
    let container = document.querySelector('#right_col');
    let ev_box = document.createElement('div');
    ev_box.classList.add('ev_title');
    container.appendChild(ev_box);
    document.querySelector('#left_col').addEventListener('mouseover', (e) => {    
        if(e.target.classList.contains('month_cal_cell') && e.target.childElementCount >= 2 ) {
            let day_no = e.target.children[0].innerHTML;
            console.log(day_no);
            
            let cur_events = [];
            ev_box.innerHTML = '';
            events.forEach((event) => {
                
                console.log(event.date);
                if (event.date == day_no) {
                    cur_events.push(event.title);   
                }
            });
            
            //console.log(cur_events);
            
            cur_events.forEach((ev) => {
                ev_box.innerHTML += `${ev}<br/>`;
                console.log(ev);
            });
            
            ev_box.classList.add('d-block');

        } else if (e.target.classList.contains('day_link')) {
        } else {
            ev_box.classList.remove('d-block');
            ev_box.innerHTML = '';
        }
    });
    
//    document.querySelector('#left_col').addEventListener('mouseover', (e) => {
//        ev_box.classList.remove('d-block');
//        ev_box.innerHTML = '';
//    })
}

document.addEventListener('DOMContentLoaded', initMonthCalendar, false); 
    
} ());