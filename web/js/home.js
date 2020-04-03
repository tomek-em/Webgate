/* show alert about location using , maybe during login
 * add btn "allow" in weather box for not logged in
*/

(function() {
let bookmarks = [];

function showAlert(type, text) {
    const cont = document.querySelector('header');
    const before = document.querySelector('nav');
    const alert = document.createElement('div');
    alert.id = "alert";
    alert.className = `alert alert-${type} fixed_alert`;
    alert.appendChild(document.createTextNode(text));
    cont.insertBefore(alert, before );
    setTimeout(() => document.querySelector('#alert').remove(), 3000);
}

function showBookmarkCont() {
    document.getElementById('bookmark_input').value = '';
    let list = document.querySelectorAll('#bookmark_cont ul li');
    list.forEach((li) => {
       li.style.display = '';
    });

    document.querySelector('#bookmark_cont').classList.toggle('d-block');
}

function getRandom(num) {
  return Math.floor(Math.random()*num);
}

function getTime() {
  let date = new Date();
  let time = {
    day: date.getDay()-1,
    hour: date.getHours()
  }
}

function showPictureInfo() {
  let date = new Date();
  let day = date.getDay()-1;
  let time = date.getHours();
  //day = 4;
  let loc_num;

  let europe = {
    loc: ['gda', 'pol'],
    cur_loc: '',
    day_time: ''
   };

  let world = {
    loc: [ 'nyc', 'ama'],
    time_zone: [6, 4],
    cur_loc: '',
    day_time: ''
  };

  const picture = document.getElementById('hero_img');
  const place = document.getElementById('pic_name');
  const credit = document.querySelector('picture_details a');

  europe.cur_loc = europe.loc[getRandom(2)];
  world.cur_loc = world.loc[getRandom(2)];

  loc_num = Math.floor(day/4);
  europe.cur_loc = europe.loc[loc_num];
  world.cur_loc = world.loc[loc_num];

  if(time < 5 || time >= 19) {
    europe.day_time = 'n';
  } else if ((time >= 5 && time < 7) || (time >= 17 && time < 19)) {
    europe.day_time = 'g';
  } else {
    europe.day_time = 'd';
  }

  console.log({ loc_num, europe, world });
  //picture.style.backgroundImage = "url(web/img/pic2-min.jpg)";

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showTime() {
    let timer = document.querySelector('#timer');
    let time = new Date();
    let h = String(time.getHours()).padStart(2, '0');
    let min = String(time.getMinutes()).padStart(2, '0');
    let sec = String(time.getSeconds()).padStart(2, '0');

    timer.innerHTML = `${h}:${min}`;
    //await sleep(60000);
    //showTime();
}


/* BOKMARKS */

function filterBookmarks() {
    let cont = document.querySelector('#bookmark_cont');
    cont.classList.add('d-block');

    // get value of input
    filtered_value = document.querySelector('#bookmark_input').value.toLocaleLowerCase();
    console.log(filtered_value);

    // get li-s from ul
    let ul = document.querySelector('#bookmark_cont ul');
    let li = document.querySelectorAll('li.list-group-item');

    for(let i = 0; i <li.length; i++) {
        let a = li[i].getElementsByTagName('a')[0];
        if(a.innerHTML.toLowerCase().indexOf(filtered_value) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}


function createBookmarkList(logged) {
    let cont = document.querySelector('#bookmark_cont');
    let list = document.querySelector('#bookmark_cont ul');

    if(logged == false) {
        bookmarks[0] = {
            title: 'Google',
            web: 'http://google.com'
        }
        bookmarks[1] = {
            title: 'Youtube',
            web: 'http://youtube.com'
        }
    }

    bookmarks.forEach((bmr) => {
        let li = document.createElement('li');
        let bm_link = document.createElement('div');
        let a = document.createElement('a');
        let rmv = document.createElement('a');

        li.id = bmr.id;
        li.classList.add('list-group-item');

        a.href = bmr.web;
        a.setAttribute('target', '_blank');
        a.classList.add('bm_link');
        a.innerHTML = bmr.title;

        rmv.classList.add('rmv');
        rmv.innerHTML = 'Remove';

        li.appendChild(a);
        li.appendChild(rmv);
        list.appendChild(li);
    });

}


function addBookmark(title, web, group) {
    let url = `/webgate/bookmarks/addbookmark`;
    let xhr = new XMLHttpRequest();

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {
        if(xhr.status == 200) {
        let res = xhr.responseText;
        console.log(res);
        // alert
        showAlert('success', 'Bookmark added');
        getBookmarks();
        } else {
            console.log('error');
        }
    }
    xhr.send(`title=${title}&web=${web}&group=${group}`);
}

function deleteBookmark(id) {
    let url = `/webgate/bookmarks/deletebookmark`;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {
        if(xhr.status == 200) {
            let res = xhr.responseText;
            console.log(res);

            document.getElementById(id).remove();
            showAlert('success', 'Bookmark deleted');
        } else {
            console.log('error');
        }
    }
    xhr.send(`id=${id}`);
}



function clearBookmarkList() {
    bookmarks = [];
    document.querySelector('#bookmark_cont ul').innerHTML = '';
}

// get bookmarks
function getBookmarks() {
    let url = `/webgate/bookmarks/getbookmarks`;
    let xhr = new XMLHttpRequest();

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {
        if(xhr.status == 200) {
        let res = JSON.parse(xhr.responseText);
        clearBookmarkList();
        bookmarks = res;
        createBookmarkList(true);
        } else {
            console.log('error');
        }
    }
    xhr.send();
}




// LOCATION & WEATHER --

function showLocation(loc) {
    document.querySelector('#location_name').innerHTML = `${loc}, `;
}


function getWeather(lat, lon) {
    const temperature_deg = document.querySelector('#temperature_degree');
    const weather_description = document.querySelector('#weather_description');
    const weather_credit = document.querySelector('#weather_credit');

    // using promises
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const api = `${proxy}https://api.darksky.net/forecast/9afe9add45c0ea9bd31b62c5c3b7d0bf/${lat},${lon}?units=si`;
    console.log(api);
    fetch(api)
        .then(response => response.json())
        .then(data => {
            let temp = Math.floor(data.currently.temperature);

            let description = data.currently.summary;
            temperature_deg.textContent = `${temp} C `;
            weather_description.textContent = description;

            weather_credit.innerHTML = 'Powered by Dark Sky';
        })
    .catch(err => console.log(err));
}


function getLocation() {
    let endpoint = 'https://ipapi.co/json/';

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);

            let lat = response.latitude;
            let lon = response.longitude;
            let city = response.city;
            let timezone = response.timezone;

            showLocation(city);
            getWeather(lat, lon);
        }
    };
    xhr.open('GET', endpoint, true);
    xhr.send();
}



// EVENT LISTENERS --

function addEventListeners() {
    let form_cont = document.querySelector('#bookmark_form_cont');
    let main_area = document.querySelector('.hero_image');
    let search_input = document.querySelector('#bookmark_input');
    let main_cont = document.getElementById('main_cont');

    let dot_one = document.getElementById('dot_one');
    let dot_two = document.getElementById('dot_two');
    let main_wid = document.getElementById('main_box');
    let month_wid = document.getElementById('cal_box');
    let calendar = document.getElementById('calendar');
    let event_text = document.getElementById('event_text');

    // event - show add bookmark form
    document.querySelector('#new_bookmark_btn').addEventListener('click', (e) => {
        // check if logged in
        if (SESSION_USR) form_cont.classList.add('d-block');
        else {
            showAlert('danger', 'Log in to add new bookmark');
        }
    });

    // even - add bookmark submit
    document.querySelector('#bookmark_form').addEventListener('submit', (e) => {
        e.preventDefault();
        form_cont.classList.remove('d-block');
        let title = document.querySelector('#bookmark_form_title').value;
        let web = document.querySelector('#bookmark_form_web').value;
        let group = document.querySelector('#bookmark_form_group').value;

        if (title != '') {
            addBookmark( title, web, group );
        } else {
            showAlert('danger', 'You have to add boookmark title and web address')
        }
    })
    // event - cancel
    document.querySelector('#cancel_bookmark_btn').addEventListener('click', (e) => {
        form_cont.classList.remove('d-block');
    });

    // event - bookmarks
    main_area.addEventListener('click', (e) => {
        if(e.target.classList.contains('form-control')) {
            showBookmarkCont();
        } else if (e.target.classList.contains('rmv')) {
        } else {
            document.querySelector('#bookmark_cont').classList.remove('d-block');
        }
    });

    // event - search for bookmark
    search_input.addEventListener('keyup', filterBookmarks);

    // event - delete bookm
    document.querySelector('#bookmark_cont').addEventListener('click', (e) => {
        if(e.target.classList.contains('rmv')) {
            let bookmark_id = e.target.parentElement.id;
            deleteBookmark(bookmark_id);
        }
    });

    // event listener - change view
    dot_one.addEventListener('click', (e) => {
      dot_one.classList.add('active');
      dot_two.classList.remove('active');
      month_wid.classList.add('aside_right');
      main_wid.classList.remove('aside_left');
      event_text.classList.remove('d-block');
    });

    dot_two.addEventListener('click', (e) => {
      dot_one.classList.remove('active');
      dot_two.classList.add('active');
      calendar.classList.add('main_cal');
      main_wid.classList.add('aside_left');
      month_wid.classList.remove('aside_right');
      event_text.classList.add('d-block');
    });

    document.getElementById('hide_wid').addEventListener('click', (e) => {
      main_cont.classList.toggle('d-none');
    })
};

// ----
function setMainPage() {
    getLocation();
    showTime();
    showPictureInfo();
    setInterval (showTime, 60000);
    addEventListeners();
    if (SESSION_USR) {
        getBookmarks();
    } else {
        createBookmarkList(false);
    }
}

document.addEventListener('DOMContentLoaded', setMainPage, false);

}());
