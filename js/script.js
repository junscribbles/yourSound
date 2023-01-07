holeUser();
holeAdverts();

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
            console.log(data);

            // console.log(data[0].name);

            //document.querySelector("#username").innerHTML = data[0].name;

        })
}

function holeAdverts() {


    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    fetch("https://324886-3.web.fhgr.ch/php/holeAdverts.php",
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
            console.log(data);

            AdvertsAnzeigen(data);

            // console.log(data[0].name);


        })

}

function AdvertsAnzeigen(data) {

    data.forEach(advert => {

        
        if (parseInt(advert.type) == 1){

            advert.type = '🔎';

        } else {

            advert.type = "📌"

        }

        
        let advertContainer = document.createElement("div");
        advertContainer.innerHTML =

            '<div class="advert" style="margin-bottom: 20px">' +
            '<h2>' + advert.type + ' ' + advert.title + '</h2>' +
            '<img class="advert-image" style="max-width: 20%" src="' + advert.image + '">' +
            '<p>' + advert.detail + '</p>' +
            '👉 <a target="_blank" href="mailto:'+ advert.email + '">' + advert.email + '</a>' +
            '</div>';

        document.getElementById("adverts").appendChild(advertContainer);

    });

}