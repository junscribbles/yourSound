
function beispielFetch() {

    //Die Grundlage für einen Fetch. Fetch ist eine Funktion, die einen Request an einen Server sendet und das Ergebnis zurückgibt
    //In der ersten Zeile wird der Link zur API definiert. Dieser kann immer angepasst werden.
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
    //Hier startet der Fetch mit der definierten URL.
    fetch(url)
        //Wenn der Fetch erfolgreich war, wird die Antwort in ein Objekt gespeichert.
        .then(response => response.json())
        //Wenn das Objekt gespeichert wurde, wird es in eine Variable gespeichert. Diese Variable heisst "data".
        .then(data => {
            //Hier kann man mit der Variable arbeiten. Entweder das DOM mit Informationen erweitern, oder eine neue Funktion aufrufen.
            //Mit "Console.log(data);" sieht man den Inhalt des Objekts.
            console.log(data);
            //Ab hier kann man entweder mit der Variable data arbeiten, oder eine funktion aufrufen mit data als Parameter.

            //Beispiel eines Funktionsaufrufs
            //"showSomething(data);"

        })
        //Bei einem Fehler wird dieser gefangen "catch" und eine Fehlermeldung in der Konsole ausgegeben.
        .catch(error => console.log(error))

}


function beispielFetchFormulardaten() {

    let formData = new FormData();
    formData.append('data1', data1);

    fetch("meinserver.ch/php/daten.php",
        {
            body: formData,
            method: "post",
        })

        .then((res) => {

            return res.text();

        })
        .then((data) => {

            document.querySelector('#nachricht').innerHTML = data;

        })

}

function fetchMitAuthorisierung() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    fetch("https://376009-17.web.fhgr.ch/php/holeWGs.php",
        {
            body: '',
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

        })
}

function WGsAnzeigen(data) {

    data.forEach(wg => {


        if (parseInt(wg.status)) {

            wg.status = '🟢';

        } else {

            wg.status = "🔴"

        }


        let wgContainer = document.createElement("div");
        wgContainer.innerHTML =

            '<div class="wg">' +
            '<h2>' + wg.status + ' ' + wg.titel + '</h2>' +
            '<img class="wg-image" src="' + wg.bild + '">' +
            '<p>' + wg.beschreibung + '</p>' +
            '📍 <a target="_blank" href="https://www.google.com/maps/search/?api=1&query=' + wg.adresse + '">' + wg.adresse + '</a> <br>' +
            '👉 <a target="_blank" href="https://www.google.com/maps/search/?api=1&query=' + wg.adresse + '">' + wg.email + '</a>' +
            '<p> <b> <span id="WG-' + wg.ID + '">  </span> <b> </p>'
            + '</div>';

        document.getElementById("liste-wg").appendChild(wgContainer);

        holeHashtagsVonWG(wg.ID);

    });

    function holeHashtagsVonWG(id) {

        let userID = localStorage.getItem('userID');
        let token = localStorage.getItem('token');

        let formData = new FormData();
        formData.append('wgID', id);

        fetch("https://376009-17.web.fhgr.ch/php/holeHashtagsVonWG.php",
            {
                body: formData,
                method: "post",
                headers: {

                    'Authorization': 'Basic ' + btoa(userID + ':' + token),

                }
            })

            .then((res) => {

                // error handling if session is expired
                if (res.status >= 200 && res.status < 300) {

                    return res.json();

                } else {

                    alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                    window.location = "/login.html"

                }

            })
            .then((data) => {

                if (data.length > 0) {

                    data.forEach(element => {

                        // füge die Hashtags ins Dokument ein 
                        // (hook: ID, welche in der Funktion WGsAnzeigen dynamisch vergeben wird)
                        document.getElementById("WG-" + id).innerHTML += '#' + element.hashtag + ' ';

                    });

                }

            })

    }

}

function holeUserWG() {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    fetch("https://376009-17.web.fhgr.ch/php/holeUserWG.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // error handling if session is expired
            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            // falls es noch keine WG zu diesem User gibt
            // falls es noch keine WG zu diesem User gibt
            // falls es noch keine WG zu diesem User gibt
            if (data.length == 0) {

                // zeige Infotext an
                document.querySelector('#infoText').innerHTML = "Fülle dieses Formular aus, um deine WG aufzuschalten:"

                // zeige den korrekten Button an
                document.querySelector('#button-neue').classList.remove("hidden");

                // falls es bereits eine WG zu diesem User gibt
                // falls es bereits eine WG zu diesem User gibt
                // falls es bereits eine WG zu diesem User gibt
            } else {

                // speichere die wg ID in der globalen variable
                // diese brauchen wir später zum aktualisieren und löschen der WG
                wgID = data[0].ID;

                // zeige Infotext an
                document.querySelector('#infoText').innerHTML = "Hier kannst du deine WG bearbeiten:"

                // zeige den korrekten Button an
                document.querySelector('#button-aktualisieren').classList.remove("hidden");
                document.querySelector('#button-loeschen').classList.remove("hidden");

                // fülle das Formular mit den Werten aus der DB aus
                document.querySelector('#titel').value = data[0].titel;
                document.querySelector('#adresse').value = data[0].adresse;
                document.querySelector('#beschreibung').value = data[0].beschreibung;
                document.querySelector('#stadt').value = data[0].stadt;
                document.querySelector('#bild').value = data[0].bild;
                document.querySelector('#bild-vorschau').src = data[0].bild;

                // setze den korrekten Status (Radiobutton) aus den Infos der DB
                if (data[0].status == 1) {

                    document.querySelector('#status-frei').checked = true;

                } else {

                    document.querySelector('#status-besetzt').checked = true;

                }

                // färbe die Hashtags dieser WG korrekt ein
                holeHashtagsVonWG(wgID);

            }
        })
}

function aktualisiereWG() {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    // Formulardaten in Body übertragen
    let titel = document.querySelector('#titel').value;
    let adresse = document.querySelector('#adresse').value;
    let beschreibung = document.querySelector('#beschreibung').value;
    let stadt = document.querySelector('#stadt').value;
    let bild = document.querySelector('#bild').value;
    let status = document.querySelector('input[name="status"]:checked').value;

    let jsonHashtags = JSON.stringify(hashtags)

    let formData = new FormData();
    formData.append('userID', userID);
    formData.append('titel', titel);
    formData.append('adresse', adresse);
    formData.append('beschreibung', beschreibung);
    formData.append('stadt', stadt);
    formData.append('status', status);
    formData.append('bild', bild);
    formData.append('hashtags', jsonHashtags);

    formData.append('wgID', wgID);

    fetch("https://376009-17.web.fhgr.ch/php/aktualisiereWG.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // error handling if session is expired
            if (res.status >= 200 && res.status < 300) {

                return res.text();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            // zeige die Nachricht an
            document.querySelector('#nachricht').innerHTML = data;

        })
}

function loescheWG() {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);
    formData.append('wgID', wgID);

    fetch("https://376009-18.web.fhgr.ch/php/loescheWG.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // error handling if session is expired
            if (res.status >= 200 && res.status < 300) {

                return res.text();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            console.log(data);
            document.querySelector('#nachricht').innerHTML = data;

            // button aktualisieren
            document.querySelector('#button-neue').classList.remove("hidden");
            document.querySelector('#button-aktualisieren').classList.add("hidden");
            document.querySelector('#button-loeschen').classList.add("hidden");

            // Formularfelder leeren
            document.querySelector('#titel').value = "";
            document.querySelector('#adresse').value = "";
            document.querySelector('#beschreibung').value = "";
            document.querySelector('#stadt').value = "";
            document.querySelector('#bild').value = "";
            document.querySelector('#status-frei').checked = false;
            document.querySelector('#status-besetzt').checked = false;

            document.querySelector('#bild-vorschau').src = "";

            document.querySelector('.hashtag').style = "Color: black;"

            // Variablen leeren
            hashtags = [];
            wgID = "";



        })
};


// Funktionen für Hashtags
// Funktionen für Hashtags
// Funktionen für Hashtags
// Funktionen für Hashtags
// Funktionen für Hashtags


function holeAlleHashtags() {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    fetch("https://376009-17.web.fhgr.ch/php/holeAlleHashtags.php",
        {
            body: "",
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // error handling if session is expired
            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            data.forEach(hashtag => {

                // schreibe Hashtags ins HTML
                let dieserHashtag = document.createElement("div");

                dieserHashtag.innerHTML = " <p onclick='addHashtag(" + hashtag.ID + ")' id='" + hashtag.ID + "' class='hashtag'> #" + hashtag.hashtag + "</p> ";

                dieserHashtag.style = 'margin-right: 10px; cursor: pointer;';
                document.getElementById("hashtags").appendChild(dieserHashtag);

            });

        })
}

function addHashtag(id) {

    // Prüfe, ob hashtag bereits im Array ist 
    if (hashtags.indexOf(id) == -1) {

        document.getElementById(id).style = "Color: blue;"

        hashtags.push(id);

    } else {

        document.getElementById(id).style = "Color: black;"

        hashtags.splice(hashtags.indexOf(id), 1);

    }

}

function holeHashtagsVonWG(id) {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('wgID', id);

    fetch("https://376009-17.web.fhgr.ch/php/holeHashtagsVonWG.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // error handling if session is expired
            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            if (data) {

                data.forEach(hashtag => {

                    // färbe die hashtags ein
                    document.getElementById(hashtag.ID).style = "color: Blue;";

                    // pushe die hashtags in die globale variable
                    hashtags.push(parseInt(hashtag.ID));

                });

            }

        })

}