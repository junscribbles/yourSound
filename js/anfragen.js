holeAnfragen();

function holeAnfragen() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);
    

    fetch("https://324886-3.web.fhgr.ch/php/holeAnfragen.php",
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

            zeigeAnfragen(data);

        })
}

function zeigeAnfragen(data) {

    data.forEach(request => {

        let parentDiv = document.getElementById("requestContainer");
        let contactContainer = document.createElement("div");

        contactContainer.classList.add("request");
        // contactContainer.setAttribute("id", request.id);
        parentDiv.appendChild(contactContainer);

        contactContainer.innerHTML =
            '<h3>' + request.name + ' (' + berechneAlter(request) + ') </h3>' +
            '<div class="buttons" id="' + request.id + '">' +
            '<button onclick="annehmen(this)">Annehmen</button>' +
            '<button onclick="ablehnen(this)">Ablehnen</button>'
            '</div>'
            ;

            function berechneAlter(request) {
                let today = new Date().getFullYear();
                return(today - request.year);
            }
    })

    
}

function annehmen(element) {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');
    let requestID = element.parentNode.id;

    // console.log(element.parentNode.id);

    let formData = new FormData();
    formData.append('userID', userID);
    formData.append('requestID', requestID);
    

    fetch("https://324886-3.web.fhgr.ch/php/anfrageAnnehmen.php",
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

function ablehnen(element) {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');
    let requestID = element.parentNode.id;

    // console.log(element.parentNode.id);

    let formData = new FormData();
    formData.append('userID', userID);
    formData.append('requestID', requestID);
    

    fetch("https://324886-3.web.fhgr.ch/php/anfrageAblehnen.php",
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