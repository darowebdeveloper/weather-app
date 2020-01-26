const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const loader = document.getElementById("loader");
const msg1 = document.querySelector('p#msg1');
const msg2 = document.querySelector('p#msg2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    getForecast(location, msg1, msg2);
    console.clear();
    search.value = '';
});

function getForecast (address, msg1, msg2) {
    loader.style.display = "block";
    fetch('/weather?address='+address).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error;
                console.log(data.error);
                loader.style.display = "none";
            } else {
                loader.style.display = "none";
                msg1.textContent = data.location;
                msg2.textContent = data.forecast;
                console.log(data.location);
                console.log(data.forecast);
            }
        });
    });
}
