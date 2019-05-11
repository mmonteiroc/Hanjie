const canvas = document.querySelector('#canvasGame');
const context = canvas.getContext('2d');
let bounding;
let numBoxes = 8;
const width = canvas.width;
const height = canvas.height;
let tablero;
let colorFondo = "#effffd";
let ajustes = JSON.parse(localStorage.getItem('settings'));
let colorCasilla = "#f30100";
let indexGlobalGame;
let arrayDibujosSeleccionado;
let sizeBoxGlobal;

document.querySelector('#canvasGame').addEventListener('click', event => {
    update(event);
});


init();

function restart() {
    init2();
}
function init() {
    setTimeout(function () {
        document.querySelector('.cargaJuego').style = "display:none";
        document.querySelector('#canvasGame').style = "display:block";
        bounding = canvas.getBoundingClientRect()
    }, 1500);

    init2();
}

function init2() {
    document.querySelector('#victoria').style = "display:none";
    if (localStorage.getItem('settings')) {
        if (ajustes.dificultad === "0") {
            numBoxes = 8;
            let numLevels = arrayDibujos77.length;
            arrayDibujosSeleccionado = arrayDibujos77[0];

        } else if (ajustes.dificultad === "1") {


            /*
            * Peta al hacer un random de los niveles a elegir
            *
            * */
            numBoxes = 11;
            let numLevels = arrayDibujos77.length;
            arrayDibujosSeleccionado = arrayDibujos10[Math.floor((Math.random() * numLevels - 1))];
        }

        colorFondo = ajustes.colorFondo;
        colorCasilla = ajustes.colorCasilla;
    } else {
        numBoxes = 8;
        let numLevels = arrayDibujos77.length;
        arrayDibujosSeleccionado = arrayDibujos77[0];
    }
    indexGlobalGame = 0;
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


function Casilla(x, y, W, H, fila, columna, noPulsable) {

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
    this.noPulsabe = noPulsable;
    this.texto = "";


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
        if (noPulsable) {
            if (this.x === 0 && this.y === 0) {
            } else {
                this.ponerNumeros();
            }
        }
    };

    this.ponerNumeros = function () {
        //numBoxes;
        var string = "";
        let primeraEncontrada = false;
        let index = 0;
        if (this.y === 0) {
            // Estaremos en las casillas de arriba
            let xCasilla = Math.floor(this.x / sizeBoxGlobal);
            let yCasilla;
            for (let i = 1; i < numBoxes; i++) {
                yCasilla = i;
                let casilla = (yCasilla * numBoxes) + xCasilla;

                console.log("xCasilla: " + xCasilla);
                console.log("yCasilla: " + yCasilla);
                console.log("Casilla resultante: " + casilla)

                if (arrayDibujosSeleccionado.indexOf(casilla) >= 0) {
                    console.log("--- Casilla existente");
                    index++;
                } else {
                    if (index !== 0) {
                        string += index + " ";
                    }
                    index = 0;
                }
            }
            if (index !== 0) {
                string += " " + index;
            }
        } else if (this.x === 0) {

            let xCasilla;
            let yCasilla = Math.floor(this.y / sizeBoxGlobal);
            for (let i = 1; i < numBoxes; i++) {
                xCasilla = i;
                let casilla = (yCasilla * numBoxes) + xCasilla;

                console.log("xCasilla: " + xCasilla);
                console.log("yCasilla: " + yCasilla);
                console.log("Casilla resultante: " + casilla)

                if (arrayDibujosSeleccionado.indexOf(casilla) >= 0) {
                    console.log("--- Casilla existente");
                    index++;
                } else {
                    if (index !== 0) {
                        string += index + " ";
                    }
                    index = 0;
                }
            }
            if (index !== 0) {
                string += " " + index;
            }

        }


        this.pintarTexto(string);
    };

    this.pintarTexto = function (texto) {
        context.fillStyle = "#000000";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = (this.width / 3) + "px Arial";
        let xx = this.x + (this.width / 2);
        let yy = this.y + (this.height / 2);

        context.fillText(texto, xx, yy);
    };


}




function Tablero() {

    this.arrayCasillas = [];
    this.sizeBox = 0;
    /*Funciones*/
    this.init = function () {
        var index = 1;

        this.sizeBox = width / numBoxes;
        sizeBoxGlobal = this.sizeBox;
        console.log("Sizebox: " + this.sizeBox);
        var x;
        var y;


        for (var i = 0; i < numBoxes; i++) {
            for (let j = 0; j < numBoxes; j++) {
                x = j * this.sizeBox;
                y = i * this.sizeBox;
                let noPulsable = false;
                if (i === 0 || j === 0) {
                    noPulsable = true;
                }
                this.arrayCasillas.push(new Casilla(x, y, this.sizeBox, this.sizeBox, i, j, noPulsable));
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
        let yCasilla = Math.floor(y / this.sizeBox);
        let casilla = (yCasilla * numBoxes) + xCasilla;
        console.log("Has pulsado la casilla :" + yCasilla + " - " + xCasilla);
        console.log("Casilla: " + casilla);

        if (!this.arrayCasillas[casilla].noPulsabe) {
            if (this.arrayCasillas[casilla].pulsada) {
                this.arrayCasillas[casilla].pulsada = false;
                this.arrayCasillas[casilla].fondo = colorFondo;
                indexGlobalGame--;
            } else {
                this.arrayCasillas[casilla].pulsada = true;
                this.arrayCasillas[casilla].fondo = colorCasilla;
                indexGlobalGame++;
            }
            this.arrayCasillas[casilla].pintar();

            if (arrayDibujosSeleccionado.length === indexGlobalGame) {
                checkEndGame();
            }
        }

    }
}


function checkEndGame() {
    let posicion;
    for (let i = 0; i < arrayDibujosSeleccionado.length; i++) {
        posicion = arrayDibujosSeleccionado[i];

        if (tablero.arrayCasillas[posicion].pulsada === false) {
            document.querySelector('#victoria').style = "display:none";
            return;
        }
    }
    document.querySelector('#victoria').style = "display:inline";
    console.log("Has ganado");
}







