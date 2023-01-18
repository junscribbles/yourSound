holeUser();

function holeUser() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    fetch("https://324886-3.web.fhgr.ch/php/holeUser.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // falls die Sitzung nicht abgelaufen ist, verarbeite die JSON antwort
            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            // mache etwas
            // console.log(data);

            // Name in Titel anzeigen
            document.querySelector("#username").innerHTML = data[0].name;

            document.querySelector('#name').value = data[0].name;
            document.querySelector('#year').value = data[0].year;
            document.querySelector('#email').value = data[0].email;

        })
}


function updateProfile() {
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let name = document.querySelector('#name').value;
    let year = document.querySelector('#year').value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    let formData = new FormData();
    formData.append('user', userID);

    formData.append('username', name);
    formData.append('year', year);
    formData.append('email', email);
    formData.append('password', password);

    fetch("https://324886-3.web.fhgr.ch/php/updateUser.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // falls die Sitzung nicht abgelaufen ist, verarbeite die JSON antwort
            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            // mache etwas
            // console.log(data);

            let nachricht = document.getElementById('nachricht');
            nachricht.innerHTML = 'Profil wurde aktualisiert';


        })
}

function askDelete() {

    if (confirm('Bist du sicher, dass du dein Profil löschen willst? Dadurch gehen auch deine Inserate und Kontakte verloren.')) {

        // OK!
        console.log('OK!');
        deleteProfile();

      } else {

        // Cancel! and do nothing

      }
}

function deleteProfile() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    fetch("https://324886-3.web.fhgr.ch/php/deleteUser.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // falls die Sitzung nicht abgelaufen ist, verarbeite die JSON antwort
            if (res.status >= 200 && res.status < 300) {

                return res.text();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            // mache etwas
            console.log(data);
            // logout();

        })
}


function logout() {
    window.location = "/login.html";
    localStorage.clear();
}