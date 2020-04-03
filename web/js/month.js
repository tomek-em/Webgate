(function () {
/* let month_page is true if current webpae is month.php */

let events = [];
let today_event;

function setMonthPicture(month) {
    const month_name = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    let pic_cont = document.querySelector('#right_col');
    pic_cont.classList.add('month_col');
    pic_cont.classList.add(month_name[month -1]);
}


function getMonthEvents( last, month, year ) {
    const url = `/webgate/calendar/getevents`;
    let xhr = new XMLHttpRequest();

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {
      let d = new Date();
      let today = d.getDate();
      let today_m = d.getMonth()+1;
      let today_y = d.getFullYear();
      let cur_events = '';

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
                    date: date,
                    type: data[i].type
                };
            }

            events.forEach((ev) => {
              let date = ev.date;
              if(month_page && ev.type != 'Wait') {
                event_dot = document.createElement("div");
                event_dot.classList.add('circle');
                document.getElementById(date).appendChild(event_dot);
              }

              if (ev.date == today && month == today_m && year == today_y && ev.type != 'Wait') {
                cur_events += `${ev.title}, `;
              }
            });
            if(!(month_page)) {
              let events_header = document.querySelector('#event_text .upper');
              let events_body = document.querySelector('#event_text .normal');
              if(month == today_m && year == today_y && cur_events != '') {
                events_header.innerHTML = 'Your events for today: ';
                events_body.innerHTML = `${cur_events}`;
              }
              else if(month == today_m && year == today_y && cur_events == '') events_header.innerHTML = `You have nothing to do today`;
            }

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
    if(month_page) {
      f.action ='week';
    } else {
      f.action ='calendar/month';
    }

    f.method = 'POST';

    let i=document.createElement('input');
    i.type = 'hidden';
    i.name = 'date';
    i.value = date;
    f.appendChild(i);
    //console.log(date);
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
                // if(!(month_page))showTodayEvent();
            }

            cell.appendChild(day);
            row.appendChild(cell);
            cal_body.appendChild(row);
            row.classList.add('month_cal_week');
            date ++;
        }
    }
    if(month_page) setMonthPicture(month);
}

function clearMonthCal() {
    document.querySelector('#month_name').innerHTML = '';
    document.querySelector('#month_body').innerHTML = '';
    events = [];


    if(month_page) {
      document.querySelector('#right_col').removeAttribute("class");
    }
}


function showTodayEvent() {
  container = document.querySelector('#event_text');
  container.classList.add('event_text');
  container.appendChild(today_event);
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
    today_event = '';

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


    let container;
    let ev_box;

    // picture in right column
    if(month_page) {
      container = document.querySelector('#right_col');
      ev_box = document.createElement('div');
      ev_box.classList.add('ev_title');
      container.appendChild(ev_box);

      document.querySelector('#left_col').addEventListener('mouseover', (e) => {
          if(e.target.classList.contains('month_cal_cell') && e.target.childElementCount >= 2 ) {
              let day_no = e.target.children[0].innerHTML;
              console.log(day_no);

              let cur_events = [];
              ev_box.innerHTML = '';
              events.forEach((event) => {
                  if (event.date == day_no && event.type != 'Wait') {
                      cur_events.push(event.title);
                  }
              });

              cur_events.forEach((ev) => {
                if(month_page) {
                  ev_box.innerHTML += `${ev}<br/>`;
                } else {
                  //today_event.innerHTML += `${ev} <br/> `;
                }
              });

              ev_box.classList.add('d-block');

          } else if (e.target.classList.contains('day_link')) {
          } else {
              ev_box.classList.remove('d-block');
              ev_box.innerHTML = '';
          }
      });
    } else {

    }
}
document.addEventListener('DOMContentLoaded', initMonthCalendar, false);

} ());
