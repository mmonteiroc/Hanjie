const canvas = document.querySelector('#canvasGame');
const context = canvas.getContext('2d');
const bounding = canvas.getBoundingClientRect();
let numBoxes = 7;
const width = canvas.width;
const height = canvas.height;
let tablero;


let ajustes = JSON.parse(localStorage.getItem('settings'))


document.querySelector('#canvasGame').addEventListener('click', event => {
    update(event);
});

init();
function init() {


    setTimeout(function () {
        document.querySelector('.cargaJuego').style = "display:none"
        document.querySelector('#canvasGame').style = "display:block"
    }, 1500);


    if (localStorage.getItem('settings')) {
        if (ajustes.dificultad === "0") {
            numBoxes = 5
        } else if (ajustes.dificultad === "1") {
            numBoxes = 11
        }
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



    /*Funciones*/
    this.pintar = function () {

        if (this.fila === 0 || this.columna === 0) {
            context.strokeStyle = "#343a36";
            context.fillStyle = "#f9f9f9";
        } else {
            context.strokeStyle = "#0010f3";
            context.fillStyle = "#effffd";
        }


        context.fillRect(this.x, this.y, this.width, this.height);
        context.strokeRect(this.x, this.y, this.width, this.height);
    };
}


function Tablero() {


    this.arrayCasillas = [];

    /*Funciones*/
    this.init = function () {
        var index = 1;

        var widthBox = width / numBoxes;
        var heigthBox = height / numBoxes;
        var x;
        var y;



        for (var i = 0; i < numBoxes; i++) {
            for (let j = 0; j < numBoxes; j++) {
                x = j * widthBox;
                y = i * heigthBox;
                this.arrayCasillas.push(new Casilla(x, y, widthBox, heigthBox, i, j));

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




