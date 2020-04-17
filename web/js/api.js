// fetch form server function for week_proc.js and home.js
// other files need to be edited

function getApi(url, dt) {
  return fetch(url, {
    method: 'post',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: dt
  })
}
