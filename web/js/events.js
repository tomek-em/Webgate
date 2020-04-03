/* Events on waiting list
  * used data attributes to keep event id in this exemple
  *
*/


function showAlert(type, text) {
    let container = document.querySelector('.content');
    let alert = document.createElement('div');
    alert.id = "alert";
    alert.className = `alert alert-${type} fixed_alert`;
    alert.appendChild(document.createTextNode(text));
    container.insertBefore(alert, container.firstChild);
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

// Add event
function showEvent(event) {
  const cont = document.getElementById('content');
  const card = document.createElement('div');
  card.classList.add('card', 'card-body', 'mb-3');

  // Create DOM
  const h4 = document.createElement('h4');
  const p = document.createElement('p');
  h4.classList.add('card-title');
  p.classList.add('card-text');
  h4.innerHTML = event.title;
  p.innerHTML = event.body;

  const row = document.createElement('div');
  row.classList.add('row');
  const col = document.createElement('div');
  col.classList.add('col-md-6');
  col.id = event.id;
  col.innerHTML = `<a href="#" class="btn btn_blue pull-left mx-1 btn_edt">Edit</a>
    <a href="#" class="btn btn-danger pull-left mx-1 btn_del">Delete</a>`;

  card.appendChild(h4);
  card.appendChild(p);
  row.appendChild(col);
  card.appendChild(row);
  cont.appendChild(card);

  const form = document.querySelector('#event_form');
  const form_cont = document.querySelector('#event_form_cal');

  document.getElementById(event.id).addEventListener('click', (e) => {
    if(e.target.classList.contains('btn_edt')) {
      console.log('edt');
      form_cont.classList.add('d-block');
      form.dataset.id = event.id;
      form.dataset.todo = 'edit';

      let data = event;
      data.form_title = "Edit event";
      setEventData(data);
    } else if(e.target.classList.contains('btn_del')) {
      deleteEvent(event.id);
    }
  });
}


// Get event data
function fetchEvent (id) {
  let url = `/webgate/calendar/getsingleevent`;
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xhr.onload = function() {
      if(xhr.status == 200) {
          let res = JSON.parse(xhr.responseText);
          let data = res;
          data.form_title = "Edit event";
          setEventData(data);
          //document.getElementById(id).parentElement.parentElement.remove();
      } else {
          console.log('error');
      }
  }
  xhr.send(`id=${id}`);
}

// Edit event form
function setEventData(data){
    let date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //Jan is 0!
    let yyyy = date.getFullYear();

    let d = `${yyyy}-${mm}-${dd}`;
    document.getElementById('ev_form_date').value = d;
    document.getElementById('ev_form_title').value = data.title;
    document.getElementById('ev_form_body').value = data.body;
    document.getElementById('ev_type').value = data.type;
    document.querySelector('#event_form_cal h2').innerHTML = data.form_title;
}

// Delete Event function
function deleteEvent (id) {
  let url = `/webgate/calendar/deleteevent`;
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  console.log(id);
  xhr.onload = function() {
      if(xhr.status == 200) {
          let res = xhr.responseText;
          document.getElementById(id).parentElement.parentElement.remove();
          //showAlert('success', 'Event deleted');
      } else {
          console.log('error');
      }
  }
  xhr.send(`id=${id}`);
}

// Add event
function addEvent (data) {
  let url = `/webgate/calendar/addevent`;
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xhr.onload = function() {
      if(xhr.status == 200) {
          let res = xhr.responseText;
          data.id = res;
          if (data.type == 'Wait') showEvent(data);
      } else {
          console.log('error');
      }
  }
  xhr.send(`title=${data.title}&body=${data.body}&date=${data.date}&type=${data.type}`);
}

// Edit event
function updateEvent (data) {
  let url = `/webgate/calendar/updateevent`;
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xhr.onload = function() {
      if(xhr.status == 200) {
          let res = xhr.responseText;
          console.log(res);

          document.getElementById(data.id).parentElement.parentElement.remove();
          if (data.type == 'Wait') showEvent(data);
      } else {
          console.log('error');
      }
  }
  xhr.send(`title=${data.title}&body=${data.body}&date=${data.date}&type=${data.type}&id=${data.id}`);
}


function eventsPage(){
  const add_btn = document.getElementById('add_event_btn');
  const edt_buttons = document.querySelectorAll('.btn_edt');
  const del_buttons = document.querySelectorAll('.btn_del');
  const form = document.querySelector('#event_form');
  const form_cont = document.querySelector('#event_form_cal');
  const cancel_btn = document.getElementById('cancel_ev_btn');

  add_btn.addEventListener('click', (e) => {
    let data = {
      title: '',
      body: '',
      type: 'Wait',
      form_title: 'Add event'
    }
    setEventData(data);
    form_cont.classList.add('d-block');
    form.dataset.todo = 'add';
  });

  edt_buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      form_cont.classList.add('d-block');
      fetchEvent(e.target.parentElement.id);
      form.dataset.id = e.target.parentElement.id;
      form.dataset.todo = 'edit';
    });
  });

  del_buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      deleteEvent(e.target.parentElement.id);
    });
  });

  // Form submit / add event
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let data = {
      title: document.getElementById('ev_form_title').value,
      body: document.getElementById('ev_form_body').value,
      date: document.getElementById('ev_form_date').value,
      type: document.getElementById('ev_type').value,
      id: form.getAttribute('data-id')
    }
    if(document.getElementById('ev_form_title').value.length > 0) {
      form_cont.classList.remove('d-block');
      let todo = form.getAttribute('data-todo');
      if(todo == 'add') {
        addEvent(data);
      } else if (todo == 'edit') {
        updateEvent(data);
      }
    } else showAlert('danger', `You have to add event title`);


  });

  cancel_btn.addEventListener('click', () => {
    form_cont.classList.remove('d-block');
  });

}

document.addEventListener('DOMContentLoaded', eventsPage, false);
