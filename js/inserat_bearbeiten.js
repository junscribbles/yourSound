inseratBearbeiten();

function inseratBearbeiten() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');
    let advertID = sessionStorage.getItem("advertId");

    let formData = new FormData();
    formData.append('userID', userID);
    formData.append('advertID', advertID);

    fetch("https://324886-3.web.fhgr.ch/php/inseratBearbeiten.php",
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

            document.querySelector('#title').value = data[0].title;
            document.querySelector('#detail').value = data[0].detail;
            document.querySelector('#image').value = data[0].image;
            document.querySelector('#city').value = data[0].city;
            document.querySelector('#time').value = data[0].time;

            if (data[0].type == 0) {

                document.querySelector('#anbieten').checked = true;

            } else {

                document.querySelector('#suchen').checked = true;

            }
        })
}

function updateAdvert() {


    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');
    let advertID = sessionStorage.getItem("advertId");

    let title = document.querySelector("#title").value;
    let detail = document.querySelector("#detail").value;
    let image = document.querySelector("#image").value;
    let city = document.querySelector("#city").value;
    let time = document.querySelector("#time").value;
    let type = document.querySelector("input[name='Frage']:checked").value;

    let formData = new FormData();
    formData.append('user', userID);
    formData.append('advertID', advertID);

    formData.append('title', title);
    formData.append('detail', detail);
    formData.append('image', image);
    formData.append('city', city);
    formData.append('time', time);
    formData.append('type', type);

    fetch("https://324886-3.web.fhgr.ch/php/updateAdvert.php",
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

            window.location = 'meine_Inserate.html'


        })
}