holeKontakte();

function holeKontakte() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);
    

    fetch("https://324886-3.web.fhgr.ch/php/holeKontakte.php",
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

            zeigeKontakte(data);

        })
}

function zeigeKontakte(data) {

    data.forEach(contact => {

        let parentDiv = document.getElementById("contactContainer");
        let contactContainer = document.createElement("div");

        contactContainer.classList.add("contact")
        parentDiv.appendChild(contactContainer);

        contactContainer.innerHTML =
            '<h3>' + contact.name + ' (' + berechneAlter(contact) + ') </h3>' + 
            '<h4>' + contact.email + '</h4>'
            ;

            function berechneAlter(contact) {
                let today = new Date().getFullYear();
                return(today - contact.year);
            }
    })

    
}