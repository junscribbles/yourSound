function neuesAdvert() {
    let title = document.querySelector("#title").value;
    let detail = document.querySelector("#detail").value;
    let image = document.querySelector("#image").value;
    let city = document.querySelector("#city").value;
    let time = document.querySelector("#time").value;
    let type = document.querySelector("input[name='Frage']:checked").value;

    let formData = new FormData();
    formData.append('title', title);
    formData.append('detail', detail);
    formData.append('image', image);
    formData.append('city', city);
    formData.append('time', time);
    formData.append('type', type);

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    formData.append('user', userID);

    // return;

    fetch("https://324886-3.web.fhgr.ch/php/neuesAdvert.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((response) => {
            let txt = response.text();
            console.log(txt);

            return txt;

        })
        .then((data) => {

            // console.log(data);
            // document.querySelector('#nachricht').innerHTML = data;

            window.location = 'meine_Inserate.html';

        })
}