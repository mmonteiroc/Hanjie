const canvas = document.querySelector('#canvasGame');
const context = canvas.getContext('2d');
let bounding;
let numBoxes = 7;
const width = canvas.width;
const height = canvas.height;
let tablero;
let colorFondo = "#effffd";
let ajustes = JSON.parse(localStorage.getItem('settings'))
let colorCasilla = "#f30100";


document.querySelector('#canvasGame').addEventListener('click', event => {
    update(event);
});

init();
function init() {
    setTimeout(function () {
        document.querySelector('.cargaJuego').style = "display:none";
        document.querySelector('#canvasGame').style = "display:block";
        bounding = canvas.getBoundingClientRect()
    }, 1500);

    if (localStorage.getItem('settings')) {
        if (ajustes.dificultad === "0") {
            numBoxes = 8
        } else if (ajustes.dificultad === "1") {
            numBoxes = 11
        }

        colorFondo = ajustes.colorFondo;
        colorCasilla = ajustes.colorCasilla;
    }
    tablero = new Tablero();
    tablero.init();
}


function update(ev) {
    var x = ev.clientX - bounding.left;
    var y = ev.clientY - bounding.top;

    // ... x,y are the click coordinates relative to the
    // canvas itself
    console.log("---------");
    console.log("x: " + x);
    console.log("y: " + y);
    console.log("---------");
    tablero.checkClick(x, y);
}


function Casilla(x, y, W, H, fila, columna) {

    // atributos
    this.x = x;
    this.y = y;
    this.width = W;
    this.height = H;
    this.x1 = this.x + this.width;
    this.y1 = this.y + this.height;
    this.fila = fila;
    this.columna = columna;
    this.fondo = colorFondo;
    this.pulsada = false;

    /*Funciones*/
    this.pintar = function () {
        context.clearRect(this.x, this.y, this.width, this.height);
        if (this.fila === 0 || this.columna === 0) {
            context.strokeStyle = "#343a36";
            context.fillStyle = "#f9f9f9";
        } else {
            context.strokeStyle = "#0010f3";
            context.fillStyle = this.fondo;
        }


        context.fillRect(this.x, this.y, this.width, this.height);
        context.strokeRect(this.x, this.y, this.width, this.height);
    };
}


function Tablero() {

    this.arrayCasillas = [];
    this.sizeBox = 0;
    /*Funciones*/
    this.init = function () {
        var index = 1;

        this.sizeBox = width / numBoxes;
        console.log(this.sizeBox);
        var x;
        var y;


        for (var i = 0; i < numBoxes; i++) {
            for (let j = 0; j < numBoxes; j++) {
                x = j * this.sizeBox;
                y = i * this.sizeBox;
                this.arrayCasillas.push(new Casilla(x, y, this.sizeBox, this.sizeBox, i, j));

            }
        }
        this.pintar();
    };


    this.pintar = function () {
        for (let i = 0; i < this.arrayCasillas.length; i++) {
            this.arrayCasillas[i].pintar();
        }
    };



    /*Comprovar que casilla hemos pulsado*/
    this.checkClick = function (x, y) {
        let xCasilla = Math.floor(x / this.sizeBox);
        let yCasilla = Math.floor((y) / this.sizeBox);
        let casilla = (yCasilla * numBoxes) + xCasilla;
        console.log("Has pulsado la casilla :" + yCasilla + " - " + xCasilla);
        console.log("Casilla: " + casilla);


        if (this.arrayCasillas[casilla].pulsada) {
            console.log("Ya esta pulsada");
            this.arrayCasillas[casilla].pulsada = false;
            this.arrayCasillas[casilla].fondo = colorFondo;
        } else {
            this.arrayCasillas[casilla].pulsada = true;
            this.arrayCasillas[casilla].fondo = colorCasilla;
        }
        this.arrayCasillas[casilla].pintar();
    }
}




