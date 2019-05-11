document.querySelector('#closePopUp').addEventListener('click', function () {
    document.querySelector('#advice').style = "display:none";
    var closed = {
        date: Date.now()
    };
    localStorage.setItem('closed', JSON.stringify(closed));
});


if (localStorage.getItem('closed')) {
    document.querySelector('#advice').style = "display:none";
}


