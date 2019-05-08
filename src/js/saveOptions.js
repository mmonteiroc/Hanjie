const ajustesOriginales = {
    dificultad: 0,
    colorCasilla: "#f30100",
    colorCruces: "#3858f3",
    sonido: true,
    tema: "light"
};

var ajustes = {};




document.querySelector('#guardarAjustes').addEventListener('click', function () {
    save();
});
document.querySelector('#resetSettings').addEventListener('click', function () {
    resetSettings();
});

initAjustes();


function initAjustes() {

    comprovarAjustes();
    asignarAjustes();

}


function comprovarAjustes() {
    if (localStorage.getItem('settings')) {
        ajustes = JSON.parse(localStorage.getItem('settings'))
    } else {
        ajustes = ajustesOriginales;
    }
}

function resetSettings() {
    ajustes = ajustesOriginales;
    var aj = JSON.stringify(ajustes);
    localStorage.setItem('settings', aj);
    asignarAjustes();
}


function save() {
    let ajustesGuardar = {
        dificultad: document.querySelector('#dificultad').value,
        colorCasilla: document.querySelector('#color-casilla').value,
        colorCruces: document.querySelector('#color-creu').value,
        /*Todo configurar sonido / tema*/
        sonido: false,
        tema: "light"
    };

    var aguardar = JSON.stringify(ajustesGuardar);
    localStorage.setItem('settings', aguardar);
}


/*Visual*/

/*
* Esta funcion nos permite que en la web salgan
* por defecto los ajustes del usuario guardados
* o los ajustes predeterminados
* */
function asignarAjustes() {
    //document.querySelector('#dificultad').value = x;
    document.querySelector('#dificultad').options.selectedIndex = parseInt(ajustes.dificultad);
    console.log(parseInt(ajustes.dificultad));

    document.querySelector('#color-casilla').value = ajustes.colorCasilla;
    document.querySelector('#color-creu').value = ajustes.colorCruces;

    if (ajustes.sonido) {
        document.querySelector('#sound-on').checked = true;
        document.querySelector('#sound-off').checked = false;
    } else {
        document.querySelector('#sound-on').checked = false;
        document.querySelector('#sound-off').checked = true;
    }

    if (ajustes.tema === 'light') {
        document.querySelector('#theme-light').checked = true;
        document.querySelector('#theme-dark').checked = false;
    } else {
        document.querySelector('#theme-light').checked = false;
        document.querySelector('#theme-dark').checked = true;
    }
}