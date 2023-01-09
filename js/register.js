function register(){
    const name = document.getElementById('name').value;
    const year = document.getElementById('year').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // console.log(name + year + email + password)

    let formData = new FormData();
    formData.append('username', name);
    formData.append('year', year);
    formData.append('email', email);
    formData.append('password', password);

    fetch("https://324886-3.web.fhgr.ch/php/register.php",
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