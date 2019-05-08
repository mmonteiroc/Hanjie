let ajustesOriginales = {
    dificultad: "easy",
    colorCasillasMarcadas: "blue",
    colorCruces: "negro",
    sonido: true,
    tema: "claro"
};

let ajustes = {};

if (localStorage.getItem('settings')) {
    ajustes = JSON.parse(localStorage.getItem('settings'))
} else {
    ajustes = ajustesOriginales;
}


document.querySelector('#guardarAjustes').addEventListener('click', function () {
    save();
});


function save() {
    let ajustesGuardar = {
        dificultado: document.querySelector('#dificultad').value,
        colorCasilla: document.querySelector('#color-casilla').value,
        colorCruces: document.querySelector('#color-creu').value,
        sonido: false,
        tema: "claro"
    };

    var aguardar = JSON.stringify(ajustesGuardar);
    localStorage.setItem('settings', aguardar);
}


