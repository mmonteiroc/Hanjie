const canvas = document.querySelector('#canvasGame');
const context = canvas.getContext('2d');
const bounding = canvas.getBoundingClientRect();
let numBoxes = 2;
const width = canvas.width;
const height = canvas.height;
let tablero;
let ajustes = JSON.parse(localStorage.getItem('settings'))


document.querySelector('#canvasGame').addEventListener('click', event => {
    update(event);
});


function init() {


    setTimeout(function () {
        document.querySelector('.cargaJuego').style = "display:none"
        document.querySelector('#canvasGame').style = "display:block"
    }, 1500);


    if (localStorage.getItem('settings')) {
        if (ajustes.dificultad === "0") {
            numBoxes = 5
        } else if (ajustes.dificultad === "1") {
            numBoxes = 9
        }
    }


    tablero = new Tablero();
    tablero.init();

}

init();


function update(ev) {
    var x = ev.clientX - bounding.left;
    var y = ev.clientY - bounding.top;

    // ... x,y are the click coordinates relative to the
    // canvas itself
    console.log("---------");
    console.log("x: " + x);
    console.log("y: " + y);
    console.log("---------");
}


function Casilla(x, y, x1, y1) {

    // atributos
    this.x = x;
    this.x1 = x1;
    this.y = y;
    this.y1 = y1;
    this.width = this.x1 - this.x;
    this.height = this.y1 - this.y;


    /*Funciones*/
    this.pintar = function () {
        context.fillStyle = "#000000";
        context.strokeRect(this.x, this.y, this.x1, this.y1);

    };
}


function Tablero() {


    this.arrayCasillas = [];

    /*Funciones*/
    this.init = function () {
        var index = 1;

        var widthBox = width / numBoxes;
        var heigthBox = height / numBoxes;

        for (var i = 0; i < numBoxes; i++) {
            for (let j = 0; j < numBoxes; j++) {


                this.arrayCasillas.push(new Casilla(j * widthBox, i * heigthBox, j * widthBox + widthBox, i * heigthBox + heigthBox));
            }
        }
        this.pintar();
    };


    this.pintar = function () {
        for (let i = 0; i < this.arrayCasillas.length; i++) {
            this.arrayCasillas[i].pintar();
        }
    }
}




