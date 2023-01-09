holeAbgelehnt();

function holeAbgelehnt() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);
    

    fetch("https://324886-3.web.fhgr.ch/php/holeAbgelehnt.php",
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

            zeigeAbgelehnt(data);

        })
}

function zeigeAbgelehnt(data) {

    data.forEach(denied => {

        let parentDiv = document.getElementById("deniedContainer");
        let contactContainer = document.createElement("div");

        contactContainer.classList.add("denied")
        parentDiv.appendChild(contactContainer);

        contactContainer.innerHTML =
            '<h3>' + denied.name + ' (' + berechneAlter(denied) + ') </h3>';

            function berechneAlter(denied) {
                let today = new Date().getFullYear();
                return(today - denied.year);
            }
    })

    
}