holeAdverts();

function holeAdverts() {


    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    fetch("https://324886-3.web.fhgr.ch/php/eigeneAdverts.php",
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
        advertContainer.classList.add("advert");
        // advertContainer.setAttribute("id", advert.id)
        advertContainer.innerHTML =

            '<h2>' + advert.type + ' ' + advert.title + '</h2>' +
            '<div class="image-container">' +
            '<img class="advert-image" src="' + advert.image + '">' +
            '</div>' +
            '<div class="details">' +
            '<p>' + advert.detail + '</p>' + '<br>' +
            '<p>Wo?</p>' +
            '<p>' + advert.city + '</p>' + '<br>' +
            '<p>Wann?</p>' +
            '<p>' + advert.time + '</p>' +
            '</div>' +
            '<button class="edit" id="' + advert.id + '"onclick="editAdvert(this)">Inserat bearbeiten</button>' +
            '<button class="delete" id="' + advert.id + '"onclick="deleteAdvert(this)">Inserat löschen</button>';

        document.getElementById("adverts").appendChild(advertContainer);

    });
}

function editAdvert(element) {
    sessionStorage.setItem("advertId", element.id)
    window.location = "inserat_bearbeiten.html";
}

function deleteAdvert(element) {


    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');
    let advertID = element.id;

    let formData = new FormData();
    formData.append('userID', userID);
    formData.append('advertID', advertID);

    fetch("https://324886-3.web.fhgr.ch/php/deleteAdvert.php",
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

            location.reload();


        })
}