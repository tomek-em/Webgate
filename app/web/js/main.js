function getText() {
    console.log('js works');
    
    const url_gh = 'https://api.github.com/users';
    const url = 'user/test';
    const text = document.querySelector('main');
    console.log(url);
    
    //const users = document.querySelector('.week-content');
    //const btn = document.querySelector('#get-data');
    
    window.onload = () => {
        // create XMR Obj
        let xhr = new XMLHttpRequest();
        // OPEN - type ,url/filr, async
        xhr.open('GET', url, true);
        
        xhr.onload = () => {
            if(xhr.status == 200) {
                //let users = JSON.parse(xhr.responseText) ; 
                //text.innerHTML = users[1]['login'];
                let data = this.responseText;
                console.log(data);
            } else {
                console.log('Error');
            }
        }
        
        xhr.send();
        
        // HTTP Statuses
        // 200: OK
        // 403: "Frobidden"
        // 404: "Not Found"
        console.log('xhr');
    }
}
    
    
    
const dataReq = () => {
    //const url = '/webgate/events/test';
    const url = '/webgate/user/test';
    console.log(url);
    
    const text = document.querySelector('main');
    const btn = document.querySelector('#load-link');
    
    btn.addEventListener('click', () => {
        // create XMR Obj
        let xhr = new XMLHttpRequest();
        
        // OPEN - type ,url, async
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        
        xhr.onload = function() {   // ES6 () => wont work with this
            if(xhr.status == 200) {
                let data = this.responseText
                console.log(data);
                text.innerHTML = data;
            } else {
                console.log('Error');
            }
        }
        
        xhr.send();

        //document.querySelector('h2').classList.add('color-blue');
    });

}

dataReq();