// fetch form server function for week_proc.js and home.js
// other files need to be edited

// I use POST method to send and fetch data
//

function getApi(url, data) {
  return fetch(url, {
    method: 'post',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: data
  })
}


function deleteReq(url, data) {
  return fetch(url, {
    method: 'delete',
    headers: {
       'Content-Type': 'application/json'
    }
  })
}
