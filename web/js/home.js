
(function() {
let bookmarks = [];
let filtered_value;

const pic_inf = {
  gda: ['Image by Gruu from Pixabay', 'Natalia Mejer', 'judy-vos-WiO6iMq-nfs-unsplash', '', 'Gdańsk' ],
  pol: ['', 'Janusz Maniak on Unsplash', 'Photo by Anna Augustowska on Unsplash', '', 'Poland'],
  nyc: ['','','Photo by Jonathan Riley on Unsplash','', 'New York City'],
  ama:['','vishnu-prasad-VGWnXfbf-G4-unsplash.jpg','','', 'Amazon rain forest'],
  por:['Pier Francesco Grizi on Unsplash', 'Andreas Brücker on Unsplash', 'Mélanie Martin on Unsplash', '', 'Portugal'],
  rio:['Gabriel Santos on Unsplash', 'Davi Costa on Unsplash', 'Raphael Nogueira on Unsplash', '', 'Rio de Janeiro'],
  nor:['Photo by Kristin Wilson on Unsplash','Photo by Valdemaras D. on Unsplash','Photo by Maksim Shutov on Unsplash','','Norwegia'],
  ari:['Photo by lovely shots on Unsplash','Photo by Carles Turon on Unsplash','Photo by Mar Bocatcat on Unsplash','','Monument Valley AZ']
}


const europe = {
  loc: ['gda', 'pol', 'por', 'nor'],
 };

const world = {
  loc: [ 'nyc', 'ama', 'rio', 'ari'],
  timezone: [-6, -5, -3, -7],
};

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




/* Set picture*/

function getRandom(num) {
  return Math.floor(Math.random()*num);
}

// set local time for location and select picture daytime
function getDayTime(time, loc) {
  if(time < 5 || time >= 20) {
    return 0;
  } else if ((time >= 5 && time < 7) || (time >= 17 && time < 20)) {
    return 1;
  } else {
    return 2;
  }
  // extra picture
  if ((loc == 'ama' && time >= 15 && time < 17) || (loc == 'pol' && 1 == 2)) {
    return 3;
  }
}

function showPicture(url) {
  const waiting_scr = document.getElementById('waiting_layer');
  const bg_pic = document.getElementById('hero_img');
  let image = new Image();
  image.onload = function(){
     bg_pic.style.backgroundImage = (`linear-gradient(to bottom, rgba(0,0,0, 0.05) 0%,rgba(0,0,0,0.4) 1%,rgba(0,0,0,0.1) 100%),
     url( ${url} ) `);
     if( waiting_scr ) waiting_scr.remove();
  };
  image.src = url;
}

function setHero(loc, daytime) {
  const place = document.getElementById('pic_name');
  const credit = document.querySelector('.picture_details a');

  let pic_loc = `web/img/bg/${loc}/${loc}-${daytime}.jpg`;
  showPicture(pic_loc);
  // picture.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0, 0) 0%,rgba(0,0,0,0.4) 1%,rgba(0,0,0,0.1) 100%), ${url}`;

  place.innerHTML = pic_inf[loc][4];
  credit.innerHTML = `photo by: ${pic_inf[loc][daytime]}`;
}

function selectPicture(loc_europe) {
  let fulldate = new Date();
  let date = fulldate.getDate();
  date = date;
  let time = fulldate.getHours();
  let loc_num;
  let cur_location;
  let location_time;
  let daytime;

  // Select localization algorithm
  loc_num = Math.floor((date)%4);
  // console.log(date, loc_num);

  if(loc_europe) {
    cur_location = europe.loc[loc_num];
    location_time = time;
  } else {
    cur_location = world.loc[loc_num];
    location_time = time + world.timezone[loc_num];
      if(location_time < 0) {
        location_time = 24 + location_time;
      } else if (location_time > 23) {
        location_time = location_time - 24;
      }
  }

  daytime = getDayTime(location_time, cur_location);
  setHero(cur_location, daytime);
}

// Set hero images intarval
function setPicture() {
  let loc_europe = true;
  selectPicture(loc_europe);
  setInterval( () => {
    loc_europe = !loc_europe;
    selectPicture(loc_europe);
  }, 120000);
}


/* Set clock functions */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getTime() {
    const timer = document.querySelector('#timer');
    let time = new Date();
    let h = String(time.getHours()).padStart(2, '0');
    let min = String(time.getMinutes()).padStart(2, '0');

    timer.innerHTML = `${h}:${min}`;
}



/* BOKMARKS */

function showBookmarkCont() {
    document.getElementById('bookmark_input').value = '';
    const list = document.querySelectorAll('#bookmark_cont ul li');
    list.forEach((li) => {
       li.style.display = '';
    });

    document.querySelector('#bookmark_cont').classList.toggle('d-block');
    document.getElementById('google_search').style.display = 'none';
}

function filterBookmarks() {
    let cont = document.querySelector('#bookmark_cont');
    cont.classList.add('d-block');
    document.getElementById('google_search').style.display = '';

    // get value of input
    filtered_value = document.querySelector('#bookmark_input').value.toLocaleLowerCase();

    // get li-s from ul
    let ul = document.querySelector('#bookmark_cont ul');
    let li = document.querySelectorAll('li.list-group-item');

    for(let i = 0; i <li.length; i++) {
        let a = li[i].getElementsByTagName('a')[0];
        if(a.innerHTML.toLowerCase().indexOf(filtered_value) > -1) {
            li[i].style.display = '';
        } else {
            if( li[i].id != 'google_search' ) li[i].style.display = 'none';
        }
    }
}


function createBookmarkList(logged) {
    const cont = document.querySelector('#bookmark_cont');
    const list = document.querySelector('#bookmark_cont ul');

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

    // add google search bookmark
    bookmarks.push({
      title: 'Search on google',
      web: '',
      id: 'google_search'
    });


    bookmarks.forEach((bmr) => {
        let li = document.createElement('li');
        let bm_link = document.createElement('div');
        let a = document.createElement('a');
        let rmv = document.createElement('a');

        li.id = bmr.id;
        li.classList.add('list-group-item');
        li.addEventListener('click', (e) => {
          if(e.target.classList.contains('rmv')) {
            //
          } else if (e.target.id == 'google_search' || e.target.parentElement.id == 'google_search') {
            window.open(`https://google.com/search?q=${filtered_value}`, '_blank');
          } else {
            window.open(bmr.web, '_blank');
          }
        });

        //a.href = bmr.web;
        a.setAttribute('target', '_blank');
        a.classList.add('bm_link');
        a.innerHTML = bmr.title;

        rmv.classList.add('rmv');
        rmv.innerHTML = 'Remove';

        li.appendChild(a);
        if( li.id != 'google_search' ) li.appendChild(rmv);
        list.appendChild(li);

    });
}

function addBookmark(title, web, group) {
  let url = '/webgate/bookmarks/addbookmark';

  getApi(url, `title=${title}&web=${web}&group=${group}`)
  .then((res) => {
      showAlert('success', 'Bookmark added');
      getBookmarks();
    })
    .catch(function() {
        console.log("error");
    });
}


function deleteBookmark(id) {
  let url = '/webgate/bookmarks/deletebookmark';

  getApi(url, `id=${id}`)
  .then((res) => {
      document.getElementById(id).remove();
      showAlert('success', 'Bookmark deleted');
    })
    .catch(function() {
        console.log("error");
    });
}


function clearBookmarkList() {
    bookmarks = [];
    document.querySelector('#bookmark_cont ul').innerHTML = '';
}

// get bookmarks
function getBookmarks() {
  let url = '/webgate/bookmarks/getbookmarks';

  getApi(url, ``)
  .then((res) => res.json())
  .then((json) => {
    json.forEach((ev, i) =>  {
      clearBookmarkList();
      bookmarks = json;
    });
    createBookmarkList(true);
  })
  .catch(function() {
      console.log("error");
  });
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

function getLocation(id, dates) {
  let events = {};
  let endpoint = 'https://ipapi.co/json';

  fetch(endpoint, {
    method: 'get'
  })
    .then((res) => res.json())
    .then((response) => {
      let lat = response.latitude;
      let lon = response.longitude;
      let city = response.city;
      let timezone = response.timezone;

      showLocation(city);
      getWeather(lat, lon);
    })
    .catch(function() {
        console.log("error");
    });
}



// EVENT LISTENERS --

function addEventListeners() {
    const form_cont = document.querySelector('#bookmark_form_cont');
    const main_area = document.querySelector('.hero_image');
    const bookmark_cont = document.querySelector('#bookmark_cont');
    const search_input = document.querySelector('#bookmark_input');
    const main_cont = document.getElementById('main_cont');

    const dot_one = document.getElementById('dot_one');
    const dot_two = document.getElementById('dot_two');
    const main_wid = document.getElementById('main_box');
    const month_wid = document.getElementById('cal_box');
    const calendar = document.getElementById('calendar');
    const event_text = document.getElementById('event_text');

    // event - show 'add bookmark' form
    document.querySelector('#new_bookmark_btn').addEventListener('click', (e) => {
        // check if logged in
        if (SESSION_USR) form_cont.classList.add('d-block');
        else {
            showAlert('danger', 'Log in to add new bookmark');
        }
    });

    // even - 'add bookmark' submit
    document.querySelector('#bookmark_form').addEventListener('submit', (e) => {
        e.preventDefault();
        form_cont.classList.remove('d-block');
        const title = document.querySelector('#bookmark_form_title').value;
        const web = document.querySelector('#bookmark_form_web').value;
        const group = document.querySelector('#bookmark_form_group').value;

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

    // search on Enter key
    document.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && filtered_value != null && bookmark_cont.classList.contains('d-block')) {
        window.open(`https://google.com/search?q=${filtered_value}`, '_blank');
      }
    });

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
};  // END of EventListeners


// Remove loading / waiting screen
function removeWaitingScr() {
  document.getElementById('waiting_layer').remove();
}

// ----
function setMainPage() {
    getLocation();
    getTime();
    setInterval (getTime, 60000);
    setPicture();
    addEventListeners();
    if (SESSION_USR) {
        getBookmarks();
    } else {
        createBookmarkList(false);
    }
}

document.addEventListener('DOMContentLoaded', setMainPage, false);

}());
